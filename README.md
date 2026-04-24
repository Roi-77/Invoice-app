# Invoice Management App

A responsive React invoice management application built for the Frontend Wizards Stage 2 task. It supports full invoice CRUD, draft saving, payment status management, filtering, light/dark theme switching, and persistent local storage.

## Setup

1. Install dependencies with `npm install`
2. Start the app with `npm run dev`
3. Build for production with `npm run build`
4. Preview the production build with `npm run preview`

## Architecture

- `src/App.jsx`: top-level state, layout, CRUD flows, form drawer, detail panel, filter UI, and modal logic
- `src/utils/invoices.js`: persistence helpers, formatting helpers, status helpers, and invoice calculations
- `src/data/sampleInvoices.js`: seeded invoice data for first-load experience
- `src/styles.css`: responsive visual system, theme tokens, component states, and layout rules

## Persistence Strategy

- Invoice data is stored in `localStorage` under `invoice-app-data-v1`
- Theme preference is stored in `localStorage` under `invoice-app-theme-v1`
- Seed data is loaded only when no stored invoice data exists

## Feature Notes

- Create, edit, view, and delete invoices
- Save invoices as draft or save/send as pending
- Mark pending or draft invoices as paid
- Filter invoices by draft, pending, and paid status
- Responsive layout optimized for mobile, tablet, and desktop
- Confirmation modal with keyboard support and `Escape` close handling
- Form validation for required fields, email shape, invoice items, and positive numeric values
