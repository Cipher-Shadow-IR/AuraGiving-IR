import React from 'react';

const CountBox = ({ title, value, subtitle, icon: Icon, color = "emerald" }) => {
  return (
    <div className="flex-1 min-w-[140px] p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl flex flex-col justify-between space-y-2 hover:border-emerald-500/30 transition-all shadow-lg">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        {Icon && <Icon className="w-4 h-4 text-emerald-400" />}
      </div>

      <div className="space-y-0.5">
        <h4 className="font-display font-black text-2xl sm:text-3xl text-white font-mono truncate">
          {value}
        </h4>
        {subtitle && (
          <p className="text-[11px] text-slate-400 truncate">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default CountBox;