'use client';

import TourFormPage from '../../new/page';

export default function EditTourPage({ params }: { params: { id: string } }) {
  return <TourFormPage params={params} />;
}
