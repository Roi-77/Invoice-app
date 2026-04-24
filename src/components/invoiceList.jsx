import React from 'react';
import {StatusBadge, ChevronRightIcon} from './icons';
import {formatCurrency,  formatDate}from '../utils/invoices';

function InvoiceList({ invoices, onSelect }) {
  if (!invoices.length) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-[0_10px_20px_rgba(72,84,159,0.08)] dark:bg-[#1E2139] dark:shadow-none">
        <h2 className="text-2xl font-bold tracking-[-0.75px]">There is nothing here</h2>
        <p className="mx-auto mt-4 max-w-[32ch] text-sm leading-6 text-slate-500 dark:text-slate-400">
          Create a new invoice or change the selected filters to see matching invoices.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {invoices.map((invoice) => (
        <button
          key={invoice.id}
          type="button"
          onClick={() => onSelect(invoice.id)}
          className="w-full rounded-[8px] border border-transparent bg-white px-8 py-7 text-left shadow-[0_10px_20px_rgba(72,84,159,0.08)] transition hover:-translate-y-0.5 hover:border-[#7C5DFA] dark:bg-[#1E2139] dark:shadow-none"
        >
          <div className="grid gap-4 md:grid-cols-[140px_180px_1fr_170px_156px_16px] md:items-center md:gap-6">
            <div className="text-[24px] font-bold tracking-[-0.75px] text-[#0C0E16] dark:text-white md:text-base md:tracking-[-0.25px]">
              <span className="text-slate-400">#</span>
              {invoice.id}
            </div>
            <p className="text-base font-medium text-[#7E88C3] dark:text-slate-400">Due {formatDate(invoice.paymentDue)}</p>
            <p className="text-base font-medium text-[#858BB2] dark:text-slate-400">{invoice.clientName}</p>
            <strong className="text-[24px] font-bold tracking-[-0.75px] text-[#0C0E16] dark:text-white md:text-base md:text-right md:tracking-[-0.25px]">
              {formatCurrency(invoice.total)}
            </strong>
            <div className="flex items-center justify-between gap-4 md:justify-end">
              <StatusBadge status={invoice.status} />
            </div>
            <span className="hidden text-[#7C5DFA] md:inline-flex">
              <ChevronRightIcon />
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

export default InvoiceList;