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

/**
 * This action will fetch a single user from API
 *
 * @param id id of the user to be fetched
 * @returns response from API
 */
export const getSingleUserHandler = (id: string) => {
	return async () => {
		try {
			interface APIResponse extends IAPIResponseSuccess {
				user: IUser;
			}

			const res = await API.get<APIResponse>(`/admin/users/${id}`);

			return Promise.resolve(res);
		} catch (err) {
			return Promise.reject(err as AxiosError<IAPIResponseError>);
		}
	};
};

/**
 * This action will mark a user as verified
 *
 * @author aayushchugh
 */
export const markUserAsVerifiedHandler = (id: string) => {
	return async () => {
		try {
			const res = await API.patch<IAPIResponseSuccess>(
				`/admin/users/${id}/mark-verified`
			);

			return Promise.resolve(res);
		} catch (err) {
			return Promise.reject(err as AxiosError<IAPIResponseError>);
		}
	};
};

/**
 * This action will mark a user as admin
 *
 * @param id id of the user which will be marked as admin
 *
 * @author aayushchugh
 */
export const markUserAsAdminHandler = (id: string) => {
	return async () => {
		try {
			const res = await API.patch<IAPIResponseSuccess>(
				`/admin/users/${id}/mark-admin`
			);

			return Promise.resolve(res);
		} catch (err) {
			return Promise.reject(err as AxiosError<IAPIResponseError>);
		}
	};
};

/**
 * This action will delete a user
 *
 * @author aayushchugh
 */
export const deleteUserHandler = (id: string) => {
	return async () => {
		try {
			const res = await API.delete<IAPIResponseSuccess>(
				`/admin/users/${id}`
			);

			return Promise.resolve(res);
		} catch (err) {
			return Promise.reject(err as AxiosError<IAPIResponseError>);
		}
	};
};
