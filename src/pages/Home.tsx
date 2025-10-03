import React from 'react';
import Hero from '../components/Hero';
import WelcomeMessage from '../components/WelcomeMessage';
import MassSchedulePreview from '../components/MassSchedulePreview';
import ClergySection from '../components/ClergySection';
import MassIntentionsSection from '../components/MassIntentionsSection';
import AnnouncementsSection from '../components/AnnouncementsSection';
import MarketplacePreview from '../components/MarketplacePreview';
import FeaturedHomilySection from '../components/FeaturedHomilySection';
import EventsPreview from '../components/EventsPreview';

const Home = () => {
  return (
    <div className="bg-beigeBg">
      <Hero />
      <WelcomeMessage />

      {/* Mass Schedule and Events Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <MassSchedulePreview />
            <EventsPreview />
          </div>
        </div>
      </section>

      <ClergySection />
      <MassIntentionsSection />
      <AnnouncementsSection />
      <MarketplacePreview />
      <FeaturedHomilySection />
    </div>
  );
};

export default Home;
