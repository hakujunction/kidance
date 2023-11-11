"use client";

import { Box} from "@mui/material";

import { StyledText } from "../styledText";

const style = {
  width: '100vw',
  height: '100vh',
  position: 'absolute',
  top: 0,
  left: 0,
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer'
};

export const Centred = (
{children, onClick}: {children: React.ReactNode, onClick?: () => void}
) => {
  return (
    <>
    <Box
        display={'flex'}
        bgcolor={'rgba(0,0,0, 0.7)'}
        sx={{...style}}
        onClick={() => {onClick && onClick()}}
    >
      {children}
    </Box>
    </>
  );
}