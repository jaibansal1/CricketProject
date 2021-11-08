import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "../../GlobalComponents/Title";
import Box from "@mui/material/Box";
import { Text } from "recharts";

function preventDefault(event) {
  event.preventDefault();
}

const Bio = () => {
  return (
    <React.Fragment>
      <Box sx={{ mx: "auto", my: 1 }}>
        <Title>Player Bio</Title>
      </Box>
      {/* <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography> */}
      <div>
        <Text>
          Opu Poro is an Australian Cricketer. He is currently the Vice Captain
          of the Australian Cricket Team. He won the Man of the Match Award 2012
          World Cup.
        </Text>
        {/* <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link> */}
      </div>
    </React.Fragment>
  );
};
export default Bio;
