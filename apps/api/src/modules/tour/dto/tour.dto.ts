import { IsString, IsOptional, IsNumber, IsArray, IsDateString, IsBoolean, Min, Max, IsObject, IsJSON } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateTourDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  destination?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  shortDescription?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fullDescription?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty()
  @IsString()
  countryId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cityId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  duration?: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  durationDays: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  durationNights: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  price?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  priceDetail?: string;

  // Images
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  coverImage?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  heroImage?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  galleryImages?: string[];

  // Logistics
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  departureInfo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  hotelInfo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  transportation?: string;

  // Additional info
  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  whyChoose?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  bestTime?: string;

  @ApiProperty({ required: false, type: 'array' })
  @IsOptional()
  @IsArray()
  attractions?: any[];

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  tips?: string[];

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  requiredDocuments?: string[];

  @ApiProperty({ required: false, type: 'array' })
  @IsOptional()
  @IsArray()
  faqs?: any[];

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  relatedTours?: string[];

  // Status
  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiProperty({ required: false, default: 'draft' })
  @IsOptional()
  @IsString()
  status?: string;

  // SEO
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  seoTitle?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  seoDescription?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  seoKeywords?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  seoOgImage?: string;

  // Services
  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  servicesIncluded?: string[];

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  servicesExcluded?: string[];

  // Hotels
  @ApiProperty({ required: false, type: 'array' })
  @IsOptional()
  @IsArray()
  hotels?: any[];

  // Itinerary
  @ApiProperty({ required: false, type: 'array' })
  @IsOptional()
  @IsArray()
  itinerary?: any[];
}

export class UpdateTourDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  destination?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  shortDescription?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fullDescription?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  countryId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cityId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  duration?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  durationDays?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  durationNights?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  price?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  priceDetail?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  coverImage?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  heroImage?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  galleryImages?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  departureInfo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  hotelInfo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  transportation?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  whyChoose?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  bestTime?: string;

  @ApiProperty({ required: false, type: 'array' })
  @IsOptional()
  @IsArray()
  attractions?: any[];

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  tips?: string[];

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  requiredDocuments?: string[];

  @ApiProperty({ required: false, type: 'array' })
  @IsOptional()
  @IsArray()
  faqs?: any[];

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  relatedTours?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  seoTitle?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  seoDescription?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  seoKeywords?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  seoOgImage?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  servicesIncluded?: string[];

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  servicesExcluded?: string[];

  @ApiProperty({ required: false, type: 'array' })
  @IsOptional()
  @IsArray()
  hotels?: any[];

  @ApiProperty({ required: false, type: 'array' })
  @IsOptional()
  @IsArray()
  itinerary?: any[];
}
