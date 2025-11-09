import { useEffect, useMemo, useRef, useState, FormEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '@features/apiSlices/productApiSlice';
import { Product } from '@types';

type HeaderSearchProps = { className?: string };

export default function HeaderSearch({ className }: HeaderSearchProps) {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // grab products from cache; fine for smaller catalogs
  const { data: products = [] } = useGetProductsQuery();

  // simple debounced value
  const [debouncedQ, setDebouncedQ] = useState(q);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q), 200);
    return () => clearTimeout(t);
  }, [q]);

  const suggestions = useMemo(() => {
    if (debouncedQ.trim().length < 2) return [];
    const needle = debouncedQ.toLowerCase();
    return products
      .filter((p: Product) =>
        [p.name, p.details?.author].filter(Boolean).some((f) => String(f).toLowerCase().includes(needle))
      )
      .slice(0, 5);
  }, [debouncedQ, products]);

  useEffect(() => {
    setOpen(suggestions.length > 0);
    setActive(-1);
  }, [suggestions]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    setOpen(false);
    navigate(`/shop?q=${encodeURIComponent(query)}`);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && active >= 0) {
      e.preventDefault();
      const sel = suggestions[active];
      setOpen(false);
      navigate(`/product/${sel.id}`); // or `/shop?q=${encodeURIComponent(sel.name)}`
    } else if (e.key === 'Escape') {
      setOpen(false);
      setActive(-1);
      (inputRef.current as HTMLInputElement | null)?.blur();
    }
  };

  return (
    <div className={`header-search ${className ?? ''}`}>
      <form role="search" aria-label="Site search" onSubmit={onSubmit} autoComplete="off">
        <input
          ref={inputRef}
          type="search"
          placeholder="Search products…"
          aria-label="Search products"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onKeyDown}
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls="search-popover-listbox"
        />
      </form>

      <div
        className="search-popover surface-dark"
        role="listbox"
        id="search-popover-listbox"
        aria-live="polite"
        hidden={!open}>
        {suggestions.map((s, i) => (
          <button
            type="button"
            key={s.id}
            role="option"
            aria-selected={i === active}
            className={`search-item ${i === active ? 'is-active' : ''}`}
            onMouseEnter={() => setActive(i)}
            onClick={() => {
              setOpen(false);
              navigate(`/product/${s.id}`);
            }}
            title={s.name}>
            <span className="search-item__title">{s.name}</span>
            {s.details.author ? <span className="search-item__meta">{s.details.author}</span> : null}
          </button>
        ))}

        {q.trim().length >= 2 && (
          <button
            type="button"
            className="search-view-all"
            onClick={() => {
              setOpen(false);
              navigate(`/shop?q=${encodeURIComponent(q.trim())}`);
            }}>
            View all results for “{q.trim()}”
          </button>
        )}
      </div>
    </div>
  );
}
