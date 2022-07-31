import { Box } from "@mui/material";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  ></Box>
);

export default function Cards({ questions }) {
  
  const navigate = useNavigate();
  return (
    <>
      <Container sx={{marginTop:10}}>
        <Grid container>
          <Grid item  xs={12} md={4}>
            {questions.map((ques) => (
              <Box
                component="span"
                sx={{
                  minWidth: 275,
                  marginTop: 5,
                  marginLeft: 50,
                  padding: 1,
                  width: 200,
                }}
                key={ques.id}
                onClick={() => {
                  return navigate("/dashboard/questions/" + ques.id);
                }}
              >
                <Card variant="bold" sx={{ width: 600, height: 200 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                     {ques.name}
                    </Typography>

                    <Typography variant="body2">
                     {ques.description}
                      <br />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="huge">answers</Button>
                  </CardActions>
                </Card>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}


