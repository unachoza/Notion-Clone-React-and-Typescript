import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthSessionProvider } from "./Auth/AuthSessionContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthSessionProvider>
				<App />
			</AuthSessionProvider>
		</BrowserRouter>
	</React.StrictMode>
);
