"use client";

import { Box, Button, Modal, Paper, Popover, TextField, Typography } from "@mui/material";
import { useState } from "react";

import Grid from '@mui/material/Grid';
import { relative } from "path";
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

export const StartCounter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [counter, setCounter] = useState(5);

  return (
    <>
    <Box textAlign={'center'} >
                  <Button onClick={() => {
                    setIsOpen(true);
                    const timeoutId = setInterval(() => {
                      setCounter((counter) => {
                        if (counter - 1 === -1) {
                          clearInterval(timeoutId);
                          setIsOpen(false);
                          return 5;
                        } else {
                          return counter - 1;
                        }

                      })
                    }, 1000);

                  }} size='large' variant="contained">Start</Button>
                </Box>
    <Box
        display={isOpen ? 'flex' : 'none'}
        bgcolor={'rgba(0,0,0, 0.5)'}
        sx={{...style}}
    >
      <Box position={'relative'} padding={'10px'} zIndex={'9999'}>
      <Box paddingX={'20px'}>
        <StyledText>{counter !== 0 ? counter.toString() : 'LET\'S GO'} </StyledText>
      </Box>
      </Box>
    </Box>
    </>
  );
}

