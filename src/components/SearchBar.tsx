import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="relative block">
      <span className="sr-only">Buscar producto</span>
      <Search
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/45"
        size={18}
        aria-hidden="true"
      />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar bebida o topping"
        className="focus-ring min-h-12 w-full rounded-md border border-ink/10 bg-white py-3 pl-11 pr-4 text-base text-ink shadow-sm placeholder:text-ink/40"
      />
    </label>
  );
}
