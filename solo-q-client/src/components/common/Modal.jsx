function Modal({ children, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* 배경 */}
            <div
                className="absolute inset-0 bg-black/70"
                onClick={onClose}
            />

            {/* 내용 */}
            <div
                className="
          relative z-10
          w-full max-w-3xl 
          flex justify-center         
          max-h-[85vh]              
          overflow-y-auto          
          bg-slate-900
          rounded-2xl               
          p-6
          border border-white/10    
          shadow-2xl                
        "
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}

export default Modal;
