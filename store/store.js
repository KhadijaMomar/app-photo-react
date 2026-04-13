import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "../components/GallerySlice";

export const store = configureStore({
  reducer: {
    gallery: galleryReducer, 
  },
});