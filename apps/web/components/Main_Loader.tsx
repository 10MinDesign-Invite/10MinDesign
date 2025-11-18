"use client";

export function Main_Loader() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center">

        <div className="relative">
          {/* Outer glow pulse */}
          <div className="absolute inset-0 rounded-full blur-3xl bg-gradient-to-br from-blue-600 to-pink-600 animate-pulse-slow"></div>

          {/* Logo with blur + opacity pulse */}
          <img
            src="/logo-nobg.png"
            alt="loader"
            className="w-36 h-36 relative z-10 animate-blurPulse"
          />
        </div>

      </div>
    </div>
  );
}
