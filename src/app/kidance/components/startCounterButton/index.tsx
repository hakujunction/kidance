"use client";

import { Box, Button } from "@mui/material";


const style = {
  width: '100vw',
  height: '100vh',
  position: 'absolute',
  top: 0,
  left: 0,
  justifyContent: 'center',
  alignItems: 'center'
};

export const StartCounterButton = ({onClick}: {onClick: () => void}) => {

  return (
    <>
    <Box textAlign={'center'} >
                  <Button onClick={() => {
                    onClick();
                  }} size='large' variant="contained">Start</Button>
                </Box>
    </>
  );
}

