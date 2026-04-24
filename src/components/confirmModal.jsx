import {React, useRef, useEffect} from 'react';
import {ActionButton} from './icons';

function ConfirmModal({ title, description, confirmLabel, onCancel, onConfirm }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const node = modalRef.current;
    if (!node) {
      return undefined;
    }

    const focusable = node.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        onCancel();
      }

      if (event.key === 'Tab' && focusable.length) {
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 px-6 backdrop-blur-sm" onClick={onCancel} role="presentation">
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl dark:bg-[#1E2139]"
      >
        <h2 id="modal-title" className="text-2xl font-bold tracking-[-0.75px] text-[#0C0E16] dark:text-white">
          {title}
        </h2>
        <p id="modal-description" className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {description}
        </p>
        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <ActionButton kind="secondary" onClick={onCancel}>
            Cancel
          </ActionButton>
          <ActionButton kind="danger" onClick={onConfirm}>
            {confirmLabel}
          </ActionButton>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;