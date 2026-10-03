export default function UsageMeter({ used, limit, label }) {
  const pct = limit > 0 ? Math.min((used / limit) * 100, 100) : 0;
  const over = used > limit;
  return (
    <div>
      {label && <div className="stat-label" style={{ marginBottom: "0.4rem" }}>{label}</div>}
      <div className="meter">
        <div
          className={`meter-fill${over ? " is-over" : ""}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="stat-sub" style={{ marginTop: "0.3rem" }}>
        {used} / {limit === -1 ? "Unlimited" : limit}
      </div>
    </div>
  );
}
