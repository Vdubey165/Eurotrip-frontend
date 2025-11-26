import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CurrencyProvider } from './context/CurrencyContext';
import { TripProvider } from './context/TripContext';
import { AuthProvider } from './context/AuthContext';
import Header from './Components/common/Header';
import Footer from './Components/common/Footer';
import PageLayout from './Components/layout/PageLayout';
import Home from './pages/Home';
import Flights from './pages/Flights';
import Hotels from './pages/Hotels';
import Destinations from './pages/Destinations';
import Login from './pages/Login';
import Register from './pages/Register';
import MyTrips from './pages/MyTrips'; // ← ADD THIS
import { WeatherProvider } from './context/WeatherContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CurrencyProvider>
          <WeatherProvider>
        <TripProvider>
          <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <div style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route 
                  path="/flights" 
                  element={
                    <PageLayout>
                      <Flights />
                    </PageLayout>
                  } 
                />
                <Route 
                  path="/hotels" 
                  element={
                    <PageLayout>
                      <Hotels />
                    </PageLayout>
                  } 
                />
                <Route 
                  path="/destinations" 
                  element={
                    <PageLayout>
                      <Destinations />
                    </PageLayout>
                  } 
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/my-trips" element={<MyTrips />} /> {/* ← ADD THIS */}
              </Routes>
            </div>
            <Footer />
          </div>
        </TripProvider>
        </WeatherProvider>
        </CurrencyProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;