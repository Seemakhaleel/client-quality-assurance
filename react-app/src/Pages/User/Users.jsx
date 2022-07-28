import React from "react";
import { useState } from "react";
import Tables from "../../components/Tables";

import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();

  const [cols, setCols] = useState([
    {
      name: "role",
    },
    {
      name: "display name",
    },
    {
      name: "email",
    },
    {
      name: "first name",
    },
    {
      name: "last name",
    },
  ]);
  const [users, setUsers] = useState([
    {
      role: "admin",
      displayName: "Seema M",
      email: "seema@",
      firstName: "Seema",
      lastName: "M",
    },

    {
      role: "SE",
      displayName: "Hama M",
      email: "Hama@",
      firstName: "Hama",
      lastName: "M",
    },
    {
      role: "QA",
      displayName: "zhin M",
      email: "zhin@",
      firstName: "Hama",
      lastName: "M",
    },

   
  ]); //list of users

  const SelectedRow = (id) => {
    // selected row function to navigate to user details page with id as parameter and passing id to user details page
    navigate("/dashboard/users/" + id);
  };

  // function deleteUser(id) { //delete user
  //   setUsers(users.filter((user) => user.id !== id));
  // }
  // function updateUser(user) { //update user
  //   setUsers(users.map((u) => (u.id === user.id ? user : u)));
  // }

  return (
    <>
      <Tables users={users} cols={cols} SelectedRow={SelectedRow} />
    </>
  );
};

export default Users;
