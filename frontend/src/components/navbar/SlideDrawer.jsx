import { X } from "lucide-react";
import { useEffect } from "react";

const SlideDrawer = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  ariaLabel,
}) => {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Close panel overlay"
        className="fixed inset-0 z-[60] bg-black/40"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel ?? title}
        className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4 sm:px-6">
          <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
          <button
            type="button"
            aria-label="Close panel"
            onClick={onClose}
            className="rounded-lg p-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">{children}</div>

        {footer && (
          <div className="border-t border-neutral-200 bg-neutral-50 px-4 py-4 sm:px-6">
            {footer}
          </div>
        )}
      </aside>
    </>
  );
};

export default SlideDrawer;
