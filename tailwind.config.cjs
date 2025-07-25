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
      'background-error-gradient': 'var(--krit-background-error-gradient)',
      'background-success-gradient': 'var(--krit-background-success-gradient)',
      'background-progress-gradient': 'var(--krit-background-progress-gradient)',
    },
    colors: {
      background: {
        DEFAULT: 'hsl(var(--krit-background-primary))',
        primary: 'hsl(var(--krit-background-primary))',
        'primary-hover': 'hsl(var(--krit-background-primary-hover))',
        'primary-selected': 'hsl(var(--krit-background-primary-selected))',
        secondary: 'hsl(var(--krit-background-secondary))',
        'secondary-hover': 'hsl(var(--krit-background-secondary-hover))',
        tertiary: 'hsl(var(--krit-background-tertiary))',
        theme: 'hsl(var(--krit-background-theme))',
        'theme-hover': 'hsl(var(--krit-background-theme-hover))',
        'theme-fade': 'hsl(var(--krit-background-theme-fade))',
        contrast: 'hsl(var(--krit-background-contrast))',
        'contrast-hover': 'hsl(var(--krit-background-contrast-hover))',
        'contrast-disabled': 'hsl(var(--krit-background-contrast-disabled))',
        'contrast-selected': 'hsl(var(--krit-background-contrast-selected))',
        'contrast-fade': 'hsl(var(--krit-background-contrast-fade))',
        'contrast-fade-hover': 'hsl(var(--krit-background-contrast-fade-hover))',
        'contrast-fade-selected': 'hsl(var(--krit-background-contrast-fade-selected))',
        'contrast-fade-disabled': 'hsl(var(--krit-background-contrast-fade-disabled))',
        error: 'hsl(var(--krit-background-error))',
        'error-hover': 'hsl(var(--krit-background-error-hover))',
        'error-fade': 'hsl(var(--krit-background-error-fade))',
        'error-fade-hover': 'hsl(var(--krit-background-error-fade-hover))',
        warning: 'hsl(var(--krit-background-warning))',
        'warning-hover': 'hsl(var(--krit-background-warning-hover))',
        'warning-fade': 'hsl(var(--krit-background-warning-fade))',
        'warning-fade-hover': 'hsl(var(--krit-background-warning-fade-hover))',
        success: 'hsl(var(--krit-background-success))',
        'success-hover': 'hsl(var(--krit-background-success-hover))',
        'success-tertiary': 'hsl(var(--krit-background-success-tertiary))',
        'success-fade': 'hsl(var(--krit-background-success-fade))',
        'success-fade-hover': 'hsl(var(--krit-background-success-fade-hover))',
        overlay: 'hsl(var(--krit-background-overlay))', // TODO: Add 0.6 opacity
      },
      foreground: {
        DEFAULT: 'hsl(var(--krit-foreground-primary))',
        primary: 'hsl(var(--krit-foreground-primary))',
        'primary-disabled': 'hsl(var(--krit-foreground-primary-disabled))',
        secondary: 'hsl(var(--krit-foreground-secondary))',
        tertiary: 'hsl(var(--krit-foreground-tertiary))',
        quaternary: 'hsl(var(--krit-foreground-quaternary))',
        theme: 'hsl(var(--krit-foreground-theme))',
        'on-contrast': 'hsl(var(--krit-foreground-on-contrast))',
        'on-contrast-disabled': 'hsl(var(--krit-foreground-on-contrast-disabled))',
        error: 'hsl(var(--krit-foreground-error))',
        warning: 'hsl(var(--krit-foreground-warning))',
        success: 'hsl(var(--krit-foreground-success))',
      },
      line: {
        DEFAULT: 'hsl(var(--krit-line))',
        primary: 'hsl(var(--krit-line-primary))',
        'primary-hover': 'hsl(var(--krit-line-primary-hover))',
        'primary-disabled': 'hsl(var(--krit-line-primary-disabled))',
        secondary: 'hsl(var(--krit-line-secondary))',
        error: 'hsl(var(--krit-line-error))',
        warning: 'hsl(var(--krit-line-warning))',
        success: 'hsl(var(--krit-line-success))',
        theme: 'hsl(var(--krit-line-theme))',
        contrast: 'hsl(var(--krit-line-contrast))',
        focused: 'hsl(var(--krit-line-focused))',
      },
      icon: {
        contrast: 'hsl(var(--krit-icon-contrast))',
        'contrast-disabled': 'hsl(var(--krit-icon-contrast-disabled))',
        'fade-contrast': 'hsl(var(--krit-icon-fade-contrast))',
        'on-contrast': 'hsl(var(--krit-icon-on-contrast))',
        'on-contrast-selected': 'hsl(var(--krit-icon-on-contrast-selected))',
        'on-contrast-disabled': 'hsl(var(--krit-icon-on-contrast-disabled))',
        theme: 'hsl(var(--krit-icon-theme))',
        error: 'hsl(var(--krit-icon-error))',
        warning: 'hsl(var(--krit-icon-warning))',
        success: 'hsl(var(--krit-icon-success))',
      },
      purple: 'hsl(var(--krit-purple))',
    },
    extend: {
      boxShadow: {
        base: '0px 0px 1px 0px rgba(0, 0, 0, 0.04), 0px 0px 2px 0px rgba(0, 0, 0, 0.06), 0px 4px 8px 0px rgba(0, 0, 0, 0.04)',
        float: '0px 2px 24px 0px rgba(0, 0, 0, 0.08), 0px 0px 2px 0px rgba(0, 0, 0, 0.08)',
        tooltip: '0px 4px 32px 0px rgba(0, 0, 0, 0.16), 0px 0px 4px 0px rgba(0, 0, 0, 0.04)',
      },
      colors: {
        border: 'hsl(var(--krit-border))',
        icon: {
          DEFAULT: 'hsl(var(--krit-icon))',
          secondary: 'hsl(var(--krit-icon-secondary))',
          tertiary: 'hsl(var(--krit-icon-tertiary))',
        },
        input: 'hsl(var(--krit-input))',
        ring: 'hsl(var(--krit-ring))',
        primary: {
          DEFAULT: 'hsl(var(--krit-primary))',
          foreground: 'hsl(var(--krit-primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--krit-secondary))',
          foreground: 'hsl(var(--krit-secondary-foreground) / 0.5)',
        },
        contrast: 'hsl(var(--krit-contrast))',
        'contrast-fade': 'hsl(var(--krit-contrast-fade))',
        'contrast-fade-selected': 'hsl(var(--krit-contrast-fade-selected))',
        'on-contrast': 'hsl(var(--krit-on-contrast))',

        destructive: {
          DEFAULT: 'hsl(var(--krit-destructive))',
          foreground: 'hsl(var(--krit-destructive-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--krit-success))',
          foreground: 'hsl(var(--krit-success-foreground))',
          tertiary: 'hsl(var(--krit-success-tertiary))',
        },
        pale: {
          DEFAULT: 'hsl(var(--krit-pale))',
          foreground: 'hsl(var(--krit-pale-foreground))',
        },
        grey: {
          DEFAULT: 'hsl(var(--krit-grey))',
          foreground: 'hsl(var(--krit-grey-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--krit-muted))',
          foreground: 'hsl(var(--krit-muted-foreground))',
        },
        'tertiary-foreground': 'hsl(var(--krit-tertiary-foreground))',
        accent: {
          DEFAULT: 'hsl(var(--krit-accent))',
          foreground: 'hsl(var(--krit-accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--krit-popover))',
          foreground: 'hsl(var(--krit-popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--krit-card))',
          foreground: 'hsl(var(--krit-card-foreground))',
          border: 'hsl(var(--krit-card-border))',
        },
      },
      borderRadius: {
        lg: 'var(--krit-radius)',
        md: 'calc(var(--krit-radius) - 2px)',
        sm: 'calc(var(--krit-radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--krit-radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--krit-radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(100deg, #56CCF2 0.13%, #2F80ED 124.93%)',
        'gradient-base': 'var(--krit-gradient-base)',
        'gradient-fade-to-bottom': 'var(--krit-gradient-fade-to-bottom)',
        'gradient-fade-to-top': 'var(--krit-gradient-fade-to-top)',
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
