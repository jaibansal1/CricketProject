import * as React from "react";
import Title from "../../GlobalComponents/Title";
import Box from "@mui/material/Box";
import { Text } from "recharts";

const Bio = (props) => {
  return (
    <React.Fragment>
      <Box sx={{ mx: "auto", my: 1 }}>
        <Title>Player Bio</Title>
      </Box>
      <div>
        <Text>{props.bioProp}</Text>
      </div>
    </React.Fragment>
  );
};
export default Bio;
