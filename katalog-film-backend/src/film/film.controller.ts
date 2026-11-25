import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { FilmService } from './film.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';


@Controller('film')
export class FilmController {
    constructor(private readonly filmService: FilmService) { }

    @Post()
    create(@Body() dto: CreateFilmDto) {
        return this.filmService.create(dto);
    }

    @Get()
    findAll(@Query('genre') genre?: string, @Query('cari') cari?: string) {
        return this.filmService.findAll(genre, cari);
    }

    @Get('statistik')
    statistik() {
        return this.filmService.statistik();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.filmService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFilmDto) {
        return this.filmService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.filmService.remove(id);
    }
}