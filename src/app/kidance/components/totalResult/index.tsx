"use client";

import { Box} from "@mui/material";

import { StyledText } from "../styledText";

const style = {
  width: '100vw',
  height: '100vh',
  position: 'absolute',
  top: 0,
  left: 0,
  justifyContent: 'center',
  alignItems: 'center'
};

export const TotalResult = (
  {setIsShown, onRetry, result }: 
  {setIsShown: any, onRetry: any, result: number}
) => {
  return (
    <>
    <Box
        display={'flex'}
        bgcolor={'rgba(0,0,0, 0.7)'}
        sx={{...style}}
        onClick={() => {setIsShown(false); onRetry()}}
    >
      <Box position={'relative'} padding={'10px'} zIndex={'9999'}>
      <Box paddingX={'20px'} textAlign={'center'}>
        <StyledText>Total Result: <br/> {result}% <br/> <b>Try Again</b></StyledText>
      </Box>
      </Box>
    </Box>
    </>
  );
}

