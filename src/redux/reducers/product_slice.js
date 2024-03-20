import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../axios_instance";

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400;
  }
}

const initialState = {
  products: [],
  categories: [],
  count: null,
  loading_products: false,
  error_products: false,
};

export const create_product = createAsyncThunk(
  "/create_product",
  async (inputs) => {
    try {
      const data = new FormData();
      for (const [key, value] of Object.entries(inputs)) {
        data.append(key, value);
      }
      const res = await AxiosInstance.post("/product/create_product", data);
      return res.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const fetch_products = createAsyncThunk(
  "/fetch_products",
  async ({ name, category }) => {
    try {
      const res = await AxiosInstance.get(
        `/product/fetch_products/${category}/${name}`
      );
      return res.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const fetch_my_products = createAsyncThunk(
  "/fetch_my_products",
  async () => {
    try {
      const res = await AxiosInstance.get("/product/fetch_my_products");
      return res.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const delete_product = createAsyncThunk(
  "/delete_product",
  async (id) => {
    try {
      const res = await AxiosInstance.delete(`/product/delete_product/${id}`);
      res.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const update_product = createAsyncThunk(
  "/update_product",
  async (inputs) => {
    if (!inputs.name && !inputs.desc) {
      throw new Error("Input fields should not be empty");
    }
    try {
      const data = new FormData();

      if (inputs.name && inputs.desc) {
        for (const [key, value] of Object.entries(inputs)) {
          data.append(key, value);
        }
        const res = await AxiosInstance.patch(
          `/product/update_product/${inputs._id}`,
          data
        );
        return res.data.product;
      } else if (inputs.name) {
        data.append("name", inputs.name);
        const res = await AxiosInstance.patch(
          `/product/update_product/name/${inputs._id}`,
          data
        );
        return res.data.product;
      } else if (inputs.desc) {
        data.append("desc", inputs.desc);
        const res = await AxiosInstance.patch(
          `/product/update_product/description/${inputs._id}`,
          data
        );
        return res.data.product;
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetch_products.pending, (state) => {
      state.loading_products = true;
    });
    builder.addCase(fetch_products.rejected, (state) => {
      state.loading_products = false;
      state.error_products = true;
    });
    builder.addCase(fetch_products.fulfilled, (state, action) => {
      state.loading_products = false;
      state.products = action.payload.products;
      state.categories = action.payload.categories?.value || [];
      state.count = action.payload.count?.value || null;
    });

    builder.addCase(fetch_my_products.pending, (state) => {
      state.products = [];
      state.loading_products = true;
    });
    builder.addCase(fetch_my_products.rejected, (state) => {
      state.loading_products = false;
      state.error_products = true;
    });
    builder.addCase(fetch_my_products.fulfilled, (state, action) => {
      state.loading_products = false;
      state.products = action.payload.products;
      state.categories = action.payload.categories?.value || [];
      state.count = action.payload.count?.value || null;
    });
  },
});

export default productSlice.reducer;
