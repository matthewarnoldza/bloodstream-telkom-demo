export function TopNav() {
  return (
    <header className="bg-white border-b border-tk-border shadow-tk-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-3">

        {/* Brand — black VML logo + gradient Bloodstream wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <img
            src="/vml-logo-black.png"
            alt="VML"
            className="h-7 w-auto object-contain"
          />
          <div className="h-6 w-px bg-gray-300" />
          <span
            className="font-bold text-[22px] tracking-tight leading-none font-telkom"
            style={{
              background: 'linear-gradient(135deg, #0099FF 0%, #00C8FF 40%, #91E200 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Bloodstream
          </span>
        </div>

        {/* Right side — Telkom logo */}
        <div className="flex items-center gap-3 shrink-0">
          <img
            src="/telkom-logo.svg"
            alt="Telkom"
            className="h-8 w-auto object-contain"
          />
        </div>
      </div>
    </header>
  )
}
