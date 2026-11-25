"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FilmService = class FilmService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
        return this.prisma.film.create({ data: dto });
    }
    findAll(genre, cari) {
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
            perGenre: perGenre.map((g) => ({
                genre: g.genre,
                jumlah: g._count._all,
            })),
        };
    }
    async findOne(id) {
        const film = await this.prisma.film.findUnique({ where: { id } });
        if (!film) {
            throw new common_1.NotFoundException(`Film dengan id ${id} tidak ditemukan`);
        }
        return film;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.film.update({ where: { id }, data: dto });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.film.delete({ where: { id } });
    }
};
exports.FilmService = FilmService;
exports.FilmService = FilmService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FilmService);
//# sourceMappingURL=film.service.js.map