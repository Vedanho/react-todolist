import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todoSlice";
import applicationReducer from "../features/applicationSlice"

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    auth: applicationReducer
  }
});


//Создали два Редюсера. Middleware прописывать не нужно, встроенная фукнция.
