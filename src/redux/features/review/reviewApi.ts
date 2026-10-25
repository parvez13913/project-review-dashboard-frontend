import baseApi from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    reviewSubmission: builder.mutation({
      query: ({ id, status, reviewNote }) => {
        return {
          url: `review/${id}/review`,
          method: "PATCH",
          body: {
            status,
            reviewNote,
          },
        };
      },
      invalidatesTags: ["Submissions"],
    }),

    getAllSubmission: builder.query({
      query: () => {
        return {
          url: "/review/all-submissions",
          method: "GET",
        };
      },
    }),
    getStats: builder.query({
      query: () => {
        return {
          url: "/review/stats",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useReviewSubmissionMutation,
  useGetAllSubmissionQuery,
  useGetStatsQuery,
} = reviewApi;

export default reviewApi;
