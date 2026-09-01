import React from 'react';

const CustomButton = ({ 
  btnType = "button", 
  title, 
  handleClick, 
  styles = "", 
  disabled = false,
  icon: Icon
}) => {
  return (
    <button
      type={btnType}
      disabled={disabled}
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg ${styles}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{title}</span>
    </button>
  );
};

export default CustomButton;