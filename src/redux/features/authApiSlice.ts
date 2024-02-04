import { apiSlice } from "../services/apiSlice";

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

interface Todo {
  id: string;
  label: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface Expense {
  id: string;
  label: string;
  price: string;
  created_at: string;
  updated_at: string;
}

interface ShortUrl {
  id: string;
  original_url: string;
  short_url: string;
  created_at: string;
}

interface OriginalUrl {
  original_url: string;
}

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveUser: builder.query<User, void>({
      query: () => "/users/me/",
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/jwt/create/",
        method: "POST",
        body: { email, password },
      }),
    }),
    register: builder.mutation({
      query: ({ first_name, last_name, email, password, re_password }) => ({
        url: "/users/",
        method: "POST",
        body: { first_name, last_name, email, password, re_password },
      }),
    }),
    verify: builder.mutation({
      query: () => ({
        url: "/jwt/verify/",
        method: "POST",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout/",
        method: "POST",
        credentials: "include",
      }),
    }),
    activation: builder.mutation({
      query: ({ uid, token }) => ({
        url: "/users/activation/",
        method: "POST",
        body: { uid, token },
      }),
    }),
    resetPassword: builder.mutation({
      query: (email) => ({
        url: "/users/reset_password/",
        method: "POST",
        body: { email },
      }),
    }),
    resetPasswordConfirm: builder.mutation({
      query: ({ uid, token, new_password, re_new_password }) => ({
        url: "/users/reset_password_confirm/",
        method: "POST",
        body: { uid, token, new_password, re_new_password },
      }),
    }),
    createTodo: builder.mutation({
      query: ({ label, description }) => ({
        url: "/tasks/",
        method: "POST",
        body: { label, description },
      }),
      invalidatesTags: ["Task"],
    }),
    retrieveTodos: builder.query<Todo[], void>({
      query: () => "/tasks/",
      providesTags: ["Task"],
    }),
    deleteTodos: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
    createExpense: builder.mutation({
      query: ({ label, price }) => ({
        url: "/expenses/",
        method: "POST",
        body: { label, price },
      }),
      invalidatesTags: ["Expense"],
    }),
    retrieveExpenses: builder.query<Expense[], void>({
      query: () => "/expenses/",
      providesTags: ["Expense"],
    }),
    deleteExpenses: builder.mutation({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expense"],
    }),
    createShortUrl: builder.mutation({
      query: ({ original_url }) => ({
        url: "/shorturls/",
        method: "POST",
        body: { original_url },
      }),
      invalidatesTags: ["ShortUrl"],
    }),
    retrieveShortUrl: builder.query<ShortUrl[], void>({
      query: () => "/shorturls/",
      providesTags: ["ShortUrl"],
    }),
    deleteShortUrl: builder.mutation({
      query: (id) => ({
        url: `/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["ShortUrl"],
    }),
    retrieveOriginalUrl: builder.query<OriginalUrl, string>({
      query: (id) => ({
        url: `/${id}/`,
      }),
    }),
  }),
});

export const {
  useRetrieveUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useLogoutMutation,
  useActivationMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
  useCreateTodoMutation,
  useRetrieveTodosQuery,
  useDeleteTodosMutation,
  useCreateExpenseMutation,
  useRetrieveExpensesQuery,
  useDeleteExpensesMutation,
  useCreateShortUrlMutation,
  useRetrieveShortUrlQuery,
  useDeleteShortUrlMutation,
  useRetrieveOriginalUrlQuery,
} = authApiSlice;
