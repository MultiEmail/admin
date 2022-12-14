/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import {
	deleteUserHandler,
	getSingleUserHandler,
	markUserAsAdminHandler,
	markUserAsVerifiedHandler,
} from "../../../actions/users.action";
import { IUser } from "../../../slices/user.slice";
import Button from "../../../components/button/Button";
import ToolTip from "../../../components/tooltip/Tooltip";
import { AnimatePresence } from "framer-motion";

/**
 * @author aayushchugh
 */
const User: FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [currentUser, setCurrentUser] = useState<IUser>();
	const [canShowTooltip, setCanShowTooltip] = useState<boolean>(false);
	const [tooltipMessage, setTooltipMessage] = useState<string>("");
	const [tooltipType, setTooltipType] = useState<"error" | "success">(
		"success"
	);

	useEffect(() => {
		if (!id) {
			return navigate("/users");
		}

		fetchCurrentUser();
	}, [dispatch, id, navigate]);

	const fetchCurrentUser = async () => {
		try {
			const res = await dispatch(getSingleUserHandler(id as string));

			setCurrentUser(res.data.user);
		} catch (err) {
			navigate("/users");
		}
	};

	const onMarkVerified = async () => {
		try {
			await dispatch(
				markUserAsVerifiedHandler(currentUser?._id as string)
			);
			setTooltipMessage("User marked as verified");
			setTooltipType("success");
			setCanShowTooltip(true);
		} finally {
			fetchCurrentUser();
		}
	};

	const onMarkAsAdmin = async () => {
		try {
			await dispatch(markUserAsAdminHandler(currentUser?._id as string));
			setTooltipMessage("User marked as admin");
			setTooltipType("success");
			setCanShowTooltip(true);
		} finally {
			fetchCurrentUser();
		}
	};

	const onDeleteUser = async () => {
		try {
			await dispatch(deleteUserHandler(currentUser?._id as string));
			setTooltipMessage("User deleted");
			setTooltipType("success");
			setCanShowTooltip(true);
		} finally {
			navigate("/users");
		}
	};

	return (
		<main>
			{currentUser && (
				<div>
					<h1>{currentUser.username}</h1>
					<h1>{currentUser.email}</h1>
					<h1>{currentUser.verified.toString()}</h1>
					<h1>{currentUser.role}</h1>

					<Button onClick={onMarkVerified}>Mark verified</Button>
					<Button onClick={onMarkAsAdmin}>Mark as Admin</Button>
					<Button onClick={onDeleteUser}>Delete User</Button>

					<AnimatePresence>
						{canShowTooltip ? (
							<ToolTip
								type={tooltipType}
								message={tooltipMessage}
							/>
						) : null}
					</AnimatePresence>
				</div>
			)}
		</main>
	);
};

export default User;
