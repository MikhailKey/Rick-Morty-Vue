import { Character } from "@/services/ApiService/Interfaces/Character";

export interface CharacterResponse {
  info: {
    count: number;
    next: string;
    pages: number;
    prev: number | null;
  };
  results: Character[] | [];
}
