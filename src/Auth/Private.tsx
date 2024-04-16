import { ReactElement } from "react";
import { useAuthSession } from "./AuthSessionContext";
import { Navigate } from "react-router-dom";

type PrivateProps = {
	component: ReactElement;
};

const Private = ({ component }: PrivateProps) => {
	const { session, loading } = useAuthSession();

	if (loading) {
		<>Authenticating ...</>;
	}
	return session ? component : <Navigate to="/auth" />;
};

export default Private;
