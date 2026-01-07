function Button({
    children,
    onClick,
    type = 'button',
    disabled = false,
    variant = 'primary',
    className = '',
}) {
    const base =
        'px-4 py-2 rounded-lg text-sm font-medium transition';

    const styles = {
        primary: 'bg-purple-600 text-white hover:bg-purple-500',
        ghost: 'bg-transparent text-slate-300 hover:text-white',
        danger: 'bg-red-600 text-white hover:bg-red-500',
        outline: 'border border-white/20 text-white hover:bg-white/10',
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${base} ${styles[variant] || styles.primary} ${disabled ? 'opacity-50 cursor-not-allowed' : ''
                }${className}`}
        >
            {children}
        </button>
    );
}

export default Button;
