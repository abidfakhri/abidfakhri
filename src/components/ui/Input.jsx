export function Input({ label, error, className = '', ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-sub">{label}</span>}
      <input
        className={`w-full rounded-xl border border-border bg-white/[0.03] px-4 py-2.5 text-sm text-ink placeholder:text-muted outline-none transition-colors focus:border-accent focus:bg-white/[0.05] ${error ? 'border-danger/60' : ''} ${className}`}
        {...props}
      />
      {error && <span className="mt-1 block text-xs text-danger">{error}</span>}
    </label>
  );
}
