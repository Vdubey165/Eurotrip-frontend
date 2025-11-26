import jsPDF from 'jspdf';

export const generateTripPDF = async (trip) => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 20;

    // Colors matching app theme
    const primaryColor = [44, 62, 80]; // #2c3e50
    const accentColor = [251, 191, 36]; // #fbbf24
    const textColor = [52, 73, 94]; // Dark text

    // Helper function to add colored header
    const addHeader = (title) => {
      pdf.setFillColor(...primaryColor);
      pdf.rect(15, yPosition - 5, pageWidth - 30, 12, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text(title, 20, yPosition + 3);
      pdf.setTextColor(...textColor);
      yPosition += 20;
    };

    // Helper function to add text
    const addText = (label, value, isBold = false) => {
      pdf.setFontSize(10);
      pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
      pdf.setTextColor(...textColor);
      pdf.text(`${label}: ${value}`, 25, yPosition);
      yPosition += 8;
    };

    // Helper function to check page break
    const checkPageBreak = (neededSpace = 30) => {
      if (yPosition + neededSpace > pageHeight - 20) {
        pdf.addPage();
        yPosition = 20;
      }
    };

    // ===== HEADER =====
    pdf.setFillColor(...accentColor);
    pdf.rect(0, 0, pageWidth, 30, 'F');
    pdf.setTextColor(...primaryColor);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('TRIP ITINERARY', pageWidth / 2, 18, { align: 'center' });
    yPosition = 40;

    // ===== TRIP BASICS =====
    addHeader('Trip Information');
    addText('Trip Name', trip.tripName || 'Untitled Trip', true);
    addText('Budget Limit', `Rs. ${trip.budgetLimit?.toLocaleString() || 'N/A'}`);
    addText('Total Spent', `Rs. ${trip.totalBudget?.toLocaleString() || '0'}`);
    
    if (trip.budgetLimit && trip.totalBudget) {
      const remaining = (trip.budgetLimit - trip.totalBudget);
      const percentUsed = ((trip.totalBudget / trip.budgetLimit) * 100).toFixed(1);
      addText('Remaining Budget', `Rs. ${remaining.toLocaleString()}`);
      addText('Budget Used', `${percentUsed}%`);
    }

    // Calculate total days
    const allDays = [
      ...(trip.flights?.map(f => f.day) || []),
      ...(trip.hotels?.map(h => h.day) || []),
      ...(trip.destinations?.map(d => d.day) || [])
    ].filter(d => d);
    const totalDays = allDays.length > 0 ? Math.max(...allDays) : 0;
    
    if (totalDays > 0) {
      addText('Trip Duration', `${totalDays} day${totalDays > 1 ? 's' : ''}`);
    }

    yPosition += 5;

    // ===== FLIGHTS SECTION =====
    if (trip.flights && trip.flights.length > 0) {
      checkPageBreak(40);
      addHeader('FLIGHTS');
      trip.flights.forEach((flight, index) => {
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(...accentColor);
        pdf.text(`Flight ${index + 1}`, 25, yPosition);
        yPosition += 8;
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(...textColor);
        
        addText('Route', `${flight.from || 'N/A'} to ${flight.to || 'N/A'}`);
        addText('Airline', flight.airline || 'N/A');
        addText('Class', flight.selectedClass || 'Economy');
        addText('Departure', flight.departure || 'N/A');
        if (flight.arrival) addText('Arrival', flight.arrival);
        if (flight.duration) addText('Duration', flight.duration);
        addText('Price', `Rs. ${(flight.price || 0).toLocaleString()}`);
        addText('Scheduled Day', `Day ${flight.day || 1}`);
        yPosition += 5;
        checkPageBreak(30);
      });
    }

    // ===== HOTELS SECTION =====
    if (trip.hotels && trip.hotels.length > 0) {
      checkPageBreak(40);
      addHeader('HOTELS');
      trip.hotels.forEach((hotel, index) => {
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(...accentColor);
        pdf.text(`Hotel ${index + 1}`, 25, yPosition);
        yPosition += 8;
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(...textColor);
        
        addText('Hotel Name', hotel.name || 'N/A');
        addText('Location', hotel.location || 'N/A');
        if (hotel.rating) addText('Rating', `${hotel.rating} / 5 stars`);
        addText('Room Type', hotel.selectedRoomType || 'Standard');
        
        const nights = hotel.nights || 1;
        const guests = hotel.guests || 1;
        const pricePerNight = hotel.pricePerNight || 0;
        
        addText('Nights', nights.toString());
        addText('Guests', guests.toString());
        addText('Price per Night', `Rs. ${pricePerNight.toLocaleString()}`);
        
        // Use totalPrice directly from database (most reliable)
        const totalPrice = hotel.totalPrice || (pricePerNight * nights);
        addText('Total Price', `Rs. ${totalPrice.toLocaleString()}`);
        addText('Check-in Day', `Day ${hotel.day || 1}`);
        yPosition += 5;
        checkPageBreak(30);
      });
    }

    // ===== DESTINATIONS SECTION =====
    if (trip.destinations && trip.destinations.length > 0) {
      checkPageBreak(40);
      addHeader('DESTINATIONS & ATTRACTIONS');
      trip.destinations.forEach((dest, index) => {
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(...accentColor);
        pdf.text(`Destination ${index + 1}`, 25, yPosition);
        yPosition += 8;
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(...textColor);
        
        addText('Name', dest.name || 'N/A');
        addText('Location', `${dest.city || ''}, ${dest.country || ''}`.trim());
        if (dest.category) addText('Category', dest.category);
        if (dest.visitDuration) addText('Visit Duration', dest.visitDuration);
        addText('Entry Fee', dest.entryFee === 0 ? 'FREE' : `Rs. ${(dest.entryFee || 0).toLocaleString()}`);
        addText('Visit Day', `Day ${dest.day || 1}`);
        yPosition += 5;
        checkPageBreak(30);
      });
    }

    // ===== CUSTOM EXPENSES SECTION =====
    if (trip.customExpenses && trip.customExpenses.length > 0) {
      checkPageBreak(40);
      addHeader('CUSTOM EXPENSES');
      trip.customExpenses.forEach((expense, index) => {
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(...accentColor);
        pdf.text(`Expense ${index + 1}`, 25, yPosition);
        yPosition += 8;
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(...textColor);
        addText('Category', expense.category || 'N/A');
        addText('Description', expense.description || 'N/A');
        addText('Amount', `Rs. ${expense.amount?.toLocaleString() || '0'}`);
        yPosition += 5;
        checkPageBreak(30);
      });
    }

    // ===== EXPENSE BREAKDOWN =====
    checkPageBreak(60);
    addHeader('EXPENSE BREAKDOWN');
    
    // Calculate expenses - matching your TripContext logic exactly
    const expenses = {
      flights: trip.flights?.reduce((sum, f) => sum + (f.price || 0), 0) || 0,
      hotels: trip.hotels?.reduce((sum, h) => {
        // Use totalPrice directly from database (saved from context)
        return sum + (h.totalPrice || 0);
      }, 0) || 0,
      destinations: trip.destinations?.reduce((sum, d) => sum + (d.entryFee || 0), 0) || 0,
      custom: trip.customExpenses?.reduce((sum, e) => sum + (e.amount || 0), 0) || 0,
    };

    addText('Flights', `Rs. ${expenses.flights.toLocaleString()}`, true);
    addText('Hotels', `Rs. ${expenses.hotels.toLocaleString()}`, true);
    addText('Destinations', `Rs. ${expenses.destinations.toLocaleString()}`, true);
    addText('Custom Expenses', `Rs. ${expenses.custom.toLocaleString()}`, true);
    
    const calculatedTotal = expenses.flights + expenses.hotels + expenses.destinations + expenses.custom;
    
    yPosition += 5;
    
    // Total with accent color
    pdf.setFillColor(...accentColor);
    pdf.rect(15, yPosition - 5, pageWidth - 30, 12, 'F');
    pdf.setTextColor(...primaryColor);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(
      `GRAND TOTAL: Rs. ${calculatedTotal.toLocaleString()}`,
      20,
      yPosition + 2
    );

    // ===== FOOTER =====
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      const footerText = `Generated on ${new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })} | Europe Travel Planner | Page ${i} of ${totalPages}`;
      pdf.text(footerText, pageWidth / 2, pageHeight - 10, { align: 'center' });
    }

    // Save PDF with sanitized filename
    const filename = `${(trip.tripName || 'trip').replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.pdf`;
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};