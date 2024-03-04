import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { signInSuccess } from "../redux/user/userSlice";

export default function OAuth() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleGoogleClick = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const auth = getAuth(app);

			const result = await signInWithPopup(auth, provider);
			const res = await fetch("/api/auth/google", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: result.user.displayName,
					email: result.user.email,
					photo: result.user.photoURL,
				}),
			});
			const data = await res.json();
			console.log(data);
			dispatch(signInSuccess(data));
			navigate("/");
		} catch (error) {
			console.log("could not login with google", error);
		}
	};
	return (
		<button
			type="button"
			onClick={handleGoogleClick}
			className="bg-red-700 text-white w-full py-2 px-4 text-sm font-bold uppercase rounded-lg hover:bg-black hover:text-white"
		>
			Continue with google
		</button>
	);
}
