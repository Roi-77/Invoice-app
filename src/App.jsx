import { useEffect, useMemo, useState } from 'react';
import Sidebar from './components/sidebar';
import FilterMenu from './components/filter';
import InvoiceList from './components/invoiceList';
import InvoiceFormDrawer from './components/invoiceFormDrawer';
import ConfirmModal from './components/confirmModal';
import {PlusIcon, ArrowLeftIcon} from './components/icons';
import InvoiceDetail from './components/invoiceDetails';
import {
  addDays,
  calculateInvoiceTotal,
  createInvoiceId,
  createItemId,
  loadInvoices,
  loadTheme,
  saveInvoices,
  saveTheme,
} from './utils/invoices';




const emptyInvoice = {
  createdAt: new Date().toISOString().slice(0, 10),
  paymentTerms: 30,
  description: '',
  clientName: '',
  clientEmail: '',
  senderAddress: {
    street: '',
    city: '',
    postCode: '',
    country: '',
  },
  clientAddress: {
    street: '',
    city: '',
    postCode: '',
    country: '',
  },
  items: [{ id: createItemId(), name: '', quantity: 1, price: 0 }],
};

function App() {
  const initialInvoices = useMemo(() => loadInvoices(), []);
  const [invoices, setInvoices] = useState(initialInvoices);
  const [theme, setTheme] = useState(() => loadTheme());
  const [selectedId, setSelectedId] = useState(null);
  const [filters, setFilters] = useState({
    draft: false,
    pending: false,
    paid: false,
  });
  const [formState, setFormState] = useState({
    open: false,
    mode: 'create',
    invoice: emptyInvoice,
  });
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    saveInvoices(invoices);
  }, [invoices]);

  const filteredInvoices = useMemo(() => {
    const activeFilters = Object.entries(filters)
      .filter(([, enabled]) => enabled)
      .map(([status]) => status);

    if (!activeFilters.length) {
      return invoices;
    }

    return invoices.filter((invoice) => activeFilters.includes(invoice.status));
  }, [filters, invoices]);

  useEffect(() => {
    if (!filteredInvoices.length) {
      setSelectedId(null);
    }
  }, [filteredInvoices]);

  const selectedInvoice = filteredInvoices.find((invoice) => invoice.id === selectedId) || null;
  const invoiceLabel = filteredInvoices.length === 1 ? 'invoice' : 'invoices';

  function openCreateForm() {
    setFormState({
      open: true,
      mode: 'create',
      invoice: {
        ...emptyInvoice,
        createdAt: new Date().toISOString().slice(0, 10),
        items: [{ id: createItemId(), name: '', quantity: 1, price: 0 }],
      },
    });
  }

  function openEditForm(invoice) {
    setFormState({
      open: true,
      mode: 'edit',
      invoice: {
        ...invoice,
        items: invoice.items.map((item) => ({ ...item })),
      },
    });
  }

  function closeForm() {
    setFormState((current) => ({ ...current, open: false }));
  }

  function handleSubmitInvoice(draftInvoice, mode) {
    const status = mode === 'draft' ? 'draft' : formState.mode === 'edit' ? draftInvoice.status : 'pending';
    const invoicePayload = {
      ...draftInvoice,
      id: formState.mode === 'create' ? createInvoiceId() : draftInvoice.id,
      paymentDue: addDays(draftInvoice.createdAt, draftInvoice.paymentTerms),
      status,
      total: calculateInvoiceTotal(draftInvoice.items),
    };

    if (formState.mode === 'create') {
      setInvoices((current) => [invoicePayload, ...current]);
    } else {
      setInvoices((current) =>
        current.map((invoice) => (invoice.id === invoicePayload.id ? invoicePayload : invoice)),
      );
    }

    setSelectedId(invoicePayload.id);
    closeForm();
  }

  function handleDeleteInvoice() {
    if (!invoiceToDelete) {
      return;
    }

    setInvoices((current) => current.filter((invoice) => invoice.id !== invoiceToDelete.id));
    if (selectedId === invoiceToDelete.id) {
      setSelectedId(null);
    }
    setInvoiceToDelete(null);
  }

  function handleMarkPaid() {
    if (!selectedInvoice || selectedInvoice.status !== 'pending') {
      return;
    }

    setInvoices((current) =>
      current.map((invoice) =>
        invoice.id === selectedInvoice.id
          ? {
              ...invoice,
              status: 'paid',
            }
          : invoice,
      ),
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8FB] text-slate-900 dark:bg-[#141625] dark:text-white">
      <div className="mx-auto flex min-h-screen max-w-[1512px] flex-col lg:flex-row">
        <Sidebar theme={theme} setTheme={setTheme} />

        <main className="flex-1 px-6 pb-16 pt-10 sm:px-10 lg:px-16 lg:pt-[72px]">
          <div className="mx-auto flex w-full max-w-[920px] flex-col gap-10">
            <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-[36px] font-bold tracking-[-1.13px] text-[#0C0E16] dark:text-white">Invoices</h1>
                <p className="mt-2 text-base font-medium text-[#888EB0] dark:text-slate-400">
                  There are {filteredInvoices.length} total {invoiceLabel}
                </p>
              </div>

              <div className="relative flex flex-wrap items-center gap-4">
                <FilterMenu
                  filters={filters}
                  setFilters={setFilters}
                  open={showFilterMenu}
                  setOpen={setShowFilterMenu}
                />
                <button
                  type="button"
                  onClick={openCreateForm}
                  className="group inline-flex items-center gap-4 rounded-full bg-[#7C5DFA] px-2 py-2 pr-6 text-sm font-bold text-white transition hover:bg-[#9277FF]"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#7C5DFA]">
                    <PlusIcon />
                  </span>
                  New Invoice
                </button>
              </div>
            </header>

            {selectedInvoice ? (
              <section className="space-y-6">
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="inline-flex items-center gap-3 text-sm font-bold text-[#0C0E16] transition hover:text-[#7C5DFA] dark:text-white"
                >
                  <ArrowLeftIcon />
                  Go back
                </button>

                <InvoiceDetail
                  invoice={selectedInvoice}
                  onEdit={() => openEditForm(selectedInvoice)}
                  onDelete={() => setInvoiceToDelete(selectedInvoice)}
                  onMarkPaid={handleMarkPaid}
                />
              </section>
            ) : (
              <section className="space-y-6">
                <InvoiceList invoices={filteredInvoices} onSelect={setSelectedId} />
              </section>
            )}
          </div>
        </main>
      </div>

      {formState.open ? (
        <InvoiceFormDrawer
          mode={formState.mode}
          initialInvoice={formState.invoice}
          onClose={closeForm}
          onSubmit={handleSubmitInvoice}
        />
      ) : null}

      {invoiceToDelete ? (
        <ConfirmModal
          title={`Delete invoice ${invoiceToDelete.id}?`}
          description="Are you sure you want to delete this invoice? This action cannot be undone."
          confirmLabel="Delete"
          onCancel={() => setInvoiceToDelete(null)}
          onConfirm={handleDeleteInvoice}
        />
      ) : null}
    </div>
  );
}
<div>
  <div>
    <Sidebar />
  </div>

  <div>
    <FilterMenu />
  </div>

  <div>
    <InvoiceList />
  </div>

  <div>
    <InvoiceDetail />
  </div>

  <div>
    <InvoiceFormDrawer />
  </div>

  <div>
    <ConfirmModal />
  </div>
</div>


{/* <FormSection /> */}
{/* <InputField /> */}
{/* <SelectField /> */}
{/* <OutputField /> */}

{/* <FormSection /> */}

{/* <StatusBadge /> */}

{/* <ActionButton /> */}


{/*<LogoIcon /> */}

{/* <PlusIcon /> */}

{/* <ArrowLeftIcon /> */}



{/* <MoonIcon /> */}
{/* <SunIcon /> */ }



{/* <TrashIcon > */}
{/* <ChevronDownIcon > */}
{/* <ChevronRightIcon > */}


export default App;
