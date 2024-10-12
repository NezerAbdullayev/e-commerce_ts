import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// slices
import authReducer from "./slice/authSlice";
// api
import productsApi from "./services/productsApi";
import { rootApi } from "./rootApi";

const store = configureStore({
    reducer: {
        auth: authReducer,
        [rootApi.reducerPath]: rootApi.reducer,

        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rootApi.middleware).concat(productsApi.middleware),
    devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
