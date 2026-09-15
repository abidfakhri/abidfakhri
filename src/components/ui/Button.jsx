import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const VARIANTS = {
  primary: 'bg-accent-dark text-white hover:bg-accent shadow-lg shadow-accent/20',
  glass: 'glass text-ink hover:border-accent/50',
  ghost: 'text-sub hover:text-ink hover:bg-white/5',
  danger: 'bg-danger/15 text-danger border border-danger/30 hover:bg-danger/25',
};

// Pre-built motion wrappers — must be module-level, not created per render,
// atau state internal Framer Motion akan hilang tiap kali komponen re-render.
const TAGS = {
  button: motion.button,
  a: motion.a,
  Link: motion.create(Link),
};

export function Button({ variant = 'primary', className = '', as = 'button', children, ...props }) {
  const key = as === Link ? 'Link' : as;
  const Component = TAGS[key] || motion.button;
  return (
    <Component
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}