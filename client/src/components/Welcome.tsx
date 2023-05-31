// components/Welcome.tsx
import React from 'react';
import { useNavigate } from "react-router-dom";


const Welcome: React.FC = () => {
  const useState = React.useState;
  const useRef = React.useRef;
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [login, setLogin] = useState(true); // login == true if user is logging, login == false if user is registering

  const handleSwitch = () => {
    setLogin(!login);
  };

  const saveToken = (id: string) => {
    localStorage.setItem('token', id); // TODO: save the actual token and not the id
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if(passwordRef.current?.value !== confirmPasswordRef.current?.value){
      alert("Passwords do not match");
      return false;
    } else {
      // send the data to the API
      // endpoint POST /users
      await fetch('http://127.0.0.1:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          //'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          username: usernameRef.current?.value,
          password: passwordRef.current?.value
        })
      }).then(res => res.json())
      .then(data => {
        console.info("Redirecting...")
        saveToken(data._id);
        navigate(`/users/${data._id}`)
      });
    }

  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        username: usernameRef.current?.value,
        password: passwordRef.current?.value
      }
    )})
    .then(res => res.json())
    .then(data => {
        console.log(data);
    });
    console.log("login");
  };

  return (
    <>
      <div className='flex flex-col justify-start items-center h-screen'>
        <h1>TQ</h1>
        <form className='login-form flex flex-col justify-start items-start'>
          <input type='text' placeholder='Username' ref={usernameRef} />
          <input type='password' placeholder='Password' ref={passwordRef} />
          {!login &&<input type='password' placeholder='Confirm Password' ref={confirmPasswordRef} />}
          {login ? <button onClick={handleLogin}>Login</button>:
          <button onClick={handleRegister}>Register</button>}
        </form>
        <button onClick={handleSwitch}>Switch to {login ? 'Register' : 'Login'}</button>
      </div>
    </>
  );
};

export default Welcome;
