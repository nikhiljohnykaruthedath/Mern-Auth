import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
	const [formData, setFormData] = useState({});
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			setError(false);
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			console.log(data);
			setLoading(false);
			if (data.success === false) {
				setError(true);
				return;
			}
			navigate("/sign-in");
		} catch (error) {
			setLoading(false);
			setError(true);
		}
	};
	return (
		<div className="mt-20 bg-white flex flex-col justify-center items-center max-w-md my-0 mx-auto border-solid p-3 rounded-xl">
			<div className="my-4 text-3xl font-bold">Sign Up</div>
			<div className="text-center">
				Hey, Enter your details to register <br />
				an account
			</div>
			<form
				onSubmit={handleSubmit}
				className="w-full py-4 px-8 flex gap-2 flex-col justify-center items-center"
			>
				<input
					type="text"
					placeholder="Username"
					id="username"
					className="w-full outline-none border border-gray-200 p-2 rounded-lg"
					onChange={handleChange}
				/>
				<input
					type="email"
					placeholder="Email"
					id="email"
					className="w-full outline-none border border-gray-200 p-2 rounded-lg"
					onChange={handleChange}
				/>
				<input
					type="password"
					placeholder="Password"
					id="password"
					className="w-full outline-none border border-gray-200 p-2 rounded-lg"
					onChange={handleChange}
				/>
				<button
					disabled={loading}
					className="bg-[#fec887] w-full p-2 text-sm font-bold rounded-lg hover:bg-black hover:text-white"
				>
					{loading ? "Loading..." : "Sign Up"}
				</button>
				<OAuth />
			</form>
			<div className="flex gap-2 mt-5">
				<p>Have an account?</p>
				<Link to="/sign-in">
					<span className="text-blue-500">Sign in</span>
				</Link>
			</div>
			<p className="text-red-700 mt-5">
				{error ? error.message || "Something went wrong!" : ""}
			</p>
		</div>
	);
}
