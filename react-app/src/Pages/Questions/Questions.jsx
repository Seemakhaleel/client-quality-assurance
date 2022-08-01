import React from "react";
import { useState } from "react";
import Cards from "../../components/Cards";
import { useSelector, useDispatch } from "react-redux";

const Questions = () => {
  const auth = useSelector((state) => state.authentication);
  const [questions] = useState([
    {
      id: 1,
      name: "What is React?",
      description:
        "React is a JavaScript library for building user interfaces. It is  maintained by Facebook and a community of individual developers andcompanies. React can be used as a base in the development of single-page or mobile applications.",
    },
    {
      id: 2,
      name: "What is React Router?",
      description:
        " React Router is a JavaScript routing library for React. It isdesigned with a focus on client-side navigation for use in browsers. React Router is a collection of components that make it easy to build a variety of applications that have a top-down navigation model.",
    },
    {
      id: 3,
      name: "What is React Router?",
      description:
        " React Router is a JavaScript routing library for React. It isdesigned with a focus on client-side navigation for use in browsers. React Router is a collection of components that make it easy to build a variety of applications that have a top-down navigation model.",
    },
    {
      id: 4,
      name: "What is React Router?",
      description:
        " React Router is a JavaScript routing library for React. It isdesigned with a focus on client-side navigation for use in browsers. React Router is a collection of components that make it easy to build a variety of applications that have a top-down navigation model.",
    },
    {
      id: 5,
      name: "What is React Router?",
      description:
        " React Router is a JavaScript routing library for React. It isdesigned with a focus on client-side navigation for use in browsers. React Router is a collection of components that make it easy to build a variety of applications that have a top-down navigation model.",
    },
  ]);
  console.log(auth);
  return (
    <>
      <Cards questions={questions} />
      <h1 style={{ marginTop: "20px" }}>{auth.email}</h1>
    </>
  );
};

export default Questions;
