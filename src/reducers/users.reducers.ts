import { PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserState } from "../slices/user.slice";

export const replaceUsersReducer = (
	state: IUserState,
	action: PayloadAction<IUser[]>
) => {
	state.records = action.payload;
};
