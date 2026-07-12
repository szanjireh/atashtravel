import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TourPageTemplate from '@/components/tours/TourPageTemplate';
import { getTourBySlug } from '@/data/tours';

const TOUR_SLUG = 'antalya-tour';

export async function generateMetadata(): Promise<Metadata> {
  const tour = getTourBySlug(TOUR_SLUG);
  
  if (!tour) {
    return {
      title: 'تور یافت نشد',
    };
  }

  return {
    title: tour.seo.metaTitle,
    description: tour.seo.metaDescription,
    keywords: tour.seo.keywords,
    openGraph: {
      title: tour.seo.metaTitle,
      description: tour.seo.metaDescription,
      images: [
        {
          url: tour.seo.ogImage,
          width: 1200,
          height: 630,
          alt: tour.title,
        },
      ],
      locale: 'fa_IR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tour.seo.metaTitle,
      description: tour.seo.metaDescription,
      images: [tour.seo.ogImage],
    },
    alternates: {
      canonical: `https://atashtravel.com/tours/${TOUR_SLUG}`,
    },
  };
}

export default function AntalyaTourPage() {
  const tour = getTourBySlug(TOUR_SLUG);

  if (!tour) {
    notFound();
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TouristTrip',
            name: tour.title,
            description: tour.fullDescription,
            image: tour.heroImage,
            touristType: 'هموطنان ایرانی',
            itinerary: {
              '@type': 'ItemList',
              itemListElement: tour.itinerary.map((day, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: day.title,
                description: day.activities.join(', '),
              })),
            },
            offers: {
              '@type': 'Offer',
              price: tour.price,
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
            provider: {
              '@type': 'TravelAgency',
              name: 'آتاش تراول',
              url: 'https://atashtravel.com',
            },
          }),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: tour.faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'خانه',
                item: 'https://atashtravel.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'تورها',
                item: 'https://atashtravel.com/tours',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: tour.title,
                item: `https://atashtravel.com/tours/${TOUR_SLUG}`,
              },
            ],
          }),
        }}
      />

      <TourPageTemplate tour={tour} />
    </>
  );
}
