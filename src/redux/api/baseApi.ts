import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "same-origin",
  prepareHeaders: (headers) => {
    if (typeof window !== "undefined") {
      const token = localStorage?.getItem("access_token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAutoTokenUpdate = async (
  args: Parameters<typeof rawBaseQuery>[0],
  api: Parameters<typeof rawBaseQuery>[1],
  extraOptions: Parameters<typeof rawBaseQuery>[2],
) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  return result;
};

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithAutoTokenUpdate,
  tagTypes: ["User"],
  endpoints: () => ({}),
});

export default baseApi;
