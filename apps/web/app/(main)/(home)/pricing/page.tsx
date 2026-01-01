import { Header } from "../components/Header";

export default function PricingPage() {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-200 dark:bg-black">
      <Header disableAnimation={true} disableLoginButton={true} />
      <h1 className="text-4xl font-bold mb-4 text-purple-400">Pricing</h1>
      <p className="text-lg text-gray-700">Coming soon!</p>
    </section>
  );
}