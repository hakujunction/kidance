"use client";

import { Box } from "@mui/material";
import { useMe } from "./signin/hooks/useMe";

import CircularProgress from '@mui/material/CircularProgress';

export default function IndexPage() {
  const data = useMe();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      flexDirection='column'
    >
      
      {data.status != 'resolved' 
        ? <CircularProgress />
        : (
          <>
          <h1>
            Hello, {data?.email ? data.email : " unathorized"}!
          </h1>
          <h2>
            Are you ready for a joke?!
          </h2>
        </>
        )
     }
    </Box>
  );
}