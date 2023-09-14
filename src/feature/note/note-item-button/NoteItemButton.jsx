export function NoteItemButton({
  label,
  children,
  onClick,
}) {
  return (
    <button
      className="flex justify-center items-center w-[28px] h-[28px] rounded-full cursor-pointer hover:text-[color:var(--highlight)] hover:bg-[color:var(--highlight-1)]"
      onClick={onClick}
      title={label}
      type="button"
    >
      {children}
    </button>
  );
}
