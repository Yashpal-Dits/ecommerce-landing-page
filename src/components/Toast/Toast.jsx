import { useEffect } from "react";
import './Toast.css';

export default function Toast({message, type = 'success', onClose}){
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000);
        return() => clearTimeout(timer);
    }, [onClose]);

    return (
         <div className={`toast toast--${type}`}>
      <div className="toast__icon">
        {type === 'success' && '✓'}
        {type === 'error' && '✕'}
        {type === 'info' && 'ℹ'}
      </div>
      <p className="toast__message">{message}</p>
      <button className="toast__close" onClick={onClose}>
        ×
      </button>
    </div>
    )
}