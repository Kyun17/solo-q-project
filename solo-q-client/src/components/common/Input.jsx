function Input({ value, onChange, placeholder = '' }) {
    return (
        <input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="
        w-full rounded-lg px-3 py-2 text-sm
        bg-white/5 border border-white/10
        text-white placeholder-slate-400
        focus:outline-none focus:border-purple-500
      "
        />
    );
}

export default Input;
