import {React, useState} from 'react';
import {ArrowLeftIcon, TrashIcon, ActionButton} from './icons';
import {createItemId,  formatCurrency, } from '../utils/invoices';

const FormSection = ({ title, children }) => (
    <section className="space-y-6">
      <h3 className="text-sm font-bold text-[#7C5DFA]">{title}</h3>
      {children}
    </section>
  );


const InputField =({ label, error, onChange, ...props }) => (
  
    <label className="block">
      <span className="mb-2 flex items-center justify-between gap-4 text-xs font-medium tracking-[0.01em] text-[#7E88C3] dark:text-[#DFE3FA]">
        <span>{label}</span>
        {error ? <span className="text-[#EC5757]">{error}</span> : null}
      </span>
      <input
        {...props}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-[4px] border bg-white px-5 py-[18px] text-sm font-bold tracking-[-0.25px] text-[#0C0E16] outline-none transition placeholder:text-slate-300 focus:border-[#7C5DFA] dark:bg-[#1E2139] dark:text-white ${
          error
            ? 'border-[#EC5757]'
            : 'border-[#DFE3FA] hover:border-[#7C5DFA] dark:border-[#252945]'
        }`}
      />
    </label>
  );

const SelectField =({ label, value, onChange, options }) => (
  
    <label className="block">
      <span className="mb-2 block text-xs font-medium tracking-[0.01em] text-[#7E88C3] dark:text-[#DFE3FA]">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[4px] border border-[#DFE3FA] bg-white px-5 py-[18px] text-sm font-bold tracking-[-0.25px] text-[#0C0E16] outline-none transition hover:border-[#7C5DFA] focus:border-[#7C5DFA] dark:border-[#252945] dark:bg-[#1E2139] dark:text-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );

  const OutputField = ({ label, value }) => (
  
    <div className="block">
      <span className="mb-2 block text-xs font-medium tracking-[0.01em] text-[#7E88C3] dark:text-[#DFE3FA]">{label}</span>
      <div className="flex h-[56px] items-center rounded-[4px] bg-slate-100 px-4 text-sm font-bold tracking-[-0.25px] text-slate-500 dark:bg-[#252945] dark:text-slate-300">
        {value}
      </div>
    </div>
  );



function InvoiceFormDrawer({ mode, initialInvoice, onClose, onSubmit }) {
  const [invoice, setInvoice] = useState(initialInvoice);
  const [errors, setErrors] = useState({});

  function setField(path, value) {
    setInvoice((current) => {
      if (path.includes('.')) {
        const [group, key] = path.split('.');
        return {
          ...current,
          [group]: {
            ...current[group],
            [key]: value,
          },
        };
      }

      return {
        ...current,
        [path]: value,
      };
    });
  }

  function setItemField(id, key, value) {
    setInvoice((current) => ({
      ...current,
      items: current.items.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
    }));
  }

  function addItem() {
    setInvoice((current) => ({
      ...current,
      items: [...current.items, { id: createItemId(), name: '', quantity: 1, price: 0 }],
    }));
  }

  function removeItem(id) {
    setInvoice((current) => ({
      ...current,
      items: current.items.filter((item) => item.id !== id),
    }));
  }

  function validate(currentInvoice) {
    const nextErrors = {};

    if (!currentInvoice.clientName.trim()) nextErrors.clientName = 'Client name is required';
    if (!currentInvoice.clientEmail.trim()) {
      nextErrors.clientEmail = 'Client email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentInvoice.clientEmail)) {
      nextErrors.clientEmail = 'Enter a valid email';
    }

    if (!currentInvoice.description.trim()) nextErrors.description = 'Description is required';
    if (!currentInvoice.createdAt) nextErrors.createdAt = 'Invoice date is required';

    ['street', 'city', 'postCode', 'country'].forEach((field) => {
      if (!currentInvoice.senderAddress[field].trim()) {
        nextErrors[`senderAddress.${field}`] = 'Required';
      }
      if (!currentInvoice.clientAddress[field].trim()) {
        nextErrors[`clientAddress.${field}`] = 'Required';
      }
    });

    if (!currentInvoice.items.length) {
      nextErrors.items = 'Add at least one item';
    }

    currentInvoice.items.forEach((item, index) => {
      if (!item.name.trim()) nextErrors[`items.${index}.name`] = 'Required';
      if (Number(item.quantity) <= 0) nextErrors[`items.${index}.quantity`] = 'Must be more than 0';
      if (Number(item.price) <= 0) nextErrors[`items.${index}.price`] = 'Must be more than 0';
    });

    return nextErrors;
  }

  function submitWithValidation(nextMode) {
    const nextErrors = validate(invoice);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      return;
    }

    onSubmit(invoice, nextMode);
  }
  

  function saveAsDraft() {
    onSubmit(invoice, 'draft');
  }

  return (
    <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
      <div className="flex h-full">
        <div className="h-full w-full max-w-[720px] overflow-y-auto rounded-r-[32px] bg-white px-6 py-8 dark:bg-[#141625] sm:px-10 lg:ml-[72px] lg:px-14">
          <button
            type="button"
            onClick={onClose}
            className="mb-8 inline-flex items-center gap-3 text-sm font-bold text-[#0C0E16] transition hover:text-[#7C5DFA] dark:text-white dark:hover:text-[#9277FF]"
          >
            <ArrowLeftIcon />
            Go back
          </button>

          <h2 className="text-[32px] font-bold tracking-[-1px] text-[#0C0E16] dark:text-white">
            {mode === 'create' ? 'New Invoice' : `Edit #${invoice.id}`}
          </h2>

          <form className="mt-12 space-y-8" onSubmit={(event) => event.preventDefault()}>
            <FormSection title="Bill From">
              <InputField
                label="Street Address"
                value={invoice.senderAddress.street}
                onChange={(value) => setField('senderAddress.street', value)}
                error={errors['senderAddress.street']}
              />
              <div className="grid gap-6 sm:grid-cols-3">
                <InputField
                  label="City"
                  value={invoice.senderAddress.city}
                  onChange={(value) => setField('senderAddress.city', value)}
                  error={errors['senderAddress.city']}
                />
                <InputField
                  label="Post Code"
                  value={invoice.senderAddress.postCode}
                  onChange={(value) => setField('senderAddress.postCode', value)}
                  error={errors['senderAddress.postCode']}
                />
                <InputField
                  label="Country"
                  value={invoice.senderAddress.country}
                  onChange={(value) => setField('senderAddress.country', value)}
                  error={errors['senderAddress.country']}
                />
              </div>
            </FormSection>

            <FormSection title="Bill To">
              <InputField
                label="Client Name"
                value={invoice.clientName}
                onChange={(value) => setField('clientName', value)}
                error={errors.clientName}
              />
              <InputField
                label="Client Email"
                type="email"
                value={invoice.clientEmail}
                onChange={(value) => setField('clientEmail', value)}
                error={errors.clientEmail}
              />
              <InputField
                label="Street Address"
                value={invoice.clientAddress.street}
                onChange={(value) => setField('clientAddress.street', value)}
                error={errors['clientAddress.street']}
              />
              <div className="grid gap-6 sm:grid-cols-3">
                <InputField
                  label="City"
                  value={invoice.clientAddress.city}
                  onChange={(value) => setField('clientAddress.city', value)}
                  error={errors['clientAddress.city']}
                />
                <InputField
                  label="Post Code"
                  value={invoice.clientAddress.postCode}
                  onChange={(value) => setField('clientAddress.postCode', value)}
                  error={errors['clientAddress.postCode']}
                />
                <InputField
                  label="Country"
                  value={invoice.clientAddress.country}
                  onChange={(value) => setField('clientAddress.country', value)}
                  error={errors['clientAddress.country']}
                />
              </div>
            </FormSection>

            <div className="grid gap-6 sm:grid-cols-2">
              <InputField
                label="Invoice Date"
                type="date"
                value={invoice.createdAt}
                onChange={(value) => setField('createdAt', value)}
                error={errors.createdAt}
              />
              <SelectField
                label="Payment Terms"
                value={invoice.paymentTerms}
                onChange={(value) => setField('paymentTerms', Number(value))}
                options={[
                  { value: 7, label: 'Net 7 Days' },
                  { value: 14, label: 'Net 14 Days' },
                  { value: 30, label: 'Net 30 Days' },
                ]}
              />
            </div>

            <InputField
              label="Project Description"
              value={invoice.description}
              onChange={(value) => setField('description', value)}
              error={errors.description}
            />

            <section className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-slate-400">Item List</h3>
                {errors.items ? <p className="text-sm font-semibold text-[#EC5757]">{errors.items}</p> : null}
              </div>

              {invoice.items.map((item, index) => (
                <div key={item.id} className="rounded-3xl bg-slate-50 p-4 dark:bg-[#1E2139]">
                  <div className="grid gap-4">
                    <InputField
                      label="Item Name"
                      value={item.name}
                      onChange={(value) => setItemField(item.id, 'name', value)}
                      error={errors[`items.${index}.name`]}
                    />

                    <div className="grid gap-4 sm:grid-cols-[100px_1fr_1fr_56px] sm:items-end">
                      <InputField
                        label="Qty."
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(value) => setItemField(item.id, 'quantity', Number(value))}
                        error={errors[`items.${index}.quantity`]}
                      />
                      <InputField
                        label="Price"
                        type="number"
                        min="1"
                        value={item.price}
                        onChange={(value) => setItemField(item.id, 'price', Number(value))}
                        error={errors[`items.${index}.price`]}
                      />
                      <OutputField label="Total" value={formatCurrency(item.quantity * item.price)} />
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        disabled={invoice.items.length === 1}
                        className="inline-flex h-12 items-center justify-center rounded-xl text-slate-400 transition hover:text-[#7C5DFA] disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label={`Remove item ${index + 1}`}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addItem}
                className="w-full rounded-full bg-slate-100 px-6 py-4 text-sm font-bold text-[#7E88C3] transition hover:bg-[#DFE3FA] dark:bg-[#252945] dark:text-slate-300 dark:hover:bg-[#1E2139]"
              >
                + Add New Item
              </button>
            </section>

            <footer className="sticky bottom-0 flex flex-wrap items-center justify-between gap-3 rounded-t-3xl bg-white py-6 dark:bg-[#141625]">
              <ActionButton kind="secondary" onClick={onClose}>
                Discard
              </ActionButton>

              <div className="flex flex-wrap gap-2">
                {mode === 'create' ? (
                  <ActionButton kind="dark" onClick={saveAsDraft}>
                    Save as Draft
                  </ActionButton>
                ) : null}

                <ActionButton
                  kind="primary"
                  onClick={() => submitWithValidation(mode === 'edit' ? 'update' : 'pending')}
                >
                  {mode === 'create' ? 'Save & Send' : 'Save Changes'}
                </ActionButton>
              </div>
            </footer>
          </form>
        </div>

        <button type="button" className="hidden flex-1 cursor-default lg:block" onClick={onClose} aria-label="Close" />
      </div>
    </div>
  );
}


export default InvoiceFormDrawer;