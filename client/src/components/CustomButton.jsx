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
      className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg font-medium text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${styles}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{title}</span>
    </button>
  );
};

export default CustomButton;