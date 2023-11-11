"use client";

import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

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
  const [_timestamp, setTimestamp] = useState(Date.now());
  const counter = useRef(5);

  useEffect(() => {
    const timeoutId = setInterval(() => {
        counter.current = counter.current - 1;
        setTimestamp(Date.now());
        if (counter.current === 0) {
          clearInterval(timeoutId);
          setIsOpen(false);
          playVideo();
        }

        if (counter.current === -1) {
          clearInterval(timeoutId);
          counter.current = 5;
        }
      }, 1000);


      return function cleanup() {
        clearInterval(timeoutId);
      }
  }, []);

  return (
    <>
    <Box
        display={'flex'}
        bgcolor={'rgba(0,0,0, 0.5)'}
        sx={{...style}}
    >
      <Box position={'relative'} padding={'10px'} zIndex={'9999'}>
      <Box paddingX={'20px'}>
        <StyledText>{counter.current !== 0 ? counter.current.toString() : 'LET\'S GO'} </StyledText>
      </Box>
      </Box>
    </Box>
    </>
  );
}

