import { createSlice } from "@reduxjs/toolkit";
import { replaceUsersReducer } from "../reducers/users.reducers";

export interface IUser {
	_id: string;
	role: "admin" | "user";
	email: string;
	username: string;
	verified: boolean;
	accepted_terms_and_conditions: boolean;
	receive_marketing_emails: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface IUserState {
	records: IUser[];
}

const initialState: IUserState = {
	records: [],
};

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		replaceAllUsers: replaceUsersReducer,
	},
});

export const usersActions = usersSlice.actions;
export default usersSlice;