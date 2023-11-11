"use client";

import { Box, Button, Modal, Paper, Popover, TextField, Typography } from "@mui/material";
import { useState } from "react";

import Grid from '@mui/material/Grid';
import { relative } from "path";

const style = {
  width: '100vw',
  height: '100vh',
  position: 'absolute',
  top: 0,
  left: 0,
  justifyContent: 'center',
  alignItems: 'center'
};

export const StyledText = ({children}: {children: any}) => {

  return (
    <Box paddingX='10px' position='relative' textAlign={'center'}>
        <Typography color={'pink'} fontSize={144}>{children}</Typography>
        <Box position={"absolute"} zIndex={'9999'} top='4px' left='14px'>
        <Typography color={'violet'}  fontSize={144}>{children}</Typography>
        </Box>
    </Box>
  );
}

