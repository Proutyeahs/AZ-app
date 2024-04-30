import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Tile } from './afternoonZoologistSlice';

export const afternoonZoologistApi = createApi({
  reducerPath: 'afternoonZoologistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    prepareHeaders(headers) {
        headers.set('az-api-web-1', '*')
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getTiles: builder.query<Tile[], void>({
      query: () => ({
        url: `/`,
        method: 'GET',
      })
    }),
  }),
});

export const { useGetTilesQuery } = afternoonZoologistApi;