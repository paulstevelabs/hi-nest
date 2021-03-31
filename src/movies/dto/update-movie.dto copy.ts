import { PartialType } from "@nestjs/mapped-types"; // npm i @nestjs/mapped-types
import { CreateMovieDto } from "./create-movie.dto";

export class UpdateMovieDto extends PartialType(CreateMovieDto) {} // CreateMovieDto를 상속받고 부분적으로 이용