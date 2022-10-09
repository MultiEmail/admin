import { FC } from "react";
import { useRoutes } from "react-router";
import { routes } from "./routes/routes";

const App: FC = () => {
	const routing = useRoutes(routes);
	return <>{routing}</>;
};

export default App;
