import { STATUS_STYLES } from "../../data/superadminData.js";

function StatusBadge({ status, color, bg }) {
  const styles = STATUS_STYLES[status] || {};
  const textColor = color || styles.color || "#64748b";
  const background = bg || styles.bg || "#f1f5f9";

  return (
    <span
      className="inline-flex rounded-[10px] px-2 py-0.5 text-[11px] font-medium"
      style={{ color: textColor, background }}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
