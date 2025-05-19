'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    UnicornStudio: {
      isInitialized: boolean;
      init: () => void;
    };
  }
}

export default function UnicornStudioBackground() {
  useEffect(() => {
    if (!window.UnicornStudio) {
      window.UnicornStudio = { isInitialized: false, init: () => {} };
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.20/dist/unicornStudio.umd.js';
      script.onload = function() {
        if (!window.UnicornStudio.isInitialized) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
      };
      (document.head || document.body).appendChild(script);
    }
  }, []);

  return (
    <div 
      data-us-project="ab2GMzrHiwg5Wl6lqC6c" 
      className="fixed inset-0 w-full h-full -z-10"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
} 