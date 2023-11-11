"use client";

import { Box, Button, Modal, Paper, Popover, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import Grid from '@mui/material/Grid';
import { relative } from "path";
import { StartCounter } from "./components/startCounter";
import { StyledText } from "./components/styledText";
import { TotalResult } from "./components/totalResult";


export default function KidancePage() {
  const videoRef = useRef<HTMLVideoElement>();
  const playVideo = (event: any) => {
    videoRef.current && videoRef.current.play();
  };

  return (
    <Box bgcolor='#000' width='100%'>
    <video ref={videoRef as any} controls >
      <source src="/dance.mp4" type="video/mp4"/>
    </video>
    <StartCounter playVideo={playVideo} />  
    </Box>
  )

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

