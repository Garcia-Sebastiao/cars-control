export function Button({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`bg-[#0095e4] text-white text-xs px-4 py-[11px] rounded-lg ${className}`}
    >
      {children}
    </button>
  );
}
