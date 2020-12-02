import { V1Birth, v1Births } from '@ho-lev/test-data';
import { V1BirthTerms } from '../resources/v1-birth';
import { LevClient, ReadFn, SearchFn } from './common';

const fmap = <T extends object>(r: T, f: (any) => any): object => {
  const reducer = (acc, [k, v]) => ({
    ...acc,
    [k]: f(v)
  });

  return Object.entries(r)
    .reduce(reducer, {})
};

const cleanUpData = <T extends object>(d: T) => (
  d === null
    ? undefined
    : (
      d instanceof Object
        ? fmap(d, cleanUpData)
        : d
    )
);

const extractData = <T extends object>(r: T): T => fmap(r, cleanUpData) as T;

export type MockOptions = void | {};

export const MockClient: LevClient<MockOptions> = () => _ => {
  const readV1Birth: ReadFn<V1Birth> = (id: number) => (
    v1Births
      .filter(e => e.id === id)
      .map(extractData)[0]
  );

  const searchV1Birth: SearchFn<V1Birth, V1BirthTerms> = (terms) => (
    v1Births
      .filter(e => (
        e.child.dateOfBirth === terms.dateOfBirth
          && e.child.forenames.match(new RegExp(`^${terms.forenames}`, 'i'))
          && e.child.surname.toLowerCase() === terms.surname.toLowerCase()
      ) )
      .map(extractData)
  );

  return ({
    readV1Birth,
    searchV1Birth
  });
};

export default MockClient;
