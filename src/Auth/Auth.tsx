import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthSession } from "./AuthSessionContext";
import { Session } from "@supabase/supabase-js";
import styles from "../utils/utils.module.css";
import { supabase } from "../supabaseClient";

const Auth = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");
	const { session } = useAuthSession();

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			setLoading(true);
			const { error } = await supabase.auth.signInWithOtp({ email });
			if (error) throw error;
			alert("Check your email for the login link!");
		} catch (error) {
			alert(error);
		} finally {
			setLoading(false);
		}
	};

	if (session) {
		return <Navigate to="/" />;
	}

	return (
		<div className={styles.centeredFlex}>
			<div>
				<h1>ZTM Notes App</h1>
				<p>please sign in via magic link sent to your email</p>
				{loading ? (
					"Sending Magic Link ... "
				) : (
					<form onSubmit={handleLogin}>
						<label htmlFor="email">Email: </label>
						<input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" />
						<button>Send magic link</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default Auth;
