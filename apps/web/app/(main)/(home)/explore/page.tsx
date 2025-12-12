import Link from "next/link";
import { Header } from "../components/Header";

const categories = [
  {
    name: "Wedding",
    slug: `category/wedding`,
    bg: "from-pink-500 to-pink-400",
  },
  {
    name: "Birthday",
    slug: "category/birthday",
    bg: "from-yellow-500 to-yellow-400",
  },
  { name: "RIP", slug: "category/rip", bg: "from-gray-700 to-gray-600" },
  {
    name: "Opening",
    slug: "category/opening",
    bg: "from-blue-500 to-blue-400",
  },
  {
    name: "Festival",
    slug: "category/festival",
    bg: "from-purple-600 to-purple-500",
  },
];

export default async function ExplorePage() {
  return (
    <>
      <Header disableAnimation={true} disableLoginButton={true} />

      <div className="min-h-screen py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold dark:text-gray-400 text-gray-500 tracking-tight mb-12">
            Explore Categories
          </h2>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className={`bg-gradient-to-br ${cat.bg} text-white font-semibold text-xl rounded-2xl p-8 shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
