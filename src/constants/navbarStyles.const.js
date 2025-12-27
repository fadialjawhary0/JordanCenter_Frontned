export const NAVBAR_STYLES = {
  // Navigation link styles - fixed white color regardless of theme
  navLink: 'text-white no-underline font-medium text-[0.95rem] transition-colors duration-200 hover:text-[var(--color-brand)] whitespace-nowrap',

  // Icon button styles (for language and theme toggles) - fixed white color
  iconButton: 'w-10 h-10 rounded-full bg-[var(--color-border)]/50 dark:bg-[var(--color-inverse)]/10 flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[var(--color-border)]/80 dark:hover:bg-[var(--color-inverse)]/20 hover:scale-105 text-white',

  // Contact button styles
  contactButton: 'bg-[var(--color-text)] text-[var(--color-inverse)] border-none px-6 py-2.5 rounded-lg font-semibold text-[0.95rem] cursor-pointer transition-all duration-200 hover:bg-[var(--color-bg-elev)] hover:-translate-y-px whitespace-nowrap',

  // Arrow container styles
  arrowContainer: 'w-10 h-10 rounded-full bg-[var(--color-border)]/50 dark:bg-[var(--color-inverse)]/10 flex items-center justify-center cursor-pointer transition-all duration-300 relative overflow-hidden hover:bg-[var(--color-text)] dark:hover:bg-[var(--color-inverse)]/20',

  // Arrow icon styles - fixed white color
  arrowIcon: 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white transition-all duration-[400ms] ease-in-out',

  // Navbar container styles
  navbarContainer: 'w-full mx-auto px-8 py-4 flex items-center justify-between gap-8',

  // Navbar base styles
  navbarBase: 'absolute top-0 left-0 right-0 z-[1000] bg-[var(--color-bg)]/80 dark:bg-[var(--color-bg)]/10 backdrop-blur-[10px] transition-all duration-300 m-2 rounded-lg',
};
