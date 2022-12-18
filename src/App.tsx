import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/protected_route/ProtectedRoutes";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import NotFound from "./pages/not_found/Not_Found";
import Users from "./pages/users/Users";
import User from "./pages/users/user/User";

const App: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route>
					<Route path="/" element={<Login />} />
					<Route path="*" element={<NotFound />} />
				</Route>

				<Route element={<ProtectedRoutes />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/users" element={<Users />} />
					<Route path="/users/:id" element={<User />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
