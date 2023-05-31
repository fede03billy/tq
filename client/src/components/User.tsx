// components/User.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  group: string;
  upvotes: number;
}

const User: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/users/${id}`,{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, [id]);

  return (
    <>
      {user ? (
        <div>
          <h1>Nome: {user.name}</h1>
          <p>Upvotes: {user.upvotes}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default User;
