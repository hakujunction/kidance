"use client";

import { Box, Button, Modal, Paper, Popover, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

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

export const StartCounter = ({setIsOpen, playVideo}: {setIsOpen: any, playVideo: any}) => {
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    const timeoutId = setInterval(() => {
        setCounter((counter) => {
          if (counter - 1 === -1) {
            clearInterval(timeoutId);
            setIsOpen(false);
            playVideo();
            return 5;
          } else {
            return counter - 1;
          }

        })
      }, 1000);


      return function cleanup() {
        clearInterval(timeoutId);
      }
  }, [])

  return (
    <>
    <Box
        display={'flex'}
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

