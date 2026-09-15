const TONES = {
  success: 'bg-success/10 border-success/30 text-success',
  error: 'bg-danger/10 border-danger/30 text-danger',
  info: 'bg-accent/10 border-accent/30 text-accent-light',
};

export function Alert({ tone = 'info', children }) {
  if (!children) return null;
  return <div className={`rounded-xl border px-4 py-3 text-sm ${TONES[tone]}`}>{children}</div>;
}
