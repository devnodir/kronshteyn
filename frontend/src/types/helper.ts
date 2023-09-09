import React from "react";

export type IChildren = JSX.Element | JSX.Element[] | string;
export type IReactNode = JSX.Element | React.ReactNode | string;
export type MethodProps = "post" | "get" | "put" | "patch" | "delete";
export type ISetState<S> = React.Dispatch<React.SetStateAction<S>>;
export type IVoid = () => void;