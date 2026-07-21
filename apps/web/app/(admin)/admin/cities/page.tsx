'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';

interface City {
  id: string;
  name: string;
  country: {
    id: string;
    name: string;
  };
  latitude?: number;
  longitude?: number;
}


export default function CitiesPage() {

  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    loadCities();
  }, []);



  const loadCities = async () => {
    try {

      const response = await apiClient.get('/cities');

      setCities(response.data.data || []);

    } catch (error) {

      console.error('Error loading cities:', error);

    } finally {

      setLoading(false);

    }
  };



  const deleteCity = async (id: string) => {

    const confirmDelete = confirm(
      'آیا از حذف این شهر مطمئن هستید؟'
    );


    if (!confirmDelete) return;


    try {

      await apiClient.delete(`/cities/${id}`);

      setCities(
        cities.filter(city => city.id !== id)
      );


    } catch (error:any) {

      alert(
        error.response?.data?.message ||
        'خطا در حذف شهر'
      );

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


      <div className="flex justify-between items-center mb-8">


        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            مدیریت شهرها
          </h1>

          <p className="text-gray-600 mt-2">
            مشاهده و مدیریت شهرهای مقصد
          </p>

        </div>


        <button
          className="
          bg-blue-600 
          text-white 
          px-6 
          py-3 
          rounded-lg
          hover:bg-blue-700
          "
        >
          افزودن شهر جدید
        </button>


      </div>



      <div className="bg-white rounded-lg shadow overflow-hidden">


        <table className="w-full">


          <thead className="bg-gray-50">

            <tr>

              <th className="p-4 text-right">
                نام شهر
              </th>


              <th className="p-4 text-right">
                کشور
              </th>


              <th className="p-4 text-right">
                عملیات
              </th>

            </tr>

          </thead>



          <tbody>


          {cities.map(city => (

            <tr 
              key={city.id}
              className="border-t"
            >


              <td className="p-4">
                {city.name}
              </td>


              <td className="p-4">
                {city.country?.name || '-'}
              </td>


              <td className="p-4">


                <button
                  onClick={() => deleteCity(city.id)}
                  className="
                  text-red-600
                  hover:text-red-800
                  "
                >
                  حذف
                </button>


              </td>


            </tr>

          ))}


          </tbody>


        </table>



        {cities.length === 0 && (

          <div className="p-10 text-center text-gray-500">

            هنوز شهری ثبت نشده است

          </div>

        )}



      </div>


    </div>

  );

}