import store from "@/store";
const { dispatch } = store;

// this function are useful for dispach store (instead of useDispatch)
export const setIsAuth = (payload: boolean) => {
	dispatch({ type: "auth/setIsAuth", payload });
};

export const setUserData = (payload: any) => {
	dispatch({ type: "auth/setUserData", payload });
};
