import { useState } from "react";

export default function InputForm({
  addUser,
  updateUser,
  usersLength,
  initialData,
}) {
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    if (formData.id) {
      updateUser(formData);
    } else {
      let indexUser = usersLength + 1;
      formData.id = indexUser.toString();
      addUser(formData);
    }
    setFormData({ id: "", name: "", dob: "", address: "" });
  };

  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="text"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
