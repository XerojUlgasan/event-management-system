import logoAssetUrl from '../../assets/logo.svg';

export { logoAssetUrl };

interface ClemoraLogoProps {
  variant?: 'full' | 'icon';
  theme?: 'light' | 'dark';
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * ClemoraLogo
 * Official Brand Emblem and Wordmark component.
 * Directly grounded in /src/assets/logo.svg:
 * - Royal Plum (#35233D): The majestic 'C' lettermark and wordmark.
 * - Terracotta Coral (#E07A5F): The energetic 4-pointed starburst.
 * - Deep Obsidian Plum (#24162B): The dark anchor tone for dark navbars/footers.
 * - Cashmere Alabaster (#FAF7F5): Light background canvas.
 */
export function ClemoraLogo({
  variant = 'full',
  theme = 'light',
  className = '',
  size = 'md',
}: ClemoraLogoProps) {
  // Theme-aware colors
  const plumColor = theme === 'dark' ? '#FAF5FB' : '#35233D';
  const iconPlumColor = theme === 'dark' ? '#FFFFFF' : '#35233D';
  const starColor = '#E07A5F';

  if (variant === 'icon') {
    const iconSizes = {
      xs: 'w-5 h-5',
      sm: 'w-7 h-7',
      md: 'w-9 h-9',
      lg: 'w-11 h-11',
      xl: 'w-14 h-14',
    };

    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconSizes[size]} shrink-0 ${className}`}
        aria-label="Clemora Logo Icon"
      >
        {/* Bold 'C' in Royal Plum - Exact coordinates from /src/assets/logo.svg */}
        <path
          d="M 68 20.5 A 42 42 0 1 0 68 79.5 L 56.5 67.5 A 25 25 0 1 1 56.5 32.5 Z"
          fill={iconPlumColor}
        />
        {/* 4-pointed Starburst in Terracotta Coral */}
        <path
          d="M 72 28 Q 72 50 90 50 Q 72 50 72 72 Q 72 50 54 50 Q 72 50 72 28 Z"
          fill={starColor}
        />
      </svg>
    );
  }

  // Full variant (Icon + Wordmark)
  const fullSizes = {
    xs: 'h-6',
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    xl: 'h-16',
  };

  return (
    <svg
      viewBox="0 0 420 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${fullSizes[size]} w-auto shrink-0 select-none ${className}`}
      aria-label="Clemora Logo"
    >
      {/* Clemora C Symbol */}
      <g transform="translate(10, 0)">
        {/* Bold 'C' in Royal Plum */}
        <path
          d="M 68 20.5 A 42 42 0 1 0 68 79.5 L 56.5 67.5 A 25 25 0 1 1 56.5 32.5 Z"
          fill={iconPlumColor}
        />
        {/* 4-pointed Starburst in Terracotta Coral */}
        <path
          d="M 72 28 Q 72 50 90 50 Q 72 50 72 72 Q 72 50 54 50 Q 72 50 72 28 Z"
          fill={starColor}
        />
      </g>

      {/* Wordmark Clemora */}
      <text
        x="115"
        y="67"
        fill={plumColor}
        fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
        fontSize="52"
        fontWeight="600"
        letterSpacing="-0.5"
      >
        Clemora
      </text>
    </svg>
  );
}
