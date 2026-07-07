import { Module } from '@nestjs/common';
import { TourController } from './tour.controller';
import { TourService } from './tour.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TourController],
  providers: [TourService],
  exports: [TourService],
})
export class TourModule {}
