import { TourData } from '@/types/tour';
import Header from '@/components/header';
import TourHero from '@/components/tours/TourHero';
import TourSummary from '@/components/tours/TourSummary';
import TourFeatures from '@/components/tours/TourFeatures';
import TourItinerary from '@/components/tours/TourItinerary';
import TourServices from '@/components/tours/TourServices';
import TourHotels from '@/components/tours/TourHotels';
import TourFAQ from '@/components/tours/TourFAQ';
import TourTips from '@/components/tours/TourTips';
import RelatedTours from '@/components/tours/RelatedTours';
import BookingCTA from '@/components/tours/BookingCTA';
import { getRelatedTours } from '@/data/tours';

interface TourPageTemplateProps {
  tour: TourData;
}

export default function TourPageTemplate({ tour }: TourPageTemplateProps) {
  const relatedTours = getRelatedTours(tour.slug);

  return (
    <main dir="rtl" className="relative min-h-screen overflow-hidden bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Dynamic Glow Orbs */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-cyan-500/20 to-sky-500/0 opacity-60 blur-[140px] animate-pulse" />
      <div className="pointer-events-none absolute top-[1200px] left-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-500/10 to-transparent opacity-40 blur-[120px]" />
      <div className="pointer-events-none absolute top-[2400px] right-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-30 blur-[100px]" />

      <div className="relative z-10">
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <TourHero
          title={tour.title}
          shortDescription={tour.shortDescription}
          heroImage={tour.heroImage}
          duration={tour.duration}
          price={tour.price}
          destination={tour.destination}
        />

        {/* Tour Summary */}
        <TourSummary tour={tour} />

        {/* Features/Attractions */}
        <TourFeatures attractions={tour.attractions} />

        {/* Itinerary */}
        <TourItinerary itinerary={tour.itinerary} />

        {/* Services */}
        <TourServices included={tour.included} excluded={tour.excluded} />

        {/* Hotels */}
        <TourHotels hotels={tour.hotels} />

        {/* Tips & Documents */}
        <TourTips tips={tour.tips} requiredDocuments={tour.requiredDocuments} />

        {/* FAQ */}
        <TourFAQ faqs={tour.faqs} />

        {/* Related Tours */}
        <RelatedTours tours={relatedTours} />

        {/* Booking CTA */}
        <BookingCTA tour={tour} />

        {/* Footer */}
        <footer className="border-t border-white/5 bg-[#030712]/80 backdrop-blur-md py-12 px-6 sm:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-slate-400">
              © {new Date().getFullYear()} آتاش تراول. تمامی حقوق محفوظ است.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
