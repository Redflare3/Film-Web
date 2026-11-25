import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';

@Injectable()
export class FilmService {
    constructor(private readonly prisma: PrismaService) { }

    create(dto: CreateFilmDto) {
        return this.prisma.film.create({ data: dto });
    }

    findAll(genre?: string, cari?: string) {
        return this.prisma.film.findMany({
            where: {
                genre: genre ? { equals: genre, mode: 'insensitive' } : undefined,
                OR: cari
                    ? [
                        { judul: { contains: cari, mode: 'insensitive' } },
                        { sutradara: { contains: cari, mode: 'insensitive' } },
                    ]
                    : undefined,
            },
            orderBy: { rating: 'desc' },
        });
    }

    async statistik() {
        const [total, agregat, perGenre] = await Promise.all([
            this.prisma.film.count(),
            this.prisma.film.aggregate({ _avg: { rating: true }, _max: { rating: true } }),
            this.prisma.film.groupBy({
                by: ['genre'],
                _count: { _all: true },
                orderBy: { _count: { genre: 'desc' } },
            }),
        ]);

        return {
            totalFilm: total,
            rataRating: agregat._avg.rating,
            ratingTertinggi: agregat._max.rating,
            perGenre: perGenre.map((g: { genre: string; _count: { _all: number } }) => ({
                genre: g.genre,
                jumlah: g._count._all,
            })),
        };
    }

    async findOne(id: number) {
        const film = await this.prisma.film.findUnique({ where: { id } });
        if (!film) {
            throw new NotFoundException(`Film dengan id ${id} tidak ditemukan`);
        }
        return film;
    }

    async update(id: number, dto: UpdateFilmDto) {
        await this.findOne(id);
        return this.prisma.film.update({ where: { id }, data: dto });
    }

    async remove(id: number) {
        await this.findOne(id);
        return this.prisma.film.delete({ where: { id } });
    }
}