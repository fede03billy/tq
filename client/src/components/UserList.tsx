// components/UserList.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  group: string;
  upvotes: number;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

//   useEffect(() => {
//     fetch('http://localhost:3000/api/users')
//       .then((response) => response.json())
//       .then((data) => setUsers(data));
//   }, []);

  return (
    <>
      <h1>Users</h1>
      {users
        .sort((a, b) => b.upvotes - a.upvotes)
        .map((user) => (
          <div key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
            <p>Group: {user.group}</p>
            <p>Upvotes: {user.upvotes}</p>
          </div>
        ))}
    </>
  );
};

export default UserList;
