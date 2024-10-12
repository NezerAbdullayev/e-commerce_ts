import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// slices
import userReducer from "./slice/userSlice";

// api
import productsApi from "./services/productsApi";
import { rootApi } from "./rootApi";

const store = configureStore({
    reducer: {
        user: userReducer,
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
