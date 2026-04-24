import React from 'react';

export const LogoIcon = () => (
        <svg width="38" height="34" viewBox="0 0 88 84" fill="none" >
  <mask id="cutout" maskUnits="userSpaceOnUse" x="0" y="0" width="88" height="84">
    <rect width="88" height="84" fill="white" />
    <path d="M26 0L44 40L64 0H26Z" fill="black" />
  </mask>
  <circle cx="44" cy="42" r="42" fill="white" mask="url(#cutout)" />
</svg>

  );

  export const SunIcon =() => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="4" fill="currentColor" />
      <path
        d="M10 1V4M10 16V19M1 10H4M16 10H19M3.6 3.6L5.7 5.7M14.3 14.3L16.4 16.4M3.6 16.4L5.7 14.3M14.3 5.7L16.4 3.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );

  export const MoonIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M17 11.05A8 8 0 1 1 8.95 3 6.5 6.5 0 0 0 17 11.05Z"
        fill="currentColor"
      />
    </svg>
  );

  export const TrashIcon = () => (
  
    <svg width="13" height="16" viewBox="0 0 13 16" fill="none" aria-hidden="true">
      <path
        d="M1 3H12M4 1H9M3 3V13C3 14.1046 3.89543 15 5 15H8C9.10457 15 10 14.1046 10 13V3M5.5 6V11M7.5 6V11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );


export const ChevronDownIcon = () => (
  
    <svg width="11" height="7" viewBox="0 0 11 7" fill="none" aria-hidden="true">
      <path d="M1 1L5.5 5.5L10 1" stroke="currentColor" strokeWidth="2" />
    </svg>
  );


export const ChevronRightIcon = () => (
  
    <svg width="7" height="10" viewBox="0 0 7 10" fill="none" aria-hidden="true">
      <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  export const ActionButton = ({ kind, children, ...props }) => {
  const styles = {
    primary: 'bg-[#7C5DFA] text-white hover:bg-[#9277FF]',
    secondary: 'bg-[#F9FAFE] text-[#7E88C3] hover:bg-[#DFE3FA] dark:bg-[#252945] dark:text-[#DFE3FA] dark:hover:bg-white/10',
    danger: 'bg-[#EC5757] text-white hover:bg-[#FF9797]',
    dark: 'bg-[#373B53] text-[#888EB0] hover:bg-[#0C0E16] dark:bg-[#373B53] dark:text-[#DFE3FA] dark:hover:bg-[#1E2139]',
  };

  return (
    <button
      type="button"
      {...props}
      className={`rounded-full px-6 py-4 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${styles[kind]}`}
    >
      {children}
    </button>
  );
}


export const PlusIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M5 1V9M1 5H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);


export const ArrowLeftIcon = () => (
  
    <svg width="7" height="10" viewBox="0 0 7 10" fill="none" aria-hidden="true">
      <path d="M6 1L2 5L6 9" stroke="#7C5DFA" strokeWidth="2" />
    </svg>
  );

  export const StatusBadge = ({ status }) => {
  const toneMap = {
    paid: 'bg-[#F3FDFA] text-[#33D69F]',
    pending: 'bg-[#FFF8F0] text-[#FF8F00]',
    draft: 'bg-[#373B53]/10 text-[#373B53] dark:bg-white/10 dark:text-[#DFE3FA]',
  };

  return (
    <span className={`inline-flex min-w-[104px] items-center justify-center gap-2 rounded-md px-4 py-3 text-[15px] font-bold capitalize ${toneMap[status] || ''}`}>
      <span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />
      {status}
    </span>
  );
}


