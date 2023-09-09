import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";

const store = configureStore({
	devTools: true,
	reducer: {
		auth: authSlice.reducer
	}
});


// types of store reducers
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;