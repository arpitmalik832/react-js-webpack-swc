/**
 * PageWrapper component that logs route changes and renders child components.
 * @file The file is saved as `PageWrapper/index.jsx`.
 */
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { log } from '@arpitmalik832/react-js-rollup-monorepo-library';

/**
 * PageWrapper component that logs route changes and renders child components.
 * @returns {import('react').JSX.Element} The rendered component.
 * @example
 * <PageWrapper />
 */
function PageWrapper() {
  const location = useLocation();

  useEffect(() => {
    log('Route changed:', location.pathname);
  }, [location]);

  return (
    <div>
      Page Wrapper
      <Outlet />
    </div>
  );
}

export default PageWrapper;
