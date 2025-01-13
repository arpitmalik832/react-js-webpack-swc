import { createApi } from '@reduxjs/toolkit/query/react';

import { queries } from '@arpitmalik832/react-js-rollup-library';

const sampleQuery = createApi({
  reducerPath: 'sampleQuery',
  baseQuery: queries.baseQueryFn(),
  tagTypes: ['Jokes'],
  endpoints: builder => ({
    fetchData: builder.query({
      query: axiosInstance => ({
        axiosInstance,
        url: '/jokes',
      }),
      providesTags: [{ type: 'Jokes', id: 'LIST' }],
    }),
    updateData: builder.mutation({
      query: axiosInstance => ({
        axiosInstance,
        url: '/jokes/update',
      }),
      invalidatesTags: [{ type: 'Jokes', id: 'LIST' }],
    }),
  }),
});

export { sampleQuery };
export const { useFetchDataQuery, useUpdateDataMutation } = sampleQuery;
