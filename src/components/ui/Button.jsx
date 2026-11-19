export function Button({ children, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary:
      'bg-[#FF8C00] text-white shadow-md shadow-orange-900/15 hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-900/20 active:scale-[0.98] border border-orange-700/25',
    ghost:
      'bg-transparent text-neutral-700 hover:bg-neutral-100/90 active:scale-[0.98] hover:shadow-sm',
    outline:
      'border border-neutral-300 bg-white text-neutral-800 hover:border-orange-300 hover:bg-orange-50/50 active:scale-[0.98] hover:shadow-sm',
  }
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ease-out ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
