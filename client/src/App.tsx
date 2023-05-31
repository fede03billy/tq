// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './components/Welcome';
import User from './components/User';
import UserList from './components/UserList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user/:id" element={<User />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;
