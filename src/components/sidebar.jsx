import React from 'react';
import {
  LogoIcon, 
  SunIcon, 
  MoonIcon, 
  TrashIcon, 
  ChevronDownIcon, 
  ChevronRightIcon, 
  ActionButton, 
  PlusIcon, 
  ArrowLeftIcon, 
  StatusBadge } from './icons';
import userImage from '../assets/user.jpg';

function Sidebar({ theme, setTheme }) {
  return (
    <aside className="sticky top-0 z-20 flex items-center justify-between overflow-hidden rounded-b-[20px] bg-[#373B53] lg:h-screen lg:w-[103px] lg:flex-col lg:rounded-r-[20px] lg:rounded-bl-none">
      <div className="relative grid h-[72px] w-[72px] place-items-center overflow-hidden rounded-r-[20px] bg-[#7C5DFA] sm:h-[80px] sm:w-[80px] lg:h-[103px] lg:w-[103px]">
        <div className="absolute inset-x-0 bottom-0 h-1/2 rounded-tl-[20px] bg-[#9277FF]" />
        <div className="relative z-10">
          <LogoIcon /> 
        </div>
      </div>

      <div className="flex items-center lg:flex-col">
        <button
          type="button"
          onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
          className="grid h-[72px] w-[72px] place-items-center border-r border-[#494E6E] text-slate-400 transition hover:text-[#DFE3FA] lg:h-[88px] lg:w-[103px] lg:border-b lg:border-r-0"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />} 
        </button>

        <div className="grid h-[72px] w-[72px] place-items-center lg:h-[88px] lg:w-[103px]">
          <div className="flex" />
          <img src={userImage} alt="user-image" class="h-10 w-10 overflow-hidden rounded-full border-2 border-white"/>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;