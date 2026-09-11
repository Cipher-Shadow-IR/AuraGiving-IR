import React, { useEffect, useRef, useState } from "react";
import { useStateContext } from "../context";

export default function Connectbutton() {
  const { address, balance, isConnecting, connectWallet, disconnectWallet } = useStateContext();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => (address ? setOpen((v) => !v) : connectWallet())}
        className="bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold shadow hover:bg-gray-200 transition flex items-center gap-2"
      >
        {isConnecting
          ? "Connecting..."
          : address
            ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  {address.slice(0, 6)}...{address.slice(-4)}
                </>
              )
            : "Connect Wallet"}
      </button>

      {open && address && (
        <div className="absolute right-0 mt-2 w-72 rounded-xl bg-[#141A26] border border-white/[0.08] shadow-2xl shadow-black/40 p-4 z-50">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8]">
              Connected Wallet
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-mono text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              Active
            </span>
          </div>

          <button
            type="button"
            onClick={copyAddress}
            className="mt-3 w-full flex items-center justify-between gap-2 rounded-lg bg-white/[0.04] border border-white/[0.06] px-3 py-2 text-xs font-mono text-slate-200 hover:border-white/[0.16] hover:bg-white/[0.06] transition group"
          >
            <span className="truncate">{address}</span>
            <span className="shrink-0 text-[10px] font-medium text-purple-300 group-hover:text-purple-200">
              {copied ? "Copied!" : "Copy"}
            </span>
          </button>

          <div className="mt-2.5 flex items-center justify-between rounded-lg bg-white/[0.02] border border-white/[0.05] px-3 py-2">
            <span className="text-xs text-[#94A3B8]">Balance</span>
            <span className="text-xs font-mono font-bold text-slate-100">
              {balance} <span className="text-[#94A3B8] font-normal">ETH</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              disconnectWallet();
            }}
            className="mt-3 w-full rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}