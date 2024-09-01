import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import React from 'react';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);  // Scrolls to the top of the page
  }, [pathname]);  // Trigger the scroll effect when the route changes

  return null;  // This component doesn't render anything
};

export default ScrollToTop;