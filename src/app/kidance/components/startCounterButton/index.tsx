"use client";

import { Box, Button, Modal, Paper, Popover, TextField, Typography } from "@mui/material";
import { useState } from "react";

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

export const StartCounterButton = ({setIsOpen}: {setIsOpen: any}) => {

  return (
    <>
    <Box textAlign={'center'} >
                  <Button onClick={() => {
                    setIsOpen(true);
                  }} size='large' variant="contained">Start</Button>
                </Box>
    </>
  );
}

