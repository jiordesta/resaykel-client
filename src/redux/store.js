import { configureStore } from "@reduxjs/toolkit";
import user_slice from "./reducers/user_slice";
import notification_slice from "./reducers/notification_slice";
import products_slice from "./reducers/product_slice";

export const store = configureStore({
  reducer: {
    user: user_slice,
    notif: notification_slice,
    product: products_slice,
  },
});
