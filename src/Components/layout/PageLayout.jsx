// src/components/layout/PageLayout.jsx - ENHANCED VERSION
import React, { useState, useEffect } from 'react';
import ExpenseTracker from '../common/ExpenseTracker';
import ItineraryPlanner from '../common/ItineraryPlanner';
import { useTripContext } from '../../context/TripContext';
import '../../styles/PageLayout.css';

const PageLayout = ({ children }) => {
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(null); // 'left', 'right', or null
  
  const { tripPlan, customActivities } = useTripContext();
  
  // Check if user has items in their plan
  const hasItems = (tripPlan.flights?.length > 0) || 
                   (tripPlan.hotels?.length > 0) || 
                   (tripPlan.destinations?.length > 0) ||
                   (customActivities?.length > 0);

  // Detect mobile viewport
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      // Reset mobile sidebar when switching to desktop
      if (!mobile) {
        setShowMobileSidebar(null);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (showMobileSidebar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showMobileSidebar]);

  const toggleMobileSidebar = (sidebar) => {
    setShowMobileSidebar(showMobileSidebar === sidebar ? null : sidebar);
  };

  return (
    <div className="page-layout">
      {/* Mobile Floating Buttons */}
      {isMobile && (
        <div className="mobile-sidebar-controls">
          <button 
            className={`mobile-sidebar-btn left ${showMobileSidebar === 'left' ? 'active' : ''}`}
            onClick={() => toggleMobileSidebar('left')}
            aria-label="Toggle budget tracker"
          >
            <span className="btn-icon">💰</span>
            <span className="btn-label">Budget</span>
          </button>
          
          {hasItems && (
            <button 
              className={`mobile-sidebar-btn right ${showMobileSidebar === 'right' ? 'active' : ''}`}
              onClick={() => toggleMobileSidebar('right')}
              aria-label="Toggle itinerary"
            >
              <span className="btn-icon">📅</span>
              <span className="btn-label">Itinerary</span>
              <span className="notification-badge">{
                (tripPlan.flights?.length || 0) + 
                (tripPlan.hotels?.length || 0) + 
                (tripPlan.destinations?.length || 0) +
                (customActivities?.length || 0)
              }</span>
            </button>
          )}
        </div>
      )}

      {/* Mobile Overlay */}
      {isMobile && showMobileSidebar && (
        <div 
          className="mobile-overlay"
          onClick={() => setShowMobileSidebar(null)}
          aria-hidden="true"
        />
      )}

      {/* Left Sidebar - Budget Tracker */}
      <aside 
        className={`sidebar-left ${leftSidebarCollapsed ? 'collapsed' : ''} ${
          isMobile && showMobileSidebar === 'left' ? 'mobile-open' : ''
        }`}
      >
        <div className="sidebar-header">
          <h2 className="sidebar-title">
            💰 Budget Tracker
          </h2>
          {!isMobile && (
            <button 
              className="collapse-btn"
              onClick={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
              aria-label={leftSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={leftSidebarCollapsed ? 'Expand' : 'Collapse'}
            >
              {leftSidebarCollapsed ? '→' : '←'}
            </button>
          )}
          {isMobile && (
            <button 
              className="close-mobile-btn"
              onClick={() => setShowMobileSidebar(null)}
              aria-label="Close sidebar"
            >
              ✕
            </button>
          )}
        </div>
        {!leftSidebarCollapsed && (
          <div className="sidebar-content">
            <ExpenseTracker />
          </div>
        )}
      </aside>
      
      {/* Main Content */}
      <main className={`main-content ${
        leftSidebarCollapsed && rightSidebarCollapsed ? 'full-width' : ''
      } ${leftSidebarCollapsed ? 'left-expanded' : ''} ${
        rightSidebarCollapsed ? 'right-expanded' : ''
      }`}>
        {children}
      </main>
      
      {/* Right Sidebar - Itinerary */}
      <aside 
        className={`sidebar-right ${rightSidebarCollapsed ? 'collapsed' : ''} ${
          isMobile && showMobileSidebar === 'right' ? 'mobile-open' : ''
        }`}
      >
        <div className="sidebar-header">
          <h2 className="sidebar-title">
            📅 Your Itinerary
          </h2>
          {!isMobile && (
            <button 
              className="collapse-btn"
              onClick={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}
              aria-label={rightSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={rightSidebarCollapsed ? 'Expand' : 'Collapse'}
            >
              {rightSidebarCollapsed ? '←' : '→'}
            </button>
          )}
          {isMobile && (
            <button 
              className="close-mobile-btn"
              onClick={() => setShowMobileSidebar(null)}
              aria-label="Close sidebar"
            >
              ✕
            </button>
          )}
        </div>
        {!rightSidebarCollapsed && (
          <div className="sidebar-content">
            <ItineraryPlanner />
          </div>
        )}
      </aside>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
};

// Scroll to Top Component
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
};

export default PageLayout;