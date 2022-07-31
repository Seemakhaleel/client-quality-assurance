import React from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { IconButton } from "@mui/material";

const Question = () => {
  const [inputText, setInputText] = useState("");
  const [answer, setAnswer] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnswer([...answer, inputText]);
    console.log(inputText);
    setInputText("");
  };

  const { id } = useParams();

  return (
    <>
      <form onSubmit={handleSubmit}>
       
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "auto",
           
           
          }}
        >
          <Box>
            <h2>Question {id}</h2>
            <h4> What is React router?</h4>
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderRightWidth: "80px" }}
          >
            <Chip label="Answers" />
          </Divider>
          <Box sx={{}}>
            <Typography sx={{ fontSize: 20, width: 900}}>
              {/* {answer.map((answer) => ( 
        <Box key={answer}> {answer} </Box>   ))}  */}
              1- React Router is a JavaScript routing library for React. It is a declarative way to define the routing of your application.
             
              <IconButton>
          <ThumbUpIcon/>
          </IconButton>
          
            </Typography>
          </Box>
          <Box sx={{ marginTop: "5px" }}>
            <Typography sx={{ fontSize: 20 , width: 900}}>
              {/* {answer.map((answer) => ( 
        <Box key={answer}> {answer} </Box>   ))}  */}
              2- React Router is a JavaScript routing library for React. It
              isdesigned with a focus on client-side navigation for use in
              browsers.
              <IconButton>
          <ThumbUpIcon/>
          </IconButton>
         
            </Typography>
          </Box>
          <Box sx={{ marginTop: "5px" }}>
            <Typography sx={{ fontSize: 20 , width: 900}}>
              {/* {answer.map((answer) => ( 
        <Box key={answer}> {answer} </Box>   ))}  */}
              3- React Router is a JavaScript routing library for React. It
              isdesigned with a focus on client-side navigation for use in
              browsers.
              <IconButton>
          <ThumbUpIcon/>
          </IconButton>
         
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Answer"
            id="Answer"
            multiline
            maxRows={7}
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
          />
          <Button
            variant="contained"
            type="submit"
            endIcon={<SendIcon />}
            sx={{
              marginTop: "10px",
              marginLeft: "400px",
            }}
          >
            Submit
          </Button>

          <ol>
            {answer.map((a, index) => {
              <li key={index}>{a}</li>;
            })}
          </ol>
        </Box>
      </form>
    </>
  );
};

export default Question;
