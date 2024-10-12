import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getInitialState } from "../../utils/getInitialState";

export interface UserState {
    name: string;
    role: string;
    isAuthenticated: boolean;
}

const userSlice = createSlice({
    name: "user",
    initialState: getInitialState(),
    reducers: {
        setUser: (state, action: PayloadAction<{ role: string; name: string }>) => {
            state.isAuthenticated = true;
            state.role = action.payload.role;
            state.name = action.payload.name;

            const date = new Date().getTime() + 24 * 60 * 60 * 1000;
            localStorage.setItem("auth", JSON.stringify({ role: action.payload.role, isAuthenticated: true, time: date }));
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.role = "";

            localStorage.clear();
        },
    },
});

export const userName = (state: RootState) => state.user.name;
console.log(userName);

export const userRole = (state: RootState) => state.user.role;
export const isAuthenticated = (state: RootState) => state.user.isAuthenticated;

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
