import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  signingUp: false,
  signingIn: false,
  success: false,
  error: null,
  token: localStorage.getItem("token")
};

export const createUser = createAsyncThunk(
  "user/add",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3030/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login,
          password,
        }),
      });
      const data = await res.json();

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error); //Перевод запроса на rejected
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const auth = createAsyncThunk(
  "user/auth",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3030/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login,
          password,
        }),
      });
      const data = await res.json();

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error); //Перевод запроса на rejected
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.userId);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const applicationSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    closeTodo(state, action) {
      state.token = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.signingUp = false;
        state.error = null;
        state.success = true;
      })
      .addCase(createUser.pending, (state, action) => {
        state.signingUp = true;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload; //action.payload - ответ с бэка
        state.signingUp = false;
      })
      .addCase(auth.fulfilled, (state, action) => {
        state.signingIn = false;
        state.error = null;
        state.token = action.payload.token; //action.payload - ответ с бэка
      })
      .addCase(auth.pending, (state, action) => {
        state.signingIn = true;
        state.error = null;
      })
      .addCase(auth.rejected, (state, action) => {
        state.signingIn = false;
        state.error = action.payload;
      });
  },
});

export const { closeTodo } = applicationSlice.actions;
export default applicationSlice.reducer;
