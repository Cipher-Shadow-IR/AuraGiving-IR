import React from 'react';
import { CheckCircle2, AlertCircle, Info, X, ExternalLink } from 'lucide-react';
import { useStateContext } from '../context';
import { EXPLORER_URL } from '../config/contract';

const Toast = () => {
  const { toasts, removeToast } = useStateContext();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-3">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-2.5 p-3 rounded-lg border border-white/[0.08] bg-[#12151C]/95 backdrop-blur-md shadow-lg text-slate-200"
          >
            <div className="mt-0.5 flex-shrink-0">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              {isError && <AlertCircle className="w-4 h-4 text-rose-400" />}
              {!isSuccess && !isError && <Info className="w-4 h-4 text-slate-400" />}
            </div>

            <div className="flex-1 text-xs leading-relaxed">
              <p>{toast.message}</p>
              {toast.txHash && toast.txHash.startsWith('0x') && toast.txHash !== '0x_mock_tx_sample' && (
                <a
                  href={`${EXPLORER_URL}/tx/${toast.txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:underline font-mono"
                >
                  <span>Explorer</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
