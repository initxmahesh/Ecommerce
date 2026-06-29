const IconActionButton = ({
  icon,
  label,
  onClick,
  count = 0,
  className = "",
}) => (
  <button
    type="button"
    aria-label={count > 0 ? `${label} (${count} items)` : label}
    onClick={onClick}
    className={`relative text-primary transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}`}
  >
    {icon}
    {count > 0 && (
      <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white">
        {count > 9 ? "9+" : count}
      </span>
    )}
  </button>
);

export default IconActionButton;
