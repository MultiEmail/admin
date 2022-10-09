import Login from "../pages/login/Login";

export const routes = [
	{ path: "/", element: <div>Welcome to MultiEmail Admin</div> },
	{ path: "/login", element: <Login /> },
	{ path: "*", element: <div>404. page not found</div> },
];
