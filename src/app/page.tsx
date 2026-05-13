import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { MenuExperience } from "@/components/MenuExperience";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getMenuRepository } from "@/server/menu-repository";

export default async function Home() {
  const repository = getMenuRepository();
  const [categories, products] = await Promise.all([
    repository.listCategories(),
    repository.listProducts()
  ]);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <MenuExperience categories={categories} products={products} />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
