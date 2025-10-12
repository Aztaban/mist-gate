import { FormEvent } from 'react';

type HeaderSearchProps = {
  className?: string;
};

export default function HeaderSearch({ className }: HeaderSearchProps) {
  const onSubmit = (e: FormEvent) => e.preventDefault(); // no logic yet

  return (
    <div className={`header-search ${className ?? ''}`}>
      <form role="search" aria-label="Site search" onSubmit={onSubmit}>
        <input type="search" placeholder="Search products…" aria-label="Search products" autoComplete="off" />
      </form>

      {/* Optional dropdown shell for styling */}
      <div className="search-popover" aria-live="polite" hidden>
        <div className="search-item skeleton" />
        <div className="search-item skeleton" />
        <div className="search-view-all skeleton" />
      </div>
    </div>
  );
}
