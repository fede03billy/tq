// components/GroupList.tsx
// in this page the user can join or leave a group and see the leaderboard of the group.
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface User {
	id: string;
	username: string;
	group: string;
	upvotes: number;
}

const GroupList: React.FC = () => {
	const [users, setUsers] = useState<User[]>([]);
	const group = useParams().group;
	const navigate = useNavigate();

	useEffect(() => {
		if (!group) {
			navigate("/groups");
			return;
		}
		fetch(`http://localhost:3000/users/group/${group}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("tq_token")}`,
			},
		})
			.then((response) => response.json())
			.then((data) => setUsers(data));
	}, []);

	return (
		<>
			<h1>Group: {group} Leaderboard</h1>
			{users.length > 0 ? (
				users
					.sort((a, b) => b.upvotes - a.upvotes)
					.map((user) => (
						<div key={user.id}>
							<p>
								{user.username} - {user.upvotes}
							</p>
						</div>
					))
			) : (
				<p>Loading...</p> // TODO: make a loading component
			)}
		</>
	);
};

export default GroupList;
