import Toast from './Toast';
export default function ToastContainer({ toasts, removeToast }) {
  if (!toasts || toasts.length === 0) return null;
  return (
    <div className="fixed top-4 right-4 z-[9999] grid grid-cols-1 pointer-events-none">
      {toasts.map((toast, index) => (
        <div 
          key={toast.id} 
          className="col-start-1 row-start-1 pointer-events-auto"
          style={{ 
            zIndex: index,
            transform: `translateY(${index * 2}px) translateX(-${index * 2}px)`,
          }}
        >
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
}
