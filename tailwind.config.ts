
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				cyber: {
					'black': '#0a0a0f',
					'dark': '#121317',
					'darker': '#1a1c25',
					'primary': '#00ff9d',
					'secondary': '#00b3ff',
					'accent': '#ff00c3',
					'muted': '#545b70',
					'neon': '#39e200',
					'blue': '#2b95ff',
					'purple': '#8a57ff',
					'red': '#ff3257',
					'terminal': '#00ff9d',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'matrix-rain': {
					'0%': { transform: 'translateY(-100%)', opacity: '0' },
					'10%': { opacity: '1' },
					'100%': { transform: 'translateY(100vh)', opacity: '0.5' }
				},
				'pulse-neon': {
					'0%, 100%': { boxShadow: '0 0 5px 0 rgba(0, 255, 157, 0.7), 0 0 10px 0 rgba(0, 255, 157, 0.5)' },
					'50%': { boxShadow: '0 0 15px 0 rgba(0, 255, 157, 0.9), 0 0 25px 0 rgba(0, 255, 157, 0.7)' }
				},
				'glitch': {
					'0%, 100%': { transform: 'translateX(0)' },
					'25%': { transform: 'translateX(-2px)' },
					'50%': { transform: 'translateX(2px)' },
					'75%': { transform: 'translateX(-1px)' }
				},
				'typing': {
					'from': { width: '0' },
					'to': { width: '100%' }
				},
				'blink': {
					'0%, 100%': { borderColor: 'transparent' },
					'50%': { borderColor: 'rgba(0, 255, 157, 0.7)' }
				},
				'fadeIn': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'scanline': {
					'0%': {
						transform: 'translateY(0%)',
						opacity: '0.2'
					},
					'100%': {
						transform: 'translateY(100%)',
						opacity: '0.2'
					}
				},
				'flicker': {
					'0%, 100%': { opacity: '1' },
					'33%': { opacity: '0.9' },
					'66%': { opacity: '0.94' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'matrix-rain': 'matrix-rain 5s linear infinite',
				'pulse-neon': 'pulse-neon 2s infinite',
				'glitch': 'glitch 0.5s ease-in-out infinite',
				'typing': 'typing 3.5s steps(40, end)',
				'blink': 'blink 0.75s step-end infinite',
				'fadeIn': 'fadeIn 0.5s ease-in-out',
				'scanline': 'scanline 4s linear infinite',
				'flicker': 'flicker 0.5s infinite'
			},
			fontFamily: {
				'cyber': ['"Share Tech Mono"', 'monospace'],
				'code': ['"Fira Code"', 'monospace'],
				'digital': ['"Press Start 2P"', 'cursive']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
