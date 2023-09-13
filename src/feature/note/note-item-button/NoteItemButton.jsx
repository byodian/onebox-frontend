export function NoteItemButton({ button }) {
  return (
    <button
      className="flex justify-center items-center w-[28px] h-[28px] rounded-full cursor-pointer hover:text-[color:var(--highlight)] hover:bg-[color:var(--highlight-1)]"
      onClick={button.onClick}
      key={button.id}
      title={button.label}
      type="button"
    >
      {button.element}
    </button>
  );
}
