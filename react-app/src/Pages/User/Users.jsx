import React from "react";
import { useState, useEffect } from "react";
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
  
      id: 1,
      firstname: "seema",
      lastname: "khalil",
      role: "admin",
      email: "sjdh@",
      displayName: "seema khalil",
    },
    {
      id: 2,
      firstname: "Hama",
      lastname: "khalil",
      role: "admin",
      email: "sjdh@",
      displayName: "seema khalil",
    },
    {
      id: 3,
      firstname: "Zhin",
      lastname: "khalil",
      role: "admin",
      email: "sjdh@",
      displayName: "seema khalil",
    },
  ]); //list of users

  const SelectedRow = (id) => {
    navigate("/dashboard/users/" + id);

    // console.log(users.id);
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
