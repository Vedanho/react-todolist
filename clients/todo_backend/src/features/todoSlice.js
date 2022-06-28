import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  loading: false,
  proccesing: false,
};

export const fetchTodos = createAsyncThunk( //Запрос на получение тудушек с сервера
  "todos/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:1000/toDo"); //Отправляем запрос на адрес нашего бэка, откуда берём тудушки
      const data = await res.json(); //ответ, который получаем с бэка 
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const removeTodo = createAsyncThunk(
  "todo/remove",
  async (id, thunkAPI) => { //Запрос на удаление
    try {
      const res = await fetch(`http://localhost:1000/toDo/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addTodo = createAsyncThunk("todo/add", async (text, thunkAPI) => { 
  try {   //Запрос на добавление новой тудушки
    const res = await fetch("http://localhost:1000/toDo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
      }),
    });
    return res.json(); 
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const changeTodo = createAsyncThunk(
  "todo/change",
  async (todo, thunkAPI) => { 
    try {                //Запрос на обновление ключа тудушки
      const res = await fetch(`http://localhost:1000/toDo/${todo._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      });

      return res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => { 
        state.todos = action.payload; //Здесь пишем равно action.payload, т.к сервер кладёт новый объект туда
        state.loading = false; //Убираем Loading и Proccesing, т.к они нужны только при pending  
        state.proccesing = false;
      })
      .addCase(fetchTodos.pending, (state, action) => {
        state.loading = true; //Задаём loading true, чтобы отображался знак загрузки
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((element, index) => {
          return element._id !== action.payload; //Удаляем тудушку
        });
        state.loading = false;
        state.proccesing = false;
      })
      .addCase(removeTodo.pending, (state, action) => { 
        state.todos = state.todos.map((element) => {
          if (element._id === action.meta.arg) { //Для определенноq тудушки ставим preload. Id элемента обязательно приравниваем action.meta.arg
            element.proccesing = true;
          }
          return element;
        });
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload); //Добавление тудушки
        state.proccesing = false;
      })
      .addCase(addTodo.pending, (state, action) => {
        state.proccesing = true;      //При процессе добавления ставим preloade
      })
      .addCase(changeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((element) => {
          if (element._id === action.payload._id) { 
            return action.payload;
          }
          return element;
        });
      })
      .addCase(changeTodo.pending, (state, action) => {
        state.todos = state.todos.map((element) => {
          if (element._id === action.meta.arg._id) {
            element.proccesing = true;
            console.log(123);
          }
          return element;
        });
      });
  },
});

export default todoSlice.reducer;
