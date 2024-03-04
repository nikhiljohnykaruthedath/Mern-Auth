import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import {
	signInFailure,
	signInStart,
	signInSuccess,
} from "../redux/user/userSlice";

export default function SignIn() {
	const [formData, setFormData] = useState({});
	const { loading, error } = useSelector((state) => state.user);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			dispatch(signInStart());
			const res = await fetch("/api/auth/signin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			if (data.success === false) {
				dispatch(signInFailure(data));
				return;
			}
			dispatch(signInSuccess(data));
			navigate("/");
		} catch (error) {
			dispatch(signInFailure(error));
		}
	};
	return (
		<>
			<div className="mt-20 bg-white flex flex-col justify-center items-center max-w-md my-0 mx-auto border-solid p-3 rounded-xl">
				<div className="my-4 text-3xl font-bold">Sign In</div>
				<div className="text-center">
					Hey, Enter your details to sign in <br />
					to your account
				</div>
				<form
					className="w-full py-4 px-8 flex gap-2 flex-col justify-center items-center"
					onSubmit={handleSubmit}
				>
					<input
						type="email"
						placeholder="Enter Email"
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
						className="bg-[#fec887] w-full p-2 text-sm font-bold rounded-lg hover:bg-black hover:text-white"
						disabled={loading}
					>
						{loading ? "Loading..." : "Sign In"}
					</button>
					<div className="py-4">--- Or Sign in with ---</div>
					<OAuth />
				</form>
				<div className="flex gap-2 mt-5">
					<p>Dont Have an account?</p>
					<Link to="/sign-up">
						<span className="text-blue-500">Sign up</span>
					</Link>
				</div>
				<p className="text-red-700 mt-5">
					{error ? error.message || "Something went wrong!" : ""}
				</p>
			</div>
		</>
		// <div className='p-3 max-w-lg mx-auto'>
		//   <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
		//   <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
		//     <input
		//       type='email'
		//       placeholder='Email'
		//       id='email'
		//       className='bg-slate-100 p-3 rounded-lg'
		//       onChange={handleChange}
		//     />
		//     <input
		//       type='password'
		//       placeholder='Password'
		//       id='password'
		//       className='bg-slate-100 p-3 rounded-lg'
		//       onChange={handleChange}
		//     />
		//     <button
		//       disabled={loading}
		//       className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
		//     >
		//       {loading ? 'Loading...' : 'Sign In'}
		//     </button>
		//     <OAuth />
		//   </form>
		//   <div className='flex gap-2 mt-5'>
		//     <p>Dont Have an account?</p>
		//     <Link to='/sign-up'>
		//       <span className='text-blue-500'>Sign up</span>
		//     </Link>
		//   </div>
		//   <p className='text-red-700 mt-5'>
		//     {error ? error.message || 'Something went wrong!' : ''}
		//   </p>
		// </div>
	);
}
