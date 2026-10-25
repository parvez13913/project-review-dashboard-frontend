import baseApi from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/register",
          method: "POST",
          body: data,
        };
      },
    }),

    login: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
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

export const { useSignupMutation, useLoginMutation } = authApi;

export default authApi;
