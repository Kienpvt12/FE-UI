import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logPageView } from './analytics';

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // Gửi sự kiện pageview mỗi khi location thay đổi
    const currentPath = location.pathname + location.search;
    logPageView(currentPath);
    console.log(`GA Pageview logged for: ${currentPath}`); // Thêm log để dễ debug
  }, [location]);

  // Component này không render gì ra UI
  return null;
}

export default AnalyticsTracker;
