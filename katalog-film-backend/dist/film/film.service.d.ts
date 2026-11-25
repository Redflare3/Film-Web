import { PrismaService } from '../prisma/prisma.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
export declare class FilmService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateFilmDto): import("@prisma/client").Prisma.Prisma__FilmClient<{
        judul: string;
        sutradara: string;
        tahun: number;
        genre: string;
        rating: number;
        cover: string | null;
        sinopsis: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(genre?: string, cari?: string): import("@prisma/client").Prisma.PrismaPromise<{
        judul: string;
        sutradara: string;
        tahun: number;
        genre: string;
        rating: number;
        cover: string | null;
        sinopsis: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    statistik(): Promise<{
        totalFilm: number;
        rataRating: number | null;
        ratingTertinggi: number | null;
        perGenre: {
            genre: string;
            jumlah: number;
        }[];
    }>;
    findOne(id: number): Promise<{
        judul: string;
        sutradara: string;
        tahun: number;
        genre: string;
        rating: number;
        cover: string | null;
        sinopsis: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    update(id: number, dto: UpdateFilmDto): Promise<{
        judul: string;
        sutradara: string;
        tahun: number;
        genre: string;
        rating: number;
        cover: string | null;
        sinopsis: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        judul: string;
        sutradara: string;
        tahun: number;
        genre: string;
        rating: number;
        cover: string | null;
        sinopsis: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
