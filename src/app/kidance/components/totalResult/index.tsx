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

export const TotalResult = ({isOpen}: {isOpen?: true}) => {
  const [isShown, setIsShown] = useState<boolean>(isOpen || false);

  return (
    <>
    <Box
        display={isShown ? 'flex' : 'none'}
        bgcolor={'rgba(0,0,0, 0.5)'}
        sx={{...style}}
        onClick={() => {setIsShown(false)}}
    >
      <Box position={'relative'} padding={'10px'} zIndex={'9999'}>
      <Box paddingX={'20px'} textAlign={'center'}>
        <StyledText>Total Result: <br/> 80%</StyledText>
      </Box>
      </Box>
    </Box>
    </>
  );
}

