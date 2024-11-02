import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../store";

export interface FavoriteItem {
    id: string;
    name: string;
    image: string;
    price: number;
}
interface FavoritesState {
    favorites: FavoriteItem[];
}

const initialState: FavoritesState = {
    favorites: [],
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        setFavorites: (state, action) => {
            state.favorites = action.payload;
        },
        addFavorites: (state, action) => {
            state.favorites.unshift(action.payload);
        },

        removeFavorites: (state, action) => {
            state.favorites = state.favorites.filter((fav) => fav.id !== action.payload);
        },
        resetFavorites: (state) => {
            state.favorites = [];
        },
    },
});

export const { setFavorites, addFavorites, removeFavorites, resetFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
