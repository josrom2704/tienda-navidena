"use client";

import { HeroBanner } from "@/components/hero-banner";
import { DailySelection } from "@/components/daily-selection";
import { CategoriesGrid } from "@/components/categories-grid";
import { FeaturesSection } from "@/components/features-section";
import { CustomQuoteSection } from "@/components/custom-quote-section";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <HeroBanner />
      <DailySelection />
      <CategoriesGrid />
      <FeaturesSection />
      <CustomQuoteSection />
    </div>
  );
}
