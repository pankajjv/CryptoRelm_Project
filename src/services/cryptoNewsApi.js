import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const cryptoNewsHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': 'bb807a7726msh24d60f7e62045b1p11947cjsn2b425e6b0413',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}

const baseUrl= 'https://bing-news-search1.p.rapidapi.com';
const createQuery = (url) => ({url, headers: cryptoNewsHeaders});

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({

      getCryptosNews: builder.query({
        query: ({newsCategory, count}) => createQuery(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
      }),
    }),
  })

export const { useGetCryptosNewsQuery } = cryptoNewsApi