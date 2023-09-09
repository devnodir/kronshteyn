import { createSlice } from "@reduxjs/toolkit";

// interface of reducer
type State = {
	isAuth: boolean;
	userData: any
};

// initial values of reducer
const initialState: State = {
	isAuth: false,
	userData: null
};

const AuthSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		setIsAuth: (state: State, { payload }) => {
			state.isAuth = payload;
		},
		setUserData: (state: State, { payload }) => {
			state.userData = payload;
		},
	},
});

export default AuthSlice;
