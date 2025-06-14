'use client';

import { useEffect } from 'react';

export default function CalendlyWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div 
      className="calendly-inline-widget" 
      data-url="https://calendly.com/allela-collectif/1-hour-meeting" 
      style={{ minWidth: '320px', height: '700px' }}
    />
  );
} 