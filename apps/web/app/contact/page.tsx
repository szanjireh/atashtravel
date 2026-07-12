import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'تماس با ما | آتاش تراول',
  description: 'با آتاش تراول در تماس باشید. تیم پشتیبانی ۲۴/۷ ما آماده پاسخگویی به تمامی سوالات شما در زمینه سفر و گردشگری',
  keywords: 'تماس با آتاش تراول, پشتیبانی آتاش تراول, شماره تماس, واتساپ, آدرس, فرم تماس',
  openGraph: {
    title: 'تماس با ما | آتاش تراول',
    description: 'با آتاش تراول در تماس باشید. تیم پشتیبانی ۲۴/۷ ما آماده پاسخگویی به تمامی سوالات شما در زمینه سفر و گردشگری',
    type: 'website',
    locale: 'fa_IR',
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
