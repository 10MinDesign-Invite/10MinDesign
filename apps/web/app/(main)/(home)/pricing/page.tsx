import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen mt-5 md:mt-0 flex items-center justify-center px-6">
      
      <div className="max-w-6xl w-full">
        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold dark:text-gray-400 text-gray-500 tracking-tight mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-gray-400 text-lg">
            Choose the plan that fits your needs
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:m-9 lg:m-0">

          {/* Regular */}
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-indigo-500 transition">
            <h2 className="text-xl font-semibold text-white mb-2">Regular</h2>
            <p className="text-gray-400 mb-6">For starters</p>

            <p className="text-4xl font-bold text-white mb-6">
              ₹99
            </p>

            <ul className="text-gray-300 space-y-3 mb-8">
              <li>✔ Limited access</li>
              <li className="text-red-400">✖ No translate</li>
              <li>✔ 1 Template Download</li>
            </ul>

            <button className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition">
              <Link href={"/explore"}>Explore</Link>
            </button>
          </div>

          {/* Basic */}
          <div className="bg-slate-800 rounded-2xl p-8 border border-indigo-500 shadow-xl scale-105 relative">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-sm px-4 py-1 rounded-full">
              Most Popular
            </span>

            <h2 className="text-xl font-semibold text-white mb-2">Basic</h2>
            <p className="text-gray-400 mb-6">Best for individuals</p>

            <p className="text-4xl font-bold text-white mb-6">
              ₹4,999
            </p>

            <ul className="text-gray-300 space-y-3 mb-8">
              <li>✔ Basic access</li>
              <li>✔ Translation support</li>
              <li>✔ 100 Template Download</li>
            </ul>

            <button className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition">
              Pay Now
            </button>
          </div>

          {/* Premium */}
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-indigo-500 transition">
            <h2 className="text-xl font-semibold text-white mb-2">Premium</h2>
            <p className="text-gray-400 mb-6">For professionals</p>

            <p className="text-4xl font-bold text-white mb-6">
              ₹9,999
            </p>

            <ul className="text-gray-300 space-y-3 mb-8">
              <li>✔ Everything in Basic</li>
              <li>✔ Custome Design Request</li>
              <li>✔ 500 Template Download</li>
            </ul>

            <button className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition">
              Pay Now
            </button>
          </div>

        </div>
        <div className="text-center mt-6 text-slate-400">
        <Link href={"/"}>
          Back to Home
        </Link>
        </div>
      </div>
      
    </div>
  );
}
