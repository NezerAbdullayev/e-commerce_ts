import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserState {
    role: string;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    role: "",
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ role: string }>) => {
            console.log("claisfi");
            state.isAuthenticated = true;
            state.role = action.payload.role;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.role = "";
        },
    },
});

export const userRole = (state: RootState) => state.user.role;

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
