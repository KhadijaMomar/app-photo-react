import { createSlice } from '@reduxjs/toolkit';


const localImages = [
  require('../assets/photo1.jpg'),
  require('../assets/photo2.jpg'),
  require('../assets/photo3.jpg'),
  require('../assets/photo4.jpg'),
  require('../assets/photo5.jpg'),
  require('../assets/photo6.jpg'),
  require('../assets/photo7.jpg'),
  require('../assets/photo8.jpg'),
  require('../assets/photo9.jpg'),
  require('../assets/photo10.jpg'),
];

const GallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    allPictures: localImages,
    folders: {
      "Général": [],
      "Vacances": [],
      "Travail": []
    }
  },
  reducers: {
    createFolder: (state, action) => {
      const folderName = action.payload;
      if (!state.folders[folderName]) {
        state.folders[folderName] = [];
      }
    },
    addPictureToFolder: (state, action) => {
      const { folderName, image } = action.payload;
      if (!state.folders[folderName].includes(image)) {
        state.folders[folderName].push(image);
      }
    },
    removePictureFromFolder: (state, action) => {
      const { folderName, image } = action.payload;
      state.folders[folderName] = state.folders[folderName].filter((pic) => {
        const picUri = pic.uri ? pic.uri : pic;
        const imageUri = image.uri ? image.uri : image;

        return picUri !== imageUri;
      });
    },
    addPicture: (state, action) => {
  state.allPictures.push(action.payload); 
},
  },
});

export const { createFolder, addPictureToFolder, removePictureFromFolder, addPicture } = GallerySlice.actions;
export default GallerySlice.reducer;