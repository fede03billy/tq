// component that lists all groups

import React, { useState, useEffect } from "react";

const Groups: React.FC = () => {
	const [groups, setgroups] = useState<{ groupName: string; count: number }[]>(
		[],
	);

	useEffect(() => {
		fetch("http://localhost:3000/users/groups/list", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("tq_token")}`,
			},
		})
			.then((response) => response.json())
			.then((data) => setgroups(data));
	}, []);

	return (
		(groups? (<div>
			<h1>Groups</h1>
            {groups.map((group) => (
                <div key={group.groupName}>
                    <p>Group Name: {group.groupName}</p>
                    <p>Members: {group.count}</p>
                </div>
            ))}
		</div>):(<div>Loading...</div>))
	);
};

export default Groups;
