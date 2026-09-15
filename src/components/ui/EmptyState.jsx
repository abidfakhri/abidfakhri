export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="glass flex flex-col items-center gap-3 rounded-2xl px-6 py-16 text-center">
      {Icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Icon size={22} />
        </div>
      )}
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      {description && <p className="max-w-sm text-sm text-sub">{description}</p>}
      {action}
    </div>
  );
}
