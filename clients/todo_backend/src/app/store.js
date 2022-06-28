import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todoSlice"


export const store = configureStore({
    reducer: todosReducer
})