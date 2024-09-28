import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// slices
import userReducer from "./slice/userSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        // [coctailApi.reducerPath]: coctailApi.reducer,
    },
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(productApi.middleware).concat(coctailApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
