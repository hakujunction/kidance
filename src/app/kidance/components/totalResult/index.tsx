"use client";

import { Box, Button, Modal, Paper, Popover, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import Grid from '@mui/material/Grid';
import { relative } from "path";
import { StyledText } from "../styledText";
import { StartCounter } from "../counter";

const style = {
  width: '100vw',
  height: '100vh',
  position: 'absolute',
  top: 0,
  left: 0,
  justifyContent: 'center',
  alignItems: 'center'
};

export const TotalResult = ({setIsShown, onRetry}: {setIsShown: any, onRetry: any}) => {
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
        <StyledText>Total Result: <br/> 80% <br/> <b>Try Again</b></StyledText>
      </Box>
      </Box>
    </Box>
    </>
  );
}

