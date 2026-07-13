import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TourPageTemplate from '@/components/tours/TourPageTemplate';

interface TourPageProps {
  params: { slug: string };
}

// Fetch single tour from API
async function getTour(slug: string) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
    const response = await fetch(`${API_URL}/tours/${slug}`, {
      next: { revalidate: 60 },
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching tour:', error);
    return null;
  }
}

// Generate static params for all tours
export async function generateStaticParams() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
    const response = await fetch(`${API_URL}/tours?limit=100&status=active`);
    const data = await response.json();
    const tours = data.data || [];
    
    return tours.map((tour: any) => ({
      slug: tour.slug,
    }));
  } catch (error) {
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: TourPageProps): Promise<Metadata> {
  const tour = await getTour(params.slug);
  
  if (!tour) {
    return {
      title: 'تور یافت نشد',
    };
  }

  const title = tour.seoTitle || tour.title;
  const description = tour.seoDescription || tour.shortDescription;
  const image = tour.seoOgImage || tour.heroImage || tour.coverImage;

  return {
    title,
    description,
    keywords: tour.seoKeywords || [],
    openGraph: {
      title,
      description,
      images: image ? [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: tour.title,
        },
      ] : [],
      locale: 'fa_IR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [],
    },
    alternates: {
      canonical: `https://atashtravel.com/tours/${params.slug}`,
    },
  };
}

export default async function TourDetailPage({ params }: TourPageProps) {
  const tour = await getTour(params.slug);

  if (!tour) {
    notFound();
  }

  // Transform API data to match TourData interface
  const tourData = {
    slug: tour.slug,
    title: tour.title,
    destination: tour.destination || tour.city?.name || '',
    country: tour.country?.name || '',
    duration: tour.duration || `${tour.durationNights} شب و ${tour.durationDays} روز`,
    price: tour.price || '',
    priceDetail: tour.priceDetail || '',
    image: tour.coverImage || tour.heroImage || '',
    heroImage: tour.heroImage || tour.coverImage || '',
    shortDescription: tour.shortDescription || '',
    departureInfo: tour.departureInfo || '',
    hotelInfo: tour.hotelInfo || '',
    transportation: tour.transportation || '',
    fullDescription: tour.fullDescription || tour.description || '',
    whyChoose: tour.whyChoose || [],
    bestTime: tour.bestTime || '',
    attractions: tour.attractions || [],
    included: tour.services?.filter((s: any) => s.included).map((s: any) => s.serviceName) || [],
    excluded: tour.excluded?.map((s: any) => s.serviceName) || [],
    hotels: tour.hotels || [],
    itinerary: tour.itineraries?.map((i: any) => ({
      day: i.dayNumber,
      title: i.title,
      activities: i.activities?.split('\n').filter(Boolean) || [],
      meals: i.meals,
      accommodation: i.hotel?.name,
    })) || [],
    faqs: tour.faqs || [],
    tips: tour.tips || [],
    requiredDocuments: tour.requiredDocuments || [],
    relatedTours: tour.relatedTours || [],
    gallery: tour.galleryImages || [],
    seo: {
      metaTitle: tour.seoTitle || tour.title,
      metaDescription: tour.seoDescription || tour.shortDescription,
      keywords: tour.seoKeywords || [],
      ogImage: tour.seoOgImage || tour.heroImage || tour.coverImage,
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TouristTrip',
            name: tourData.title,
            description: tourData.fullDescription,
            image: tourData.heroImage,
            touristType: 'هموطنان ایرانی',
            itinerary: {
              '@type': 'ItemList',
              itemListElement: tourData.itinerary.map((day, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: day.title,
                description: day.activities.join(', '),
              })),
            },
            offers: {
              '@type': 'Offer',
              price: tourData.price,
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
            provider: {
              '@type': 'TravelAgency',
              name: 'آتاش تراول',
              url: 'https://atashtravel.com',
              telephone: '+989128637309',
            },
          }),
        }}
      />

      {/* FAQ Schema */}
      {tourData.faqs && tourData.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: tourData.faqs.map((faq: any) => ({
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
      )}

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
                name: tourData.title,
                item: `https://atashtravel.com/tours/${params.slug}`,
              },
            ],
          }),
        }}
      />

      <TourPageTemplate tour={tourData} />
    </>
  );
}
