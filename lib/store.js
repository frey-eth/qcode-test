import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./features/blog/blogSlice";
import uploadReducer from "./features/upload/uploadSlice";

export const store = () => {
  return configureStore({
    reducer: {
      blog: blogReducer,
      upload: uploadReducer,
    },
  });
};
