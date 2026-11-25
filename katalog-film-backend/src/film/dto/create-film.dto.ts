import {
  IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min,
} from 'class-validator';

export class CreateFilmDto {
  @IsString() @IsNotEmpty()
  judul: string;

  @IsString() @IsOptional()
  sutradara?: string;

  @IsInt() @Min(1888) @Max(2100)
  tahun: number;

  @IsString() @IsNotEmpty()
  genre: string;

  @IsNumber() @Min(0) @Max(10)
  rating: number;

  @IsString() @IsOptional()
  cover?: string;

  @IsString() @IsOptional()
  sinopsis?: string;
}