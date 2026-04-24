import { sampleInvoices } from '../data/sampleInvoices';

export const INVOICE_STORAGE_KEY = 'invoice-app-data-v1';
export const THEME_STORAGE_KEY = 'invoice-app-theme-v1';

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0);
}

export function formatDate(value) {
  if (!value) {
    return '--';
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

export function addDays(dateString, days) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + Number(days || 0));
  return date.toISOString().slice(0, 10);
}

export function calculateInvoiceTotal(items) {
  return items.reduce((sum, item) => sum + Number(item.quantity || 0) * Number(item.price || 0), 0);
}

export function hydrateInvoices(invoices) {
  return invoices.map((invoice) => ({
    ...invoice,
    total: calculateInvoiceTotal(invoice.items),
  }));
}

export function loadInvoices() {
  const stored = window.localStorage.getItem(INVOICE_STORAGE_KEY);

  if (!stored) {
    return hydrateInvoices(sampleInvoices);
  }

  try {
    const parsed = JSON.parse(stored);
    return hydrateInvoices(parsed);
  } catch (error) {
    return hydrateInvoices(sampleInvoices);
  }
}

export function saveInvoices(invoices) {
  window.localStorage.setItem(INVOICE_STORAGE_KEY, JSON.stringify(invoices));
}

export function loadTheme() {
  return window.localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
}

export function saveTheme(theme) {
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function createInvoiceId() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomLetters = Array.from({ length: 2 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
  const randomNumbers = Math.floor(1000 + Math.random() * 9000);
  return `${randomLetters}${randomNumbers}`;
}

export function createItemId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `item-${Math.random().toString(36).slice(2, 10)}`;
}
