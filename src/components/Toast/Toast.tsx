import { useEffect } from "react";

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);
  const typeConfigs = {
    success: { border: 'border-green-500', iconBg: 'bg-green-500', icon: '✓' },
    error: { border: 'border-red-500', iconBg: 'bg-red-500', icon: '✕' },
    info: { border: 'border-blue-500', iconBg: 'bg-blue-500', icon: 'ℹ' }
  };

  const config = typeConfigs[type] || typeConfigs.success;
  return (
    <div className={`
      flex items-center gap-3 p-4 px-5 w-80 
      bg-white rounded shadow-2xl border-l-4 ${config.border}
      transition-all duration-300 ease-in-out
    `}>
      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${config.iconBg}`}>
        {config.icon}
      </div>
      <p className="flex-1 text-sm font-semibold text-gray-800 m-0">
        {message}
      </p>
      <button 
        className="flex-shrink-0 text-gray-400 hover:text-black text-xl leading-none px-1" 
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
}