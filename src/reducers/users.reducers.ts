import { PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserState } from "../slices/user.slice";

/**
 * This reducer will replace all users in store
 *
 * @author aayushchugh
 */
export const replaceUsersReducer = (
	state: IUserState,
	action: PayloadAction<IUser[]>
) => {
	state.records = action.payload;
};

/**
 * This reducer will replace current user in store
 *
 * @author aayushchugh
 */
export const replaceCurrentUserReducer = (
	state: IUserState,
	action: PayloadAction<IUser>
) => {
	state.currentUser = action.payload;
};
