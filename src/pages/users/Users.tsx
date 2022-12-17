import { FC, useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getAllUsersHandler } from "../../actions/users.action";
import { useAppSelector } from "../../hooks/useAppSelector";
import { TRootState } from "../../store";

const Users: FC = () => {
	const dispatch = useAppDispatch();
	const { records } = useAppSelector((state: TRootState) => state.users);

	useEffect(() => {
		dispatch(getAllUsersHandler());
	}, [dispatch]);

	return (
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
					<>
						<tr key={record._id}>
							<td>{record.username}</td>
							<td>{record.email}</td>
							<td>{record.verified.toString()}</td>
							<td>
								{record.receive_marketing_emails.toString()}
							</td>
						</tr>
					</>
				))}
			</tbody>
		</table>
	);
};

export default Users;
