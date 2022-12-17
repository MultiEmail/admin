import { Dispatch } from "@reduxjs/toolkit";
import API, { IAPIResponseError, IAPIResponseSuccess } from "../utils/api.util";
import { AxiosError } from "axios";
import { IUser, usersActions } from "../slices/user.slice";

/**
 * This action will fetch all the users from api
 *
 * @author aayushchugh
 */
export const getAllUsersHandler = () => {
	return async (dispatch: Dispatch) => {
		try {
			interface APIResponse extends IAPIResponseSuccess {
				records: IUser[];
			}

			const res = await API.get<APIResponse>("/admin/users");

			dispatch(usersActions.replaceAllUsers(res.data.records));

			return Promise.resolve(res.data);
		} catch (err) {
			return Promise.reject(err as AxiosError<IAPIResponseError>);
		}
	};
};
