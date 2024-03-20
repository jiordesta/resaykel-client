import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../axios_instance";

const initialState = {
  user: null,
  loading_user: false,
  loading_login: false,
  loading_logout: false,
  loading_signin: false,
  loading_signout: false,
  loading_signup: false,
};

export const signin = createAsyncThunk("/signin", async (inputs) => {
  try {
    const data = new FormData();
    for (const [key, value] of Object.entries(inputs)) {
      data.append(key, value);
    }
    await AxiosInstance.post("/user/signin", data);
    return;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const signup = createAsyncThunk("/signup", async (inputs) => {
  try {
    const data = new FormData();
    for (const [key, value] of Object.entries(inputs)) {
      data.append(key, value);
    }
    await AxiosInstance.post("/user/signup", data);
    return;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const fetch_user = createAsyncThunk("/fetch_user", async () => {
  try {
    const res = await AxiosInstance.get("/user/fetch_user");
    return res.data.user;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const signout = createAsyncThunk("/signout", async () => {
  try {
    await AxiosInstance.post("/user/signout");
    return;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

const userSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    //signup
    builder.addCase(signup.pending, (state) => {
      state.loading_signup = true;
    });
    builder.addCase(signup.rejected, (state) => {
      state.loading_signup = false;
    });
    builder.addCase(signup.fulfilled, (state) => {
      state.loading_signup = false;
    });
    //signin
    builder.addCase(signin.pending, (state) => {
      state.loading_signin = true;
    });
    builder.addCase(signin.rejected, (state) => {
      state.loading_signin = false;
    });
    builder.addCase(signin.fulfilled, (state) => {
      state.loading_signin = false;
    });
    //signout
    builder.addCase(signout.pending, (state) => {
      state.loading_signout = true;
    });
    builder.addCase(signout.rejected, (state) => {
      state.loading_signout = false;
    });
    builder.addCase(signout.fulfilled, (state) => {
      state.loading_signout = false;
      state.user = null;
    });
    //fetch user
    builder.addCase(fetch_user.pending, (state) => {
      state.loading_user = true;
    });
    builder.addCase(fetch_user.rejected, (state) => {
      state.loading_user = false;
      state.user = null;
    });
    builder.addCase(fetch_user.fulfilled, (state, action) => {
      state.loading_user = false;
      state.user = action.payload;
    });
  },
});

export default userSlice.reducer;
