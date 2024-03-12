'use server'
import Header from "../components/Layout/Header";
import Hero from "../shared/Root/Hero";

export default async function HomeScreen() {
  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
};

