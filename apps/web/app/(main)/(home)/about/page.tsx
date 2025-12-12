// app/about/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { Header } from "../components/Header";

export const metadata: Metadata = {
  title: "About Us - 10MinDesign",
  description:
    "Discover 10MinDesign – your destination for fast, professional, and elegant invitation card designs.",
};

export default function AboutPage() {
  return (
    <>
      <Header disableAnimation={true} disableLoginButton={true} />
      <section className="max-w-5xl mx-auto mt-9 px-6 py-16 text-slate-800 dark:text-slate-200 transition-colors">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-center mb-4 text-violet-700 dark:text-violet-400">
          About 10MinDesign
        </h1>
        <p className="text-center text-lg text-slate-600 dark:text-slate-400 mb-12">
          Beautifully crafted invitation cards – designed in minutes, shared in
          moments.
        </p>

        {/* Story */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3 text-blue-700 dark:text-blue-400">
            Our Story
          </h2>
          <p className="leading-relaxed">
            10MinDesign was born from a simple idea — to make professional
            invitation cards accessible to everyone. Whether it's a wedding,
            birthday, or festive event, creating a stunning invite shouldn't
            require hours or a designer. Our platform brings elegance, speed,
            and ease together — so your moments shine from the start.
          </p>
        </div>

        {/* Services */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3 text-blue-700 dark:text-blue-400">
            What We Offer
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Over 100+ professionally designed templates</li>
            <li>Real-time customization with fonts, colors & images</li>
            <li>One-click PNG download & instant sharing options</li>
            <li>Fully responsive and optimized for all devices</li>
          </ul>
        </div>

        {/* Vision */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3 text-blue-700 dark:text-blue-400">
            Our Vision
          </h2>
          <p className="leading-relaxed">
            We envision a world where design meets simplicity. Our mission is to
            help individuals and businesses express themselves with beautiful,
            modern, and hassle-free invitations — all within 10 minutes.
          </p>
        </div>

        {/* Custom Design Contact */}
        <div className="mt-16 mb-20 bg-gradient-to-r from-violet-600 to-blue-600 dark:from-violet-500 dark:to-blue-500 text-white p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-2">Need a Custom Design?</h2>
          <p className="mb-4 text-lg">
            Want something unique? We offer personalized invitations just for
            you! Contact us and get your design delivered to your{" "}
            <strong>WhatsApp</strong> or <strong>email</strong>.
          </p>
          <p className="text-lg font-medium mb-2">
            Email us at:{" "}
            <a
              href="mailto:10MinDesign.invite@gmail.com"
              className="underline hover:text-yellow-200 transition"
            >
              10MinDesign.invite@gmail.com
            </a>
          </p>
          <p className="text-sm italic opacity-90">
            With your permission, we may even showcase your custom invite on our
            website!
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-xl font-medium mb-4">
            Start designing your next invite today!
          </p>
          <Link
            href="/explore"
            className="bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 text-white px-8 py-3 rounded-full text-lg shadow-md transition-all"
          >
            Create Your Invite
          </Link>
        </div>
      </section>
    </>
  );
}
