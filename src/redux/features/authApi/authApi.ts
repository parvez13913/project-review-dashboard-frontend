const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => {
        return {
          url: "/auth/register",
          method: "POST",
          body: userData,
        };
      },
    }),
    

    me: builder.query({
      query: () => {
        return {
          url: "/auth/me",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  use
} = authApi;

export default authApi;