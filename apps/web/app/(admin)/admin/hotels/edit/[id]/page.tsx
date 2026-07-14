'use client';

import HotelFormPage from '../../new/page';

export default function EditHotelPage({ params }: { params: { id: string } }) {
  return <HotelFormPage params={params} />;
}
