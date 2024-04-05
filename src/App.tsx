import { Page } from "./Page/Page";
import { createPage } from "./utils/createPage";
import { AppStateProvider } from "./context/AppStateContext";
import "./App.css";

const initialState = createPage();

const App = () => {
	return (
		<AppStateProvider initialState={initialState}>
			<Page />
		</AppStateProvider>
	);
};

export default App;
