import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function FlexContainer(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: props._bgcolor,
            height: props._height,
            margin: props._margin,
            padding: props._padding,
          }}
        />
      </Container>
    </React.Fragment>
  );
}
