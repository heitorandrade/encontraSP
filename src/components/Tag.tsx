interface TagProps {
  label: string;
}

export function Tag({ label }: TagProps) {
  return (
    <span className="rounded-full border border-black/10 bg-[#f5f5f5] px-2.5 py-1 text-[11px] font-medium text-ink/75">
      {label}
    </span>
  );
}
