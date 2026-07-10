function MaterialIcon({ name, className = "", style, size }) {
  return (
    <span
      className={`material-symbols-outlined select-none ${className}`}
      style={{
        fontSize: size,
        lineHeight: 1,
        fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20",
        ...style,
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}

export default MaterialIcon;
