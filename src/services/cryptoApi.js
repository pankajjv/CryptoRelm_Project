import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiHeaders = {
    'X-RapidAPI-Key': 'bb807a7726msh24d60f7e62045b1p11947cjsn2b425e6b0413',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl= 'https://coinranking1.p.rapidapi.com';
const createQuery = (url) => ({url, headers: apiHeaders})
export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({

      getCryptos: builder.query({
        query: (count) => createQuery(`/coins?limit=${count}`),
      }),
      
      getCryptosDetail: builder.query({
        query: (coinId) => createQuery(`/coin/${coinId}`),
      }),
      getCryptosHistory: builder.query({
        query: ({coinId, timeperiod}) => createQuery(`/coin/${coinId}/history/${timeperiod}`),
      }),
    }),
  })

  export const { useGetCryptosQuery } = cryptoApi  
  export const { useGetCryptosDetailQuery } = cryptoApi

  export const { useGetCryptosHistoryQuery } = cryptoApi








