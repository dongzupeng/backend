import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateDraftDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  @IsOptional()
  author: string;

  @IsString()
  @IsOptional()
  coverImage: string;

  @IsBoolean()
  @IsOptional()
  isPublished: boolean;
}
