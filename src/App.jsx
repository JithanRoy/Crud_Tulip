import { useEffect, useState } from "react";
import InputForm from "./components/InputForm";
import UserEdit from "./components/UserEdit";
import UserList from "./components/UserList";

export default function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
    updateUser();
    deleteUser();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3001/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async (userData) => {
    console.log(userData);
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      setUsers([...users, data]);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const updateUser = async (userData) => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const updatedUser = await response.json();
      const updatedUsers = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      setUsers(updatedUsers);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await fetch(`http://localhost:3001/users/${userId}`, {
        method: "DELETE",
      });
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h1>CRUD Application</h1>
      <InputForm
        addUser={addUser}
        updateUser={updateUser}
        usersLength={users.length}
        initialData={{ id: "", name: "", dob: "", address: "" }}
      />
      <UserList
        users={users}
        viewUser={setSelectedUser}
        editUser={setSelectedUser}
        deleteUser={deleteUser}
      />
      {selectedUser ? (
        <div>
          <UserEdit user={selectedUser} updateUser={updateUser} />
        </div>
      ) : null}
    </div>
  );
}
