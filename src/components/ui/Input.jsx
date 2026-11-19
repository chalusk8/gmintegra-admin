export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full rounded-md border border-neutral-300 bg-white px-2.5 py-2 text-sm text-neutral-900 outline-none transition-all duration-200 placeholder:text-neutral-400 hover:border-neutral-400 focus:border-[#FF8C00] focus:shadow-[0_0_0_3px_rgba(255,140,0,0.18)] focus:ring-0 ${className}`}
      {...props}
    />
  )
}
