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
			<table className="table-auto w-screen shadow-lg bg-white border-collapse border-2 my-3">
				 <thead className="text-xs text-gray-700 uppercase bg-white-50 white:bg-gray-700 dark:text-dark-400 border-2" >
					<tr>
						<th scope="col" className="bg-blue-100 border-2 text-left px-8 py-4">username</th>
						<th scope="col" className="bg-blue-100 border-2 text-left px-8 py-4">email</th>
						<th scope="col" className="bg-blue-100 border-2 text-left px-8 py-4">verified</th>
						<th scope="col" className="bg-blue-100 border-2 text-left px-8 py-4">receive marketing emails</th>
					</tr>
				</thead>
				<tbody>
					{records.map((record) => (
						<tr key={record._id} className="bg-white border-b white:bg-gray-800 dark:border-gray-700 border-2">
							<td className="border-2 px-8 py-4">
								<Link to={`/users/${record._id}`}>
									{record.username}
								</Link>
							</td>
							<td className="border-2 px-8 py-4">{record.email}</td>
							<td className="border-2 px-8 py-4">{record.verified.toString()}</td>
							<td className="border-2 px-8 py-4">
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
