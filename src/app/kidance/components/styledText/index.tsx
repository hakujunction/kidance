"use client";

import { Box, Typography } from "@mui/material";

const style = {
  width: '100vw',
  height: '100vh',
  position: 'absolute',
  top: 0,
  left: 0,
  justifyContent: 'center',
  alignItems: 'center'
};

export const StyledText = ({
  children,
  fontSize,
  colors
}: {
  children: React.ReactNode | string, 
  fontSize?: string,
  colors?: {
    primary: string;
    secondary: string;
  }
}) => {



  return (
    <Box paddingX='10px' position='relative' textAlign={'center'}>
        <Typography color={colors?.primary || 'pink'} fontSize={fontSize || '144px'}>{children}</Typography>
        <Box position={"absolute"} zIndex={'9999'} top='4px' left='14px'>
        <Typography color={colors?.secondary || 'violet'}  fontSize={fontSize || '144px'}>{children}</Typography>
        </Box>
    </Box>
  );
}

