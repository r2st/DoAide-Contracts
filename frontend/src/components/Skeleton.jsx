function Bars({ count, className }) {
  return (
    <div aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={className} />
      ))}
    </div>
  );
}

export function SkeletonText({ lines = 3, label = "Loading" }) {
  return (
    <div className="skeleton-block" aria-live="polite" aria-busy="true">
      <span className="visually-hidden">{label}…</span>
      <Bars count={lines} className="skeleton skeleton-line" />
    </div>
  );
}

export function SkeletonPanel({ lines = 4, label = "Loading" }) {
  return (
    <div className="panel" aria-live="polite" aria-busy="true">
      <span className="visually-hidden">{label}…</span>
      <Bars count={lines} className="skeleton skeleton-line" />
    </div>
  );
}

export function Spinner({ label = "Working" }) {
  return (
    <span className="spinner" aria-live="polite">
      <span className="visually-hidden">{label}…</span>
    </span>
  );
}
