import React from "react";
import InputForm from "./InputForm";

export default function UserEdit({ user, updateUser }) {
  return (
    <div>
      <h2>Edit User</h2>
      <InputForm initialData={user} updateUser={updateUser} />
    </div>
  );
}
