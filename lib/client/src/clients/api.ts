import fetch from 'cross-fetch';
import { stringify } from 'qs';
import { V1Birth } from '@ho-lev/test-data';
import { V1BirthTerms } from '../resources/v1-birth';
import { LevClient, ReadFn, SearchFn } from './common';

export type ApiOptions = {
  host: string
  port: number
};

export const ApiClient: LevClient<ApiOptions> = ({
  host,
  port = 443,
}) => token => {
  const baseUrl = `https://${host}:${port}`;

  const request = async (uri: string): Promise<Error | object> => {
    const res = await fetch(baseUrl + uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const text = await res.text();

    try {
      const body = JSON.parse(text);

      return (
        res.ok
          ? body
          : Promise.reject(new Error(`${res.status} - ${res.statusText}: ${body.message}`))
      );
    } catch (e) {
      return (
        res.ok
          ? Promise.reject(e)
          : Promise.reject(new Error(`${res.status} - ${res.statusText}: ${text}`))
      );
    }
  };

  const readV1Birth: ReadFn<V1Birth> = (id: number) => (
    request(`/v1/registration/birth/${id}`) as Promise<V1Birth>
  );

  const searchV1Birth: SearchFn<V1Birth, V1BirthTerms> = (terms) => (
    request(`/v1/registration/birth?${stringify(terms)}`) as Promise<V1Birth[]>
  );

  return ({
    readV1Birth,
    searchV1Birth
  });
};

export default ApiClient;
