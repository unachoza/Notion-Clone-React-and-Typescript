import { Page } from "./Page/Page";
import { createPage } from "./utils/createPage";
import { AppStateProvider } from "./context/AppStateContext";
import { Route, Routes } from "react-router-dom";
import Auth from "./Auth/Auth";
import Private from "./Auth/Private";
import "./App.css";

const initialState = createPage();

const App = () => {
	return (
		<Routes>
			<Route path="/auth" element={<Auth />} />
			<Route
				path="/:id"
				element={
					<Private
						component={
							<AppStateProvider initialState={initialState}>
								<Page />
							</AppStateProvider>
						}
					/>
				}
			/>
			<Route
				path="/"
				element={
					<Private
						component={
							<AppStateProvider initialState={initialState}>
								<Page />
							</AppStateProvider>
						}
					/>
				}
			/>
		</Routes>
	);
};

export default App;
