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
    <div className="flex-1 w-full flex flex-col space-y-1.5">
      {labelName && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-slate-300">
            {labelName}
          </label>
          {hint && (
            <span className="text-[11px] text-[#94A3B8] font-mono">
              {hint}
            </span>
          )}
        </div>
      )}

      <div className="relative w-full">
        {Icon && (
          <Icon className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#94A3B8] pointer-events-none" />
        )}

        {isTextArea ? (
          <textarea
            required={required}
            value={value}
            onChange={handleChange}
            rows={4}
            placeholder={placeholder}
            className={`w-full py-2 px-3 rounded-lg bg-[#0F131C] border border-white/[0.08] text-xs text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3B82F6] transition-colors resize-y ${
              Icon ? 'pl-9' : ''
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
            className={`w-full py-2 px-3 rounded-lg bg-[#0F131C] border border-white/[0.08] text-xs text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3B82F6] transition-colors ${
              Icon ? 'pl-9' : ''
            }`}
          />
        )}
      </div>
    </div>
  );
};

export default FormField;