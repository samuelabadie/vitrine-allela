// This file intentionally left blank. All gsap animation logic has been removed.

// Animation utilities entry point

export function animateHeroTitle(words: NodeListOf<HTMLElement>) {
  // Example GSAP animation for hero title
  if (!words || words.length === 0) return;
  // Dynamically import gsap to avoid SSR issues
  import('gsap').then(gsapModule => {
    const gsap = gsapModule.default;
    gsap.set(words, { filter: 'blur(8px)', opacity: 0 });
    gsap.to(words, {
      filter: 'blur(0px)',
      opacity: 1,
      stagger: 0.18,
      duration: 0.7,
      ease: 'power2.out',
    });
  });
}

export function animateBaselineText(element: HTMLElement) {
  if (!element) return;
  
  import('gsap').then(gsapModule => {
    const gsap = gsapModule.default;
    
    // Split text into words, preserving the .com span
    const text = element.innerHTML;
    element.innerHTML = '';
    
    // Split the text into words and special elements
    const parts = text.split(/(\s+)/).filter(part => part.trim() !== '');
    
    // Create spans for each word
    const words = parts.map(part => {
      const span = document.createElement('span');
      span.innerHTML = part;
      span.style.display = 'inline-block';
      element.appendChild(span);
      return span;
    });
    
    // Animate each word
    gsap.set(words, { filter: 'blur(8px)', opacity: 0 });
    gsap.to(words, {
      filter: 'blur(0px)',
      opacity: 1,
      stagger: 0.15,
      duration: 0.6,
      ease: 'power2.out',
      delay: 1.5, // Start after the hero title animation
    });
  });
} 