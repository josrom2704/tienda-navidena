"use client";

import { HeroBanner } from "@/components/hero-banner";
import { FeaturesSection } from "@/components/features-section";
import { DailySelection } from "@/components/daily-selection";
import { CategoriesGrid } from "@/components/categories-grid";
import { CustomQuoteSection } from "@/components/custom-quote-section";
import { DebugPanel } from "@/components/debug-panel";

export default function HomePage() {
  return (
    <main>
      <HeroBanner />
      <FeaturesSection />
      <DailySelection />
      <CategoriesGrid />
      <CustomQuoteSection />
      <DebugPanel />
    </main>
  );
}
