import { MetadataRoute } from 'next'

const BASE_URL = 'https://atashtravel.com'

// Fetch all active tours from API
async function getTours() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'
    const response = await fetch(`${API_URL}/tours?limit=1000&status=active`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })
    
    if (!response.ok) {
      return []
    }
    
    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching tours for sitemap:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch tours from API
  const tours = await getTours()

  // Static pages
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tours`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/hotels`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/visa`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // Dynamic tour pages from API
  const tourPages = tours.map((tour: any) => ({
    url: `${BASE_URL}/tours/${tour.slug}`,
    lastModified: new Date(tour.updatedAt || tour.createdAt),
    changeFrequency: 'weekly' as const,
    priority: tour.featured ? 0.9 : 0.7,
  }))

  return [...staticPages, ...tourPages]
}