import { FC, useEffect } from "react";
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
			<table className="table-auto">
				<thead>
					<tr>
						<th>username</th>
						<th>email</th>
						<th>verified</th>
						<th>receive marketing emails</th>
					</tr>
				</thead>
				<tbody>
					{records.map((record) => (
						<tr key={record._id}>
							<td>
								<Link to={`/users/${record._id}`}>
									{record.username}
								</Link>
							</td>
							<td>{record.email}</td>
							<td>{record.verified.toString()}</td>
							<td>
								{record.receive_marketing_emails.toString()}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</main>
	);
};

export default Users;
