import { useEffect, useState } from 'react';

import { useTheme } from '@mui/material';

/**
 * Description
 * ----------
 * Gets the current window size.
 */
export const useGetWindowSize = () => {
  const [windowSize, setWindowSize] = useState<'mobile' | 'tablet' | 'PC'>();

  const theme = useTheme();

  useEffect(() => {
    const handleResize = () => {
      const { values } = theme.breakpoints;

      if (window.innerWidth < values.sm) {
        setWindowSize('mobile');
      } else if (window.innerWidth < values.md) {
        setWindowSize('tablet');
      } else {
        setWindowSize('PC');
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [theme.breakpoints]);

  return { windowSize };
};
