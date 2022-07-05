import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  todo: [],
  loading: false,
  proccesing: false,
};

export const fetchTodos = createAsyncThunk(
  //Запрос на получение тудушек с сервера
  "todos/fetch",
  async (thunkAPI) => {
    const userId = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:3030/todo/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, //Каждый пользователь должен иметь token
        },
      });
      const data = await res.json(); //ответ, который получаем с бэка
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const removeTodo = createAsyncThunk(
  "todo/remove",
  async (id, thunkAPI) => {
    const token = localStorage.getItem("token");
    //Запрос на удаление
    try {
      await fetch(`http://localhost:3030/todo/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addTodo = createAsyncThunk("todo/add", async (text, thunkAPI) => {
  const token = localStorage.getItem("token");
  try {
    //Запрос на добавление новой тудушки
    const res = await fetch("http://localhost:3030/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
    const token = localStorage.getItem("token");
    try {
      //Запрос на обновление ключа тудушки
      const res = await fetch(`http://localhost:3030/todo/${todo._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
        state.todo = action.payload; //Здесь пишем равно action.payload, т.к сервер кладёт новый объект туда
        state.loading = false; //Убираем Loading и Proccesing, т.к они нужны только при pending
        state.proccesing = false;
      })
      .addCase(fetchTodos.pending, (state, action) => {
        state.loading = true; //Задаём loading true, чтобы отображался знак загрузки
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todo = state.todo.filter((element, index) => {
          return element._id !== action.payload; //Удаляем тудушку
        });
        state.loading = false;
        state.proccesing = false;
      })
      .addCase(removeTodo.pending, (state, action) => {
        state.todo = state.todo.map((element) => {
          if (element._id === action.meta.arg) {
            //Для определенной тудушки ставим preload. Id элемента обязательно приравниваем action.meta.arg
            element.proccesing = true;
          }
          return element;
        });
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todo.push(action.payload); //Добавление тудушки
        state.proccesing = false;
      })
      .addCase(addTodo.pending, (state, action) => {
        state.proccesing = true; //При процессе добавления ставим preloade
      })
      .addCase(changeTodo.fulfilled, (state, action) => {
        state.todo = state.todo.map((element) => {
          if (element._id === action.payload._id) {
            return action.payload;
          }
          return element;
        });
      })
      .addCase(changeTodo.pending, (state, action) => {
        state.todo = state.todo.map((element) => {
          if (element._id === action.meta.arg._id) {
            element.proccesing = true;
          }
          return element;
        });
      });
  },
});

export default todoSlice.reducer;
