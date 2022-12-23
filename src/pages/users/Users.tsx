import React, { FC, useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getAllUsersHandler } from "../../actions/users.action";
import { useAppSelector } from "../../hooks/useAppSelector";
import { TRootState } from "../../store";
import { Link } from "react-router-dom";

/**
 * @author aayushchugh
 */
const Users: FC = () => {
	const dispatch = useAppDispatch();
	const { records } = useAppSelector((state: TRootState) => state.users);

	useEffect(() => {
		dispatch(getAllUsersHandler());
	}, [dispatch]);

	return (
		<main>
			<table className="table-auto w-screen text-sm text-left text-gray-500 dark:text-gray-400 my-3">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="py-3 px-6">username</th>
						<th scope="col" className="py-3 px-6">email</th>
						<th scope="col" className="py-3 px-6">verified</th>
						<th scope="col" className="py-3 px-6">receive marketing emails</th>
					</tr>
				</thead>
				<tbody>
					{records.map((record) => (
						<tr key={record._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
							<td className="py-4 px-6">
								<Link to={`/users/${record._id}`}>
									{record.username}
								</Link>
							</td>
							<td className="py-4 px-6">{record.email}</td>
							<td className="py-4 px-6">{record.verified.toString()}</td>
							<td className="py-4 px-6">
								{record.receive_marketing_emails.toString()}
							</td>
						</tr>
						
					) )}
				</tbody>
			</table>
		</main>
	);
			
};

export default Users;
