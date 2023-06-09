// App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import User from "./components/User";
import GroupList from "./components/GroupList";
import UserList from "./components/UserList";
import Groups from "./components/Groups";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Welcome />} />
				<Route path="/user/:id" element={<User />} />
				<Route path="/group/:group" element={<GroupList />} />
				<Route path="/users" element={<UserList />} />
				<Route path="/groups" element={<Groups />} />
			</Routes>
		</Router>
	);
}

export default App;
