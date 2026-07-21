'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';


interface Country {
  id: string;
  name: string;
  iso2?: string;
  iso3?: string;
}


export default function CountriesPage() {

  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    loadCountries();
  }, []);



  const loadCountries = async () => {

    try {

      const response = await apiClient.get('/countries');

      setCountries(response.data.data || []);

    } catch(error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };



  if (loading) {

    return (
      <div className="p-8">
        در حال بارگذاری...
      </div>
    );

  }



  return (

    <div className="p-8">


      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          مدیریت کشورها
        </h1>

        <p className="text-gray-600 mt-2">
          لیست کشورهای مقصد
        </p>

      </div>



      <div className="bg-white rounded-lg shadow">


        <table className="w-full">


          <thead className="bg-gray-50">

            <tr>

              <th className="p-4 text-right">
                نام کشور
              </th>


              <th className="p-4 text-right">
                کد دو حرفی
              </th>


              <th className="p-4 text-right">
                کد سه حرفی
              </th>


            </tr>

          </thead>



          <tbody>


          {countries.map(country => (

            <tr 
              key={country.id}
              className="border-t"
            >

              <td className="p-4">
                {country.name}
              </td>


              <td className="p-4">
                {country.iso2 || '-'}
              </td>


              <td className="p-4">
                {country.iso3 || '-'}
              </td>


            </tr>

          ))}


          </tbody>


        </table>


      </div>


    </div>

  );

}