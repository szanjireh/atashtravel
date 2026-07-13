import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <h1 className="text-2xl font-bold text-gray-900">
              پنل مدیریت آتاش تراول
            </h1>
          </div>
          <nav className="flex items-center space-x-6 space-x-reverse">
            <a href="/admin/tours" className="text-gray-700 hover:text-blue-600 font-medium">
              مدیریت تورها
            </a>
            <a href="/" className="text-gray-600 hover:text-gray-900">
              مشاهده سایت
            </a>
          </nav>
        </div>
      </header>

      {/* Admin Content */}
      <main>{children}</main>

      {/* Admin Footer */}
      <footer className="bg-white border-t mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>پنل مدیریت آتاش تراول © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
