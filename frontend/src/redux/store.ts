import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// slices
import userReducer from "./slice/userSlice";

// apis
import authApi from "./services/userApi";
import adminApi from "./services/adminApi";
import productsApi from "./services/productsApi";
import cartApi from "./services/cartApi";
import favoritesApi from "./services/favoritesApi";

const store = configureStore({
    reducer: {
        user: userReducer,
        [authApi.reducerPath]: authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [favoritesApi.reducerPath]: favoritesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(adminApi.middleware)
            .concat(productsApi.middleware)
            .concat(cartApi.middleware)
            .concat(favoritesApi.middleware),

    devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
