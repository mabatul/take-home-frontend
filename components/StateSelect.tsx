"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { STATE_OPTIONS } from "@/lib/states";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface StateSelectProps {
  label: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function StateSelect({ label, error, value, onChange }: StateSelectProps) {
  const inputId = useId();
  const listboxId = `${inputId}-listbox`;
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = useMemo(
    () => STATE_OPTIONS.find((s) => s.code === value) ?? null,
    [value]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return STATE_OPTIONS;
    return STATE_OPTIONS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q)
    );
  }, [query]);

  const displayValue = query !== "" ? query : selected ? `${selected.code} - ${selected.name}` : "";

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const selectItem = (code: string) => {
    onChange?.(code);
    const state = STATE_OPTIONS.find((s) => s.code === code);
    setQuery(state ? `${state.code} - ${state.name}` : code);
    setOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((i) => Math.min(i + 1, filtered.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (filtered[highlightedIndex]) {
          selectItem(filtered[highlightedIndex].code);
        }
        break;
      case "Escape":
        setOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <label htmlFor={inputId} className="block">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <input
          id={inputId}
          ref={inputRef}
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            open && filtered[highlightedIndex]
              ? `${listboxId}-${filtered[highlightedIndex].code}`
              : undefined
          }
          value={displayValue}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlightedIndex(0);
            setOpen(true);
          }}
          onFocus={() => {
            setQuery("");
            setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Type a state..."
          autoComplete="off"
          className={cn(
            "mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:outline-none focus:ring-2",
            error
              ? "border-red-400 focus:border-red-400 focus:ring-red-200"
              : "border-gray-300 focus:border-blue-400 focus:ring-blue-200"
          )}
        />
      </label>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white py-1 shadow-lg"
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-sm text-gray-500">No states found</li>
          ) : (
            filtered.map((s, index) => {
              const isHighlighted = index === highlightedIndex;
              return (
                <li
                  key={s.code}
                  id={`${listboxId}-${s.code}`}
                  role="option"
                  aria-selected={selected?.code === s.code}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={() => selectItem(s.code)}
                  className={cn(
                    "cursor-pointer px-3 py-2 text-sm",
                    isHighlighted ? "bg-blue-100" : "bg-white",
                    selected?.code === s.code
                      ? "font-semibold text-blue-700"
                      : "text-gray-900"
                  )}
                >
                  {s.code} - {s.name}
                </li>
              );
            })
          )}
        </ul>
      )}

      {error && <span className="mt-1 block text-sm text-red-600">{error}</span>}
    </div>
  );
}
