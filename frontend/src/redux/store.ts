import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// slices
import authReducer from "./slice/authSlice";
import favoritesReducer from "./slice/favoritesSlice";
// api
import { rootApi } from "./rootApi";

const store = configureStore({
    reducer: {
        auth: authReducer,
        favorites: favoritesReducer,
        [rootApi.reducerPath]: rootApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rootApi.middleware),
    devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
