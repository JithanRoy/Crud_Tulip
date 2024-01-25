import React from "react";

const UserList = ({ users, viewUser, editUser, deleteUser }) => {
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>{user.name}</p>
            <p>Date of Birth: {user.dob}</p>
            <p>Address: {user.address}</p>
            <button onClick={() => viewUser(user)}>View</button>
            <button onClick={() => editUser(user)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
