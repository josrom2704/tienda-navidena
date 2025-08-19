"use client";

import { CategoriesGrid } from '@/components/categories-grid';
import { DailySelection } from '@/components/daily-selection';
import { FeaturesSection } from '@/components/features-section';
import { HeroBanner } from '@/components/hero-banner';
import { CustomQuoteSection } from '@/components/custom-quote-section';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <CategoriesGrid />
      <DailySelection />
      <FeaturesSection />
      <CustomQuoteSection />
    </main>
  );
}
