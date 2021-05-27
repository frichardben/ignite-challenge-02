import { createContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { GenreResponseProps, MovieProps, MoviesContextData, MoviesProviderPros } from '../types';


export const MoviesContext = createContext<MoviesContextData>(
    {} as MoviesContextData
    );

export function MoviesProvider({ children }: MoviesProviderPros) {
    const [selectedGenreId, setSelectedGenreId] = useState(1);

    const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  
    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

    useEffect(() => {
        api.get<GenreResponseProps[]>('genres').then(response => {
          setGenres(response.data);
        });
      }, []);
    
      useEffect(() => {
        api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
          setMovies(response.data);
        });
    
        api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
          setSelectedGenre(response.data);
        })
      }, [selectedGenreId]);

      function handleClickButton(id: number) {
        setSelectedGenreId(id);
      }
      return (
        <MoviesContext.Provider value={{
            genres,
            movies,
            selectedGenre,
            selectedGenreId,
            handleClickButton,
          }}>
            {children}
          </MoviesContext.Provider>
      )
}