"use client";

import { Box, Button, Modal, Paper, Popover, TextField, Typography } from "@mui/material";
import { useState } from "react";

import Grid from '@mui/material/Grid';
import { relative } from "path";
import { StartCounter } from "./components/startCounter";
import { StyledText } from "./components/styledText";
import { TotalResult } from "./components/totalResult";

const style = {
  width: '100vw',
  height: '100vh',
  position: 'absolute',
  top: 0,
  left: 0,
  justifyContent: 'center',
  alignItems: 'center'
};

export default function KidancePage() {
  return (
    <>
    <Box
      display="flex"
      padding='20px'
      flex={1}
      justifyContent="center"
      alignItems="center"
    >
       <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <h1>
              Kidance
              </h1>
              </Grid>
              {/* Chart */}
              <Grid item xs={12} md={12} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  Img
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  Img2
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <StartCounter />  
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
            </Grid>
            </Grid>
    </Box>
    <TotalResult />
    </>
  );
}

