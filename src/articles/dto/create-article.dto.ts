import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  author: string;

  @IsString()
  @IsOptional()
  coverImage: string;

  @IsBoolean()
  @IsOptional()
  isPublished: boolean;
}