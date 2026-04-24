import React from 'react';
import {formatCurrency,  formatDate}from '../utils/invoices';
import { StatusBadge, ActionButton } from './icons';

const InfoBlock = ({ label, value }) => (
    <div className="space-y-3">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <div className="text-base font-bold tracking-[-0.25px] text-[#0C0E16] dark:text-white">{value}</div>
    </div>
  );

function InvoiceDetail({ invoice, onEdit, onDelete, onMarkPaid }) {
    
  return (
    <article className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white px-6 py-6 shadow-[0_10px_20px_rgba(72,84,159,0.08)] dark:bg-[#1E2139] dark:shadow-none">
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500 dark:text-slate-400">Status</span>
          <StatusBadge status={invoice.status} />
        </div>

        <div className="flex flex-wrap gap-2">
          <ActionButton kind="secondary" onClick={onEdit}>
            Edit
          </ActionButton>
          <ActionButton kind="danger" onClick={onDelete}>
            Delete
          </ActionButton>
          <ActionButton kind="primary" onClick={onMarkPaid} disabled={invoice.status !== 'pending'}>
            Mark as Paid
          </ActionButton>
        </div>
      </div>

      <div className="rounded-3xl bg-white px-6 py-8 shadow-[0_10px_20px_rgba(72,84,159,0.08)] dark:bg-[#1E2139] dark:shadow-none sm:px-8">
        <div className="flex flex-col gap-8 border-b border-slate-200 pb-8 dark:border-[#252945] sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.75px] text-[#0C0E16] dark:text-white">
              <span className="text-slate-400">#</span>
              {invoice.id}
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{invoice.description}</p>
          </div>

          <address className="space-y-1 text-sm not-italic leading-6 text-slate-500 dark:text-slate-400 sm:text-right">
            <div>{invoice.senderAddress.street}</div>
            <div>{invoice.senderAddress.city}</div>
            <div>{invoice.senderAddress.postCode}</div>
            <div>{invoice.senderAddress.country}</div>
          </address>
        </div>

        <div className="grid gap-8 py-8 sm:grid-cols-2 xl:grid-cols-4">
          <InfoBlock label="Invoice Date" value={formatDate(invoice.createdAt)} />
          <div className="space-y-3">
            <p className="text-sm text-slate-500 dark:text-slate-400">Bill To</p>
            <div className="text-base font-bold tracking-[-0.25px] text-[#0C0E16] dark:text-white">{invoice.clientName}</div>
            <address className="space-y-1 text-sm not-italic leading-6 text-slate-500 dark:text-slate-400">
              <div>{invoice.clientAddress.street}</div>
              <div>{invoice.clientAddress.city}</div>
              <div>{invoice.clientAddress.postCode}</div>
              <div>{invoice.clientAddress.country}</div>
            </address>
          </div>
          <InfoBlock label="Payment Due" value={formatDate(invoice.paymentDue)} />
          <InfoBlock label="Send To" value={invoice.clientEmail} />
        </div>

        <div className="overflow-hidden rounded-t-2xl rounded-b-3xl bg-slate-100 dark:bg-[#252945]">
          <div className="hidden grid-cols-[minmax(0,1.8fr)_0.6fr_0.9fr_0.9fr] gap-4 px-8 py-6 text-sm text-slate-500 dark:text-slate-400 sm:grid">
            <span>Item Name</span>
            <span>QTY.</span>
            <span>Price</span>
            <span>Total</span>
          </div>

          <div className="space-y-5 px-6 py-6 sm:space-y-0 sm:px-8">
            {invoice.items.map((item) => (
              <div
                key={item.id}
                className="grid gap-2 border-b border-slate-200 pb-4 last:border-b-0 last:pb-0 dark:border-[#1E2139] sm:grid-cols-[minmax(0,1.8fr)_0.6fr_0.9fr_0.9fr] sm:items-center sm:gap-4"
              >
                <div className="text-base font-bold tracking-[-0.25px] text-[#0C0E16] dark:text-white">{item.name}</div>
                <div className="text-sm font-bold text-slate-500 dark:text-slate-400">{item.quantity}</div>
                <div className="text-sm font-bold text-slate-500 dark:text-slate-400">{formatCurrency(item.price)}</div>
                <div className="text-sm font-bold text-[#0C0E16] dark:text-white">
                  {formatCurrency(item.quantity * item.price)}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between rounded-b-3xl bg-[#373B53] px-6 py-6 text-white dark:bg-[#0C0E16] sm:px-8">
            <span className="text-sm">Amount Due</span>
            <strong className="text-2xl font-bold tracking-[-0.5px]">{formatCurrency(invoice.total)}</strong>
          </div>
        </div>
      </div>
    </article>
  );
}

export default InvoiceDetail;