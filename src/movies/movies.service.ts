import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto copy';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    console.log('this', this);
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find(movie => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`movie with id: ${id} not found~~~~`);
    }
    
    return movie;
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter(movie => movie.id !== id);
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData
    });
  }

  update(id: number, updateData:UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
