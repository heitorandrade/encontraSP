interface TagProps {
  label: string;
}

export function Tag({ label }: TagProps) {
  return (
    <span className="rounded-full bg-[#f3f4f6] px-2.5 py-1 text-[10px] font-medium text-ink/64">
      {label}
    </span>
  );
}
