import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
	const { currentUser } = useSelector((state) => state.user);
	return (
		<div className="bg-[#f6f2eb]">
			<div className="flex justify-between items-center max-w-6xl mx-auto p-6">
				<Link to="/">
					<h1 className="font-bold">MERN Auth</h1>
				</Link>
				<ul className="flex gap-4">
					<Link to="/profile">
						{currentUser ? (
							<img
								src={currentUser.profilePicture}
								alt="profile"
								className="h-7 w-7 rounded-full object-cover"
							/>
						) : (
							<li className="bg-[#fec887] w-full py-2 px-4 text-sm font-bold rounded-lg hover:bg-black hover:text-white">
								Sign In
							</li>
						)}
					</Link>
				</ul>
			</div>
		</div>
	);
}
