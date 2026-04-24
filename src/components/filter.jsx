import React from 'react';
import {ChevronDownIcon} from './icons';

function FilterMenu({ filters, setFilters, open, setOpen }) {
  const activeFilters = Object.values(filters).filter(Boolean).length;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex items-center gap-3 text-[15px] font-bold tracking-[-0.25px] text-[#0C0E16] transition hover:text-[#7C5DFA] dark:text-white"
      >
        Filter by status
        {activeFilters ? (
          <span className="rounded-full bg-[#7C5DFA]/10 px-2 py-1 text-xs text-[#7C5DFA]">{activeFilters}</span>
        ) : null}
        <span className={`text-[#7C5DFA] transition ${open ? 'rotate-180' : ''}`}>
          <ChevronDownIcon />
        </span>
      </button>

      {open ? (
        <fieldset className="absolute right-0 top-[calc(100%+18px)] z-10 w-[192px] rounded-lg bg-white px-6 py-6 shadow-[0_10px_20px_rgba(72,84,159,0.25)] dark:bg-[#252945]">
          <legend className="sr-only">Filter invoices by status</legend>
          <div className="space-y-4">
            {['draft', 'pending', 'paid'].map((status) => (
              <label
                key={status}
                className="inline-flex cursor-pointer items-center gap-3 text-[15px] font-bold capitalize text-[#0C0E16] transition hover:text-[#7C5DFA] dark:text-white"
              >
                <input
                  type="checkbox"
                  checked={filters[status]}
                  onChange={() => setFilters((current) => ({ ...current, [status]: !current[status] }))}
                  className="h-4 w-4 rounded border-slate-300 text-[#7C5DFA] focus:ring-[#7C5DFA] dark:border-slate-600 dark:bg-[#1E2139]"
                />
                {status}
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}
    </div>
  );
}

export default FilterMenu;