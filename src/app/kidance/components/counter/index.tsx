"use client";

import { Box } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

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
  const intervalRef = useRef<any>(null);



    useLayoutEffect(() => {
      if (counter === -1) {
        setIsOpen(false);
        clearInterval(intervalRef?.current);
        setCounter(5);
      }
    }, [counter, setIsOpen]);

    useEffect(() => {
      if (counter === -1) {
        playVideo();
      }
    }, [counter, playVideo]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
        setCounter((counter) => counter - 1)
      }, 1000);


      return function cleanup() {
        clearInterval(intervalRef.current);
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
        <StyledText>{counter !== 0 ? counter.toString() : 'LET\'S GO'} </StyledText>
      </Box>
      </Box>
    </Box>
    </>
  );
}

