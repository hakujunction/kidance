"use client";

import { Box, Button } from "@mui/material";
import { StyledText } from "../styledText";
import { Centred } from "../centred";

export const StartCounterButton = ({onClick}: {onClick: () => void}) => {

  return (
    <Centred onClick={() => {onClick()}} >
      <Box textAlign={'center'} >
      <StyledText>PLAY</StyledText>
       </Box>

    </Centred>
  );
}

