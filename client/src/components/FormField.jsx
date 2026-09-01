import React from 'react';

const FormField = ({ 
  labelName, 
  placeholder, 
  inputType = "text", 
  isTextArea = false, 
  value, 
  handleChange, 
  step,
  hint,
  required = true,
  icon: Icon
}) => {
  return (
    <label className="flex-1 w-full flex flex-col space-y-2">
      {labelName && (
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300 tracking-wide">
            {labelName}
          </span>
          {hint && (
            <span className="text-[11px] text-slate-400">
              {hint}
            </span>
          )}
        </div>
      )}

      <div className="relative w-full">
        {Icon && (
          <Icon className="absolute left-4 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
        )}

        {isTextArea ? (
          <textarea
            required={required}
            value={value}
            onChange={handleChange}
            rows={5}
            placeholder={placeholder}
            className={`w-full py-3.5 px-4 rounded-2xl bg-white/[0.04] border border-white/[0.1] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.06] transition-all backdrop-blur-md resize-y min-h-[120px] ${
              Icon ? 'pl-11' : ''
            }`}
          />
        ) : (
          <input
            required={required}
            value={value}
            onChange={handleChange}
            type={inputType}
            step={step}
            placeholder={placeholder}
            className={`w-full py-3 px-4 rounded-2xl bg-white/[0.04] border border-white/[0.1] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.06] transition-all backdrop-blur-md ${
              Icon ? 'pl-11' : ''
            }`}
          />
        )}
      </div>
    </label>
  );
};

export default FormField;