import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Header/Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-lg">آ</span>
            </div>
            <span className="font-bold text-xl text-primary hidden sm:inline">آتاش تراول</span>
          </Link>
          
          <div className="flex items-center gap-2 sm:gap-8">
            <Link href="/" className="text-sm sm:text-base text-neutral-600 hover:text-primary transition-colors font-medium">
              خانه
            </Link>
            <Link href="/tours" className="text-sm sm:text-base text-primary transition-colors font-semibold">
              تورها
            </Link>
            <Link href="/hotels" className="text-sm sm:text-base text-neutral-600 hover:text-primary transition-colors font-medium">
              هتل‌ها
            </Link>
            <Link href="/login">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                ورود
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      {children}

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12 sm:py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="font-bold text-lg">آتاش تراول</h3>
              <p className="text-neutral-400 text-sm">پلتفرم سفر و گردشگری شما</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">خدمات</h4>
              <ul className="text-sm text-neutral-400 space-y-2">
                <li><Link href="/tours" className="hover:text-white transition-colors">تورها</Link></li>
                <li><Link href="/hotels" className="hover:text-white transition-colors">هتل‌ها</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">درباره ما</h4>
              <ul className="text-sm text-neutral-400 space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">درباره آتاش تراول</a></li>
                <li><a href="#" className="hover:text-white transition-colors">شرایط استفاده</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">تماس</h4>
              <ul className="text-sm text-neutral-400 space-y-2">
                <li>تلفن: ۱۲۳۴-۵۶۷</li>
                <li><a href="#" className="hover:text-white transition-colors">ایمیل</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 pt-8 text-center text-sm text-neutral-400">
            <p>© ۱۴۰۲ آتاش تراول. تمام حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
