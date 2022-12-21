import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getCurrentUserHandler } from "../../actions/auth.actions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { TRootState } from "../../store";
import Login from "../../pages/login/Login";

/**
 * @author aayushchugh, is-it-ayush
 */
const ProtectedRoutes = () => {
	const dispatch = useAppDispatch();
	const { currentUser } = useAppSelector((state: TRootState) => state.users);

	useEffect(() => {
		dispatch(getCurrentUserHandler());
	}, [dispatch]);

	return currentUser ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
