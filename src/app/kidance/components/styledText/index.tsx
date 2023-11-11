"use client";

import { Box, Typography } from "@mui/material";

export const StyledText = ({
  children,
  fontSize,
  colors,
  skipSecondary
}: {
  children: React.ReactNode | string, 
  fontSize?: string,
  colors?: {
    primary: string;
    secondary: string;
  },
  skipSecondary?: boolean
}) => {
  return (
    <Box paddingX='10px' position='relative' textAlign={'center'}>
        <Typography color={colors?.primary || 'pink'} fontSize={fontSize || '144px'}>{children}</Typography>
        
        {!skipSecondary && (<Box position={"absolute"} zIndex={'9999'} top='4px' left='14px'>
        <Typography color={colors?.secondary || 'violet'}  fontSize={fontSize || '144px'}>{children}</Typography>
        </Box>)}
    </Box>
  );
}

