const LABELS = { high: "High Risk", medium: "Medium", low: "Low Risk" };

export default function RiskBadge({ level }) {
  const cls = `risk-badge risk-${level}`;
  return <span className={cls}>{LABELS[level] || level}</span>;
}
