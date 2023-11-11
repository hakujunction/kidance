"use client";

import { Box } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { StyledText } from "../styledText";
import { Centred } from "../centred";

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
    <Centred>
      <Box position={'relative'} padding={'10px'} zIndex={'9999'}>
      <Box paddingX={'20px'}>
        <StyledText>{counter !== 0 ? counter.toString() : 'LET\'S GO'} </StyledText>
      </Box>
      </Box>
    </Centred>
  );
}

