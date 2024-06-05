/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector'], // https://ui.shadcn.com/docs/dark-mode/vite
  safelist: ['dark'], // https://github.com/shadcn-ui/ui/issues/313#issuecomment-1929054475
  content: ['./lib/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
      display: ['Roboto'],
      body: ['Roboto'],
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    backgroundImage: {
      'background-error-gradient': 'var(--background-error-gradient)',
      'background-success-gradient': 'var(--background-success-gradient)',
      'background-progress-gradient': 'var(--background-progress-gradient)',
    },
    colors: {
      background: {
        DEFAULT: 'hsl(var(--background-primary))',
        primary: 'hsl(var(--background-primary))',
        'primary-hover': 'hsl(var(--background-primary-hover))',
        'primary-selected': 'hsl(var(--background-primary-selected))',
        secondary: 'hsl(var(--background-secondary))',
        'secondary-hover': 'hsl(var(--background-secondary-hover))',
        tertiary: 'hsl(var(--background-tertiary))',
        theme: 'hsl(var(--background-theme))',
        'theme-hover': 'hsl(var(--background-theme-hover))',
        'theme-fade': 'hsl(var(--background-theme-fade))',
        contrast: 'hsl(var(--background-contrast))',
        'contrast-hover': 'hsl(var(--background-contrast-hover))',
        'contrast-disabled': 'hsl(var(--background-contrast-disabled))',
        'contrast-selected': 'hsl(var(--background-contrast-selected))',
        'contrast-fade': 'hsl(var(--background-contrast-fade))',
        'contrast-fade-hover': 'hsl(var(--background-contrast-fade-hover))',
        'contrast-fade-selected': 'hsl(var(--background-contrast-fade-selected))',
        'contrast-fade-disabled': 'hsl(var(--background-contrast-fade-disabled))',
        error: 'hsl(var(--background-error))',
        'error-hover': 'hsl(var(--background-error-hover))',
        'error-fade': 'hsl(var(--background-error-fade))',
        'error-fade-hover': 'hsl(var(--background-error-fade-hover))',
        warning: 'hsl(var(--background-warning))',
        'warning-hover': 'hsl(var(--background-warning-hover))',
        'warning-fade': 'hsl(var(--background-warning-fade))',
        'warning-fade-hover': 'hsl(var(--background-warning-fade-hover))',
        success: 'hsl(var(--background-success))',
        'success-hover': 'hsl(var(--background-success-hover))',
        'success-tertiary': 'hsl(var(--background-success-tertiary))',
        'success-fade': 'hsl(var(--background-success-fade))',
        'success-fade-hover': 'hsl(var(--background-success-fade-hover))',
        overlay: 'hsl(var(--background-overlay))', // TODO: Add 0.6 opacity
      },
      foreground: {
        DEFAULT: 'hsl(var(--foreground-primary))',
        primary: 'hsl(var(--foreground-primary))',
        'primary-disabled': 'hsl(var(--foreground-primary-disabled))',
        secondary: 'hsl(var(--foreground-secondary))',
        tertiary: 'hsl(var(--foreground-tertiary))',
        theme: 'hsl(var(--foreground-theme))',
        'on-contrast': 'hsl(var(--foreground-on-contrast))',
        'on-contrast-disabled': 'hsl(var(--foreground-on-contrast-disabled))',
        error: 'hsl(var(--foreground-error))',
        warning: 'hsl(var(--foreground-warning))',
        success: 'hsl(var(--foreground-success))',
      },
      line: {
        DEFAULT: 'hsl(var(--line))',
        primary: 'hsl(var(--line-primary))',
        'primary-hover': 'hsl(var(--line-primary-hover))',
        'primary-disabled': 'hsl(var(--line-primary-disabled))',
        secondary: 'hsl(var(--line-secondary))',
        error: 'hsl(var(--line-error))',
        warning: 'hsl(var(--line-warning))',
        success: 'hsl(var(--line-success))',
        theme: 'hsl(var(--line-theme))',
        contrast: 'hsl(var(--line-contrast))',
        focused: 'hsl(var(--line-focused))',
      },
      icon: {
        contrast: 'hsl(var(--icon-contrast))',
        'contrast-disabled': 'hsl(var(--icon-contrast-disabled))',
        'fade-contrast': 'hsl(var(--icon-fade-contrast))',
        'on-contrast': 'hsl(var(--icon-on-contrast))',
        'on-contrast-selected': 'hsl(var(--icon-on-contrast-selected))',
        'on-contrast-disabled': 'hsl(var(--icon-on-contrast-disabled))',
        theme: 'hsl(var(--icon-theme))',
        error: 'hsl(var(--icon-error))',
        warning: 'hsl(var(--icon-warning))',
        success: 'hsl(var(--icon-success))',
      },
      purple: 'hsl(var(--purple))',
    },
    extend: {
      boxShadow: {
        base: '0px 0px 1px 0px rgba(0, 0, 0, 0.04), 0px 0px 2px 0px rgba(0, 0, 0, 0.06), 0px 4px 8px 0px rgba(0, 0, 0, 0.04)',
        float: '0px 2px 24px 0px rgba(0, 0, 0, 0.08), 0px 0px 2px 0px rgba(0, 0, 0, 0.08)',
        tooltip: '0px 4px 32px 0px rgba(0, 0, 0, 0.16), 0px 0px 4px 0px rgba(0, 0, 0, 0.04)',
      },
      colors: {
        border: 'hsl(var(--border))',
        icon: {
          DEFAULT: 'hsl(var(--icon))',
          secondary: 'hsl(var(--icon-secondary))',
          tertiary: 'hsl(var(--icon-tertiary))',
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground) / 0.5)',
        },
        contrast: 'hsl(var(--contrast))',
        'contrast-fade': 'hsl(var(--contrast-fade))',
        'contrast-fade-selected': 'hsl(var(--contrast-fade-selected))',
        'on-contrast': 'hsl(var(--on-contrast))',

        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
          tertiary: 'hsl(var(--success-tertiary))',
        },
        pale: {
          DEFAULT: 'hsl(var(--pale))',
          foreground: 'hsl(var(--pale-foreground))',
        },
        grey: {
          DEFAULT: 'hsl(var(--grey))',
          foreground: 'hsl(var(--grey-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        'tertiary-foreground': 'hsl(var(--tertiary-foreground))',
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
          border: 'hsl(var(--card-border))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(100deg, #56CCF2 0.13%, #2F80ED 124.93%)',
        'gradient-base': 'var(--gradient-base)',
        'gradient-fade-to-bottom': 'var(--gradient-fade-to-bottom)',
        'gradient-fade-to-top': 'var(--gradient-fade-to-top)',
      },
      transitionProperty: {
        height: 'height',
      },
      gridTemplateColumns: {
        user: '1fr 5fr 2fr 3fr 2fr 4fr',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
