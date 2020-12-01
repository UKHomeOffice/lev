import { V1Birth } from '@ho-lev/test-data';
import { Either, Promised } from '../common';
import { V1BirthTerms } from '../resources/v1-birth';

export type ReadFn<T> = (id: number) => Promised<Either<Error, T>>;
export type SearchFn<T,A> = (terms: A) => Promised<Either<Error, T[]>>;

export type LevClient<T> = (options: T) => {
  readV1Birth: ReadFn<V1Birth>
  searchV1Birth: SearchFn<V1Birth, V1BirthTerms>
};

export type {
  V1Birth,
  V1BirthTerms
};
