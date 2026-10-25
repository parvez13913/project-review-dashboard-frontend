import baseApi from "../../api/baseApi";

const submissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubmission: builder.mutation({
      query: (data) => {
        return {
          url: "/submission/create-submission",
          method: "POST",
          body: data,
        };
        
      },
    }),

    getMySubmission: builder.query({
      query: () => {
        return {
          url: "/submission/my-submission",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useCreateSubmissionMutation, useGetMySubmissionQuery } =
  submissionApi;

export default submissionApi;
