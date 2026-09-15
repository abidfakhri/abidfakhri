import { motion } from 'framer-motion';

const TAGS = {
  div: motion.div,
  a: motion.a,
  li: motion.li,
  section: motion.section,
  article: motion.article,
};

/** Kartu dasar bergaya glassmorphism, dipakai di seluruh halaman. */
export function GlassCard({ as = 'div', className = '', hover = false, children, ...props }) {
  const Component = TAGS[as] || motion.div;
  return (
    <Component
      className={`glass rounded-2xl ${hover ? 'transition-all duration-300 hover:-translate-y-1 hover:border-accent/40' : ''} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
