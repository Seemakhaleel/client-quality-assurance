import { Box } from "@mui/material";
import React from "react";

const Questions = () => {
  return (
    <Box width="100%">
      <ol>
        <li>
          <h3>What is React?</h3>
          <p>
            React is a JavaScript library for building user interfaces. It is
            maintained by Facebook and a community of individual developers and
            companies. React can be used as a base in the development of
            single-page or mobile applications.
          </p>
        </li>
        <li>
          <h3>What is React Router?</h3>
          <p>
            React Router is a JavaScript routing library for React. It is
            designed with a focus on client-side navigation for use in browsers.  
            React Router is a collection of components that make it easy to
            build a variety of applications that have a top-down navigation
            model.
          </p>
        </li>
      </ol>
    </Box>
  );
};

export default Questions;
