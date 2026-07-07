import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create Roles
  console.log('Creating roles...');
  const roles = await Promise.all([
    prisma.role.upsert({
      where: { name: 'admin' },
      update: {},
      create: {
        name: 'admin',
        description: 'مدیر سیستم',
      },
    }),
    prisma.role.upsert({
      where: { name: 'user' },
      update: {},
      create: {
        name: 'user',
        description: 'کاربر عادی',
      },
    }),
    prisma.role.upsert({
      where: { name: 'tour_manager' },
      update: {},
      create: {
        name: 'tour_manager',
        description: 'مدیر تورها',
      },
    }),
  ]);

  console.log('✅ Roles created');

  // Create Admin User
  console.log('Creating admin user...');
  const passwordHash = await argon2.hash('Admin123!@#');
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@atashtravel.com' },
    update: {},
    create: {
      email: 'admin@atashtravel.com',
      firstName: 'مدیر',
      lastName: 'سیستم',
      passwordHash,
      isVerified: true,
      status: 'active',
    },
  });

  // Assign admin role
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: adminUser.id,
        roleId: roles[0].id,
      },
    },
    update: {},
    create: {
      userId: adminUser.id,
      roleId: roles[0].id,
    },
  });

  console.log('✅ Admin user created: admin@atashtravel.com / Admin123!@#');

  // Create Test User
  console.log('Creating test user...');
  const testPasswordHash = await argon2.hash('User123!@#');
  
  const testUser = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      email: 'user@test.com',
      firstName: 'کاربر',
      lastName: 'تستی',
      passwordHash: testPasswordHash,
      isVerified: true,
      status: 'active',
    },
  });

  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: testUser.id,
        roleId: roles[1].id,
      },
    },
    update: {},
    create: {
      userId: testUser.id,
      roleId: roles[1].id,
    },
  });

  console.log('✅ Test user created: user@test.com / User123!@#');

  // Create Countries
  console.log('Creating countries...');
  const iran = await prisma.country.upsert({
    where: { code: 'IR' },
    update: {},
    create: {
      code: 'IR',
      name: 'ایران',
      nameFa: 'ایران',
      nameEn: 'Iran',
    },
  });

  const turkey = await prisma.country.upsert({
    where: { code: 'TR' },
    update: {},
    create: {
      code: 'TR',
      name: 'ترکیه',
      nameFa: 'ترکیه',
      nameEn: 'Turkey',
    },
  });

  console.log('✅ Countries created');

  // Create Cities
  console.log('Creating cities...');
  const tehran = await prisma.city.upsert({
    where: { name: 'تهران' },
    update: {},
    create: {
      name: 'تهران',
      countryId: iran.id,
    },
  });

  const istanbul = await prisma.city.upsert({
    where: { name: 'استانبول' },
    update: {},
    create: {
      name: 'استانبول',
      countryId: turkey.id,
    },
  });

  const antalya = await prisma.city.upsert({
    where: { name: 'آنتالیا' },
    update: {},
    create: {
      name: 'آنتالیا',
      countryId: turkey.id,
    },
  });

  console.log('✅ Cities created');

  // Create Destinations
  console.log('Creating destinations...');
  const destination1 = await prisma.destination.create({
    data: {
      name: 'استانبول',
      slug: 'istanbul',
      description: 'شهر زیبای استانبول، پل بین شرق و غرب',
      countryId: turkey.id,
      cityId: istanbul.id,
    },
  });

  const destination2 = await prisma.destination.create({
    data: {
      name: 'آنتالیا',
      slug: 'antalya',
      description: 'بهشت ساحلی ترکیه',
      countryId: turkey.id,
      cityId: antalya.id,
    },
  });

  console.log('✅ Destinations created');

  // Create Tour Categories
  console.log('Creating tour categories...');
  const tourCategory = await prisma.tourCategory.create({
    data: {
      name: 'تور ترکیه',
      slug: 'turkey-tours',
      description: 'تورهای گردشگری ترکیه',
    },
  });

  console.log('✅ Tour categories created');

  // Create Sample Tours
  console.log('Creating sample tours...');
  
  const tour1 = await prisma.tour.create({
    data: {
      title: 'تور 7 روزه استانبول',
      slug: 'istanbul-7-days',
      description: 'تور کامل استانبول با بازدید از جاذبه‌های تاریخی و مدرن شهر',
      categoryId: tourCategory.id,
      destinationId: destination1.id,
      duration: 7,
      durationType: 'days',
      priceAdult: 25000000,
      priceChild: 18000000,
      priceInfant: 5000000,
      currency: 'IRR',
      status: 'published',
      isActive: true,
      isFeatured: true,
      minParticipants: 10,
      maxParticipants: 40,
      included: ['پرواز رفت و برگشت', 'هتل 4 ستاره', 'صبحانه', 'گاید فارسی زبان'],
      excluded: ['بیمه مسافرتی', 'ویزا', 'ناهار و شام'],
      meetingPoint: 'فرودگاه امام خمینی (ره)',
      cancellationPolicy: 'تا 7 روز قبل از سفر: کنسلی رایگان، کمتر از 7 روز: 50 درصد هزینه',
    },
  });

  const tour2 = await prisma.tour.create({
    data: {
      title: 'تور 5 روزه آنتالیا',
      slug: 'antalya-5-days',
      description: 'تور ساحلی آنتالیا با اقامت در هتل‌های لوکس ساحلی',
      categoryId: tourCategory.id,
      destinationId: destination2.id,
      duration: 5,
      durationType: 'days',
      priceAdult: 18000000,
      priceChild: 13000000,
      priceInfant: 4000000,
      currency: 'IRR',
      status: 'published',
      isActive: true,
      isFeatured: true,
      minParticipants: 10,
      maxParticipants: 35,
      included: ['پرواز رفت و برگشت', 'هتل 5 ستاره ساحلی', 'صبحانه و شام', 'گاید فارسی زبان'],
      excluded: ['بیمه مسافرتی', 'ویزا', 'ناهار'],
      meetingPoint: 'فرودگاه امام خمینی (ره)',
      cancellationPolicy: 'تا 7 روز قبل از سفر: کنسلی رایگان، کمتر از 7 روز: 50 درصد هزینه',
    },
  });

  console.log('✅ Sample tours created');

  // Create Currencies
  console.log('Creating currencies...');
  await prisma.currency.upsert({
    where: { code: 'IRR' },
    update: {},
    create: {
      code: 'IRR',
      name: 'ریال ایران',
      symbol: 'ریال',
      exchangeRate: 1,
    },
  });

  await prisma.currency.upsert({
    where: { code: 'USD' },
    update: {},
    create: {
      code: 'USD',
      name: 'دلار آمریکا',
      symbol: '$',
      exchangeRate: 0.000024,
    },
  });

  await prisma.currency.upsert({
    where: { code: 'EUR' },
    update: {},
    create: {
      code: 'EUR',
      name: 'یورو',
      symbol: '€',
      exchangeRate: 0.000022,
    },
  });

  console.log('✅ Currencies created');

  // Create Languages
  console.log('Creating languages...');
  await prisma.language.upsert({
    where: { code: 'fa' },
    update: {},
    create: {
      code: 'fa',
      name: 'فارسی',
      nativeName: 'فارسی',
      isRtl: true,
      isActive: true,
    },
  });

  await prisma.language.upsert({
    where: { code: 'en' },
    update: {},
    create: {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      isRtl: false,
      isActive: true,
    },
  });

  console.log('✅ Languages created');

  console.log('✨ Seed completed successfully!');
  console.log('\n📝 Test Credentials:');
  console.log('Admin: admin@atashtravel.com / Admin123!@#');
  console.log('User: user@test.com / User123!@#');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
