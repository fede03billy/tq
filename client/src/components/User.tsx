// components/User.tsx
// In this page the user can see his username and his upcounts, then he can move to the Group page or the Leaderboard page.
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

interface User {
	id: string;
	username: string;
	group: string;
	upvotes: number;
}

const User: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		try {
			fetch(`http://localhost:3000/users/${id}`, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("tq_token"),
				},
			})
				.then((response) => response.json())
				.then((data) => setUser(data));
		} catch (e: any) {
			console.error(e.message);
		}
	}, [id]);

	return (
		<>
			{user ? (
				<div>
					<h1>Name: {user.username}</h1>
					<p>Upvotes: {user.upvotes}</p>
				</div>
			) : (
				<p>Loading...</p> // TODO: make a loading component
			)}
			<Link to={`/group/${user?.group ? user.group : ""}`}>Group</Link>
			<Link to={`/users`}>Leaderboard</Link>
		</>
	);
};

export default User;
