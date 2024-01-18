import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogService from "./blogService";

export const getAllBlog = createAsyncThunk(
  "blog/get-all-blog",
  async (thunkAPi) => {
    try {
      return await blogService.getAllBlog();
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const createBlog = createAsyncThunk(
  "Blog/create",
  async (blog, thunkAPi) => {
    try {
      return await blogService.createBlog(blog);
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const submitComment = createAsyncThunk(
  "blog/submit-comment",
  async ({ id, name, comment }, thunkAPI) => {
    try {
      const response = await blogService.submitComment(id, name, comment);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  blogs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.blogs = action.payload;
      })
      .addCase(getAllBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdBlog = action.payload;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      //update Blog
      .addCase(submitComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedBlog = action.payload;
        state.blogs = state.blogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog
        );
      })
      .addCase(submitComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default blogSlice.reducer;
