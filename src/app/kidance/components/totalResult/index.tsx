"use client";

import { Box} from "@mui/material";

import { StyledText } from "../styledText";
import { Centred } from "../centred";

export const TotalResult = (
  {setIsShown, onRetry, result }: 
  {setIsShown: any, onRetry: any, result: number}
) => {
  return (
    <Centred
        onClick={() => {setIsShown(false); onRetry()}}
    >
      <Box position={'relative'} padding={'10px'} zIndex={'9999'}>
        <Box paddingX={'20px'} textAlign={'center'}>
          <StyledText>Total Result: <br/> {result}% <br/> <b>Try Again</b></StyledText>
        </Box>
      </Box>
    </Centred>
  );
}

