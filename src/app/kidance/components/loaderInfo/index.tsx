"use client";

import { Box, CircularProgress } from "@mui/material"
import { Centred } from "../centred"
import { StyledText } from "../styledText"


export const LoaderInfo = () => {
    return (
     <Centred>
        <Box position='relative' display='block' paddingX={'20px'}>
          <StyledText skipSecondary fontSize='32px'>
            Hello, it is the Kidance project.
            <br /> We need a few seconds to load page.
            </StyledText>
        <br/>

        <Box alignItems={'center'} textAlign={'center'}>
        <CircularProgress />
        </Box>
        </Box>
        <img src="/1X1.png" id="bank" style={{ opacity: 0}} />
      </Centred>
    )
}