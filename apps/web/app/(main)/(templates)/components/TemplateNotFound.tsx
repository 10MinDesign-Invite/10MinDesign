import Link from "next/link";

export default function TemplateNotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-gray-400 p-6 text-center space-y-6">
      <h1 className="text-4xl font-bold">Oops! Template Not Found</h1>
      <p className="text-lg max-w-md">
        The template you are looking for does not exist or may have been removed.
      </p>

      <div className="flex space-x-4 mt-4">
        <Link
          href="/"
          className="px-5 py-2 rounded-2xl bg-gray-800 hover:bg-gray-700 text-gray-200 transition"
        >
          Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="px-5 py-2 rounded-2xl bg-gray-800 hover:bg-gray-700 text-gray-200 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}
