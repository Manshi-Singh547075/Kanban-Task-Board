export function isMobile(): boolean {
  // Check if window is defined (to handle SSR)
  if (typeof window !== 'undefined') {
    return window.matchMedia('(max-width: 767px)').matches;
  }
  return false;
}

export function useIsMobile(): boolean {
  return isMobile();
}
