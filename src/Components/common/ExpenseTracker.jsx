import React, { useState, useMemo } from 'react';
import { useTripContext } from '../../context/TripContext';
import { 
  FaWallet, 
  FaTimes, 
  FaPlus, 
  FaUtensils, 
  FaCar, 
  FaShoppingBag, 
  FaTheaterMasks, 
  FaFileAlt, 
  FaEdit, 
  FaCheck, 
  FaPlane, 
  FaHotel, 
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaChartPie
} from 'react-icons/fa';
import '../../styles/ExpenseTracker.css';

const ExpenseTracker = () => {
  const { 
    tripPlan, 
    customExpenses,
    calculateTotal, 
    removeFlight, 
    removeHotel, 
    removeDestination,
    addCustomExpense,
    removeCustomExpense
  } = useTripContext();
  
  const expenses = calculateTotal();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [budgetLimit, setBudgetLimit] = useState(200000); // Default ₹2 lakh
  const [showBudgetEdit, setShowBudgetEdit] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: '',
    description: '',
    amount: ''
  });

  // Calculate percentages and breakdown
  const expenseData = useMemo(() => {
    const total = expenses.total;
    if (total === 0) return [];

    const data = [
      { category: 'Flights', amount: expenses.flights, icon: FaPlane, color: '#3b82f6' },
      { category: 'Hotels', amount: expenses.hotels, icon: FaHotel, color: '#8b5cf6' },
      { category: 'Attractions', amount: expenses.destinations, icon: FaMapMarkerAlt, color: '#10b981' },
      { category: 'Other', amount: expenses.custom, icon: FaFileAlt, color: '#f59e0b' }
    ].filter(item => item.amount > 0);

    return data.map(item => ({
      ...item,
      percentage: ((item.amount / total) * 100).toFixed(1)
    }));
  }, [expenses]);

  const budgetPercentage = useMemo(() => {
    return Math.min((expenses.total / budgetLimit) * 100, 100);
  }, [expenses.total, budgetLimit]);

  const getBudgetStatus = () => {
    const percentage = budgetPercentage;
    if (percentage >= 100) return { text: 'Over Budget!', class: 'danger' };
    if (percentage >= 80) return { text: 'Budget Warning', class: 'warning' };
    if (percentage >= 60) return { text: 'On Track', class: 'success' };
    return { text: 'Well Within Budget', class: 'success' };
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (newExpense.description && newExpense.amount && newExpense.category) {
      addCustomExpense({
        ...newExpense,
        amount: Number(newExpense.amount)
      });
      setNewExpense({ category: '', description: '', amount: '' });
      setShowAddForm(false);
    }
  };

  const handleBudgetUpdate = (e) => {
    e.preventDefault();
    setShowBudgetEdit(false);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Food': FaUtensils,
      'Transport': FaCar,
      'Shopping': FaShoppingBag,
      'Entertainment': FaTheaterMasks,
      'Other': FaFileAlt
    };
    return icons[category] || FaFileAlt;
  };

  return (
    <div className="expense-tracker">
      <div className="expense-header">
        <h2 className="expense-title">
          <FaWallet style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Budget Tracker
        </h2>
        <button 
          className="add-expense-btn"
          onClick={() => setShowAddForm(!showAddForm)}
          title="Add custom expense"
        >
          {showAddForm ? <><FaTimes /> Cancel</> : <><FaPlus /> Add</>}
        </button>
      </div>

      {/* Add Expense Form */}
      {showAddForm && (
        <form className="add-expense-form" onSubmit={handleAddExpense}>
          <select
            value={newExpense.category}
            onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
            required
            className="expense-input"
          >
            <option value="">Select Category</option>
            <option value="Food">Food & Dining</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Description (e.g., Taxi to airport)"
            value={newExpense.description}
            onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
            required
            className="expense-input"
          />
          <input
            type="number"
            placeholder="Amount (₹)"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
            required
            min="0"
            step="0.01"
            className="expense-input"
          />
          <button type="submit" className="submit-expense-btn">
            Add Expense
          </button>
        </form>
      )}

      {/* Budget Limit Section */}
      <div className="budget-limit-section">
        <div className="budget-header">
          <div className="budget-info">
            <span className="budget-label">Budget Limit</span>
            {showBudgetEdit ? (
              <form onSubmit={handleBudgetUpdate} className="budget-edit-form">
                <input
                  type="number"
                  value={budgetLimit}
                  onChange={(e) => setBudgetLimit(Number(e.target.value))}
                  className="budget-input"
                  min="0"
                  step="1000"
                />
                <button type="submit" className="budget-save-btn">
                  <FaCheck />
                </button>
                <button 
                  type="button" 
                  className="budget-cancel-btn"
                  onClick={() => setShowBudgetEdit(false)}
                >
                  <FaTimes />
                </button>
              </form>
            ) : (
              <>
                <span className="budget-amount">₹{budgetLimit.toLocaleString()}</span>
                <button 
                  className="budget-edit-btn"
                  onClick={() => setShowBudgetEdit(true)}
                  title="Edit budget limit"
                >
                  <FaEdit />
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Budget Progress Bar */}
        <div className="budget-progress-container">
          <div 
            className={`budget-progress-bar ${getBudgetStatus().class}`}
            style={{ width: `${budgetPercentage}%` }}
          >
            <span className="budget-progress-text">
              {budgetPercentage.toFixed(0)}%
            </span>
          </div>
        </div>
        
        <div className={`budget-status ${getBudgetStatus().class}`}>
          <span>{getBudgetStatus().text}</span>
          <span>₹{(budgetLimit - expenses.total).toLocaleString()} remaining</span>
        </div>
      </div>

      {/* Expense Summary with Visual Chart */}
      {expenses.total > 0 && (
        <div className="expense-chart-section">
          <h3 className="section-title">
            <FaChartPie style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Spending Breakdown
          </h3>
          <div className="pie-chart">
            {expenseData.map((item, index) => {
              const prevPercentages = expenseData
                .slice(0, index)
                .reduce((sum, d) => sum + parseFloat(d.percentage), 0);
              
              return (
                <div 
                  key={item.category}
                  className="pie-segment"
                  style={{
                    background: `conic-gradient(
                      ${item.color} 0deg ${(prevPercentages + parseFloat(item.percentage)) * 3.6}deg,
                      transparent ${(prevPercentages + parseFloat(item.percentage)) * 3.6}deg 360deg
                    )`,
                    transform: `rotate(${prevPercentages * 3.6}deg)`
                  }}
                />
              );
            })}
            <div className="pie-center">
              <span className="pie-total">₹{(expenses.total / 1000).toFixed(0)}k</span>
              <span className="pie-label">Total</span>
            </div>
          </div>
          
          {/* Legend */}
          <div className="chart-legend">
            {expenseData.map(item => {
              const IconComponent = item.icon;
              return (
                <div key={item.category} className="legend-item">
                  <span 
                    className="legend-color" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="legend-label">
                    <IconComponent style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                    {item.category}
                  </span>
                  <span className="legend-value">
                    {item.percentage}% (₹{item.amount.toLocaleString()})
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Expense Summary Cards */}
      <div className="expense-summary">
        <div className="summary-card flights">
          <div className="card-icon">
            <FaPlane />
          </div>
          <div className="card-content">
            <span className="card-label">Flights</span>
            <span className="card-value">₹{expenses.flights.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="summary-card hotels">
          <div className="card-icon">
            <FaHotel />
          </div>
          <div className="card-content">
            <span className="card-label">Hotels</span>
            <span className="card-value">₹{expenses.hotels.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="summary-card attractions">
          <div className="card-icon">
            <FaMapMarkerAlt />
          </div>
          <div className="card-content">
            <span className="card-label">Attractions</span>
            <span className="card-value">₹{expenses.destinations.toLocaleString()}</span>
          </div>
        </div>
        
        {expenses.custom > 0 && (
          <div className="summary-card other">
            <div className="card-icon">
              <FaFileAlt />
            </div>
            <div className="card-content">
              <span className="card-label">Other</span>
              <span className="card-value">₹{expenses.custom.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>

      {/* Detailed Expense List */}
      <div className="expense-details">
        <h3 className="section-title">All Expenses</h3>
        
        {tripPlan.flights.length > 0 && (
          <div className="expense-section">
            <div className="section-header">
              <h4>
                <FaPlane style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                Flights
              </h4>
              <span className="section-count">{tripPlan.flights.length}</span>
            </div>
            {tripPlan.flights.map(flight => (
              <div key={flight.id} className="expense-list-item">
                <div className="item-info">
                  <span className="item-name">{flight.from} → {flight.to}</span>
                  <span className="item-meta">
                    {flight.airline} • {flight.selectedClass || 'Economy'}
                  </span>
                </div>
                <div className="item-actions">
                  <span className="item-price">₹{(flight.finalPrice || flight.price || 0).toLocaleString()}</span>
                  <button 
                    className="remove-btn-small"
                    onClick={() => removeFlight(flight.id)}
                    title="Remove flight"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tripPlan.hotels.length > 0 && (
          <div className="expense-section">
            <div className="section-header">
              <h4>
                <FaHotel style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                Hotels
              </h4>
              <span className="section-count">{tripPlan.hotels.length}</span>
            </div>
            {tripPlan.hotels.map(hotel => (
              <div key={hotel.id} className="expense-list-item">
                <div className="item-info">
                  <span className="item-name">{hotel.name}</span>
                  <span className="item-meta">
                    {hotel.location} • {hotel.nights || 1} night{(hotel.nights || 1) > 1 ? 's' : ''} • {hotel.selectedRoomType?.type || 'Standard'}
                  </span>
                </div>
                <div className="item-actions">
                  <span className="item-price">₹{(hotel.finalPrice || hotel.price || 0).toLocaleString()}</span>
                  <button 
                    className="remove-btn-small"
                    onClick={() => removeHotel(hotel.id)}
                    title="Remove hotel"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tripPlan.destinations.length > 0 && (
          <div className="expense-section">
            <div className="section-header">
              <h4>
                <FaMapMarkerAlt style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                Attractions
              </h4>
              <span className="section-count">{tripPlan.destinations.length}</span>
            </div>
            {tripPlan.destinations.map(dest => (
              <div key={dest.id} className="expense-list-item">
                <div className="item-info">
                  <span className="item-name">{dest.name}</span>
                  <span className="item-meta">{dest.city}</span>
                </div>
                <div className="item-actions">
                  <span className="item-price">
                    {dest.entryFee === 0 ? 'FREE' : `₹${(dest.finalPrice || dest.entryFee || 0).toLocaleString()}`}
                  </span>
                  <button 
                    className="remove-btn-small"
                    onClick={() => removeDestination(dest.id)}
                    title="Remove attraction"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {customExpenses.length > 0 && (
          <div className="expense-section">
            <div className="section-header">
              <h4>
                <FaFileAlt style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                Custom Expenses
              </h4>
              <span className="section-count">{customExpenses.length}</span>
            </div>
            {customExpenses.map(expense => {
              const CategoryIcon = getCategoryIcon(expense.category);
              return (
                <div key={expense.id} className="expense-list-item">
                  <div className="item-info">
                    <span className="item-name">
                      <CategoryIcon style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                      {expense.description}
                    </span>
                    <span className="item-meta">{expense.category}</span>
                  </div>
                  <div className="item-actions">
                    <span className="item-price">₹{expense.amount.toLocaleString()}</span>
                    <button 
                      className="remove-btn-small"
                      onClick={() => removeCustomExpense(expense.id)}
                      title="Remove expense"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tripPlan.flights.length === 0 && 
         tripPlan.hotels.length === 0 && 
         tripPlan.destinations.length === 0 &&
         customExpenses.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              <FaMoneyBillWave size={48} />
            </div>
            <p>No expenses yet</p>
            <p className="empty-hint">Add flights, hotels, or attractions to start tracking</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;