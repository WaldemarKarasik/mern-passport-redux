import { configureStore } from '@reduxjs/toolkit';
import  CategoriesSlice from '../features/categoriesSlice';
import  WordsSlice from '../features/wordsSlice';
import userSlice from '../features/userSlice';

export default configureStore({
  reducer: {
    categories: CategoriesSlice,
    words: WordsSlice,
    user: userSlice
  }
});
