"use client";

import { Box} from "@mui/material";

import { StyledText } from "../styledText";

const mapStatusToText: Record<string, string> = {
  'doBetter': 'do better',
  'good': 'good',
  'best': 'you\'re the best',
  'excelent': 'perfect'
};

export const Progress = ({value}: {value: string}) => {
  return (
    <>
    <div className="example-style">
    <Box marginLeft='3%' position={'absolute'} top='50%' marginTop={'-130px'}>
        <StyledText fontSize="70px">{mapStatusToText[value]}</StyledText>
    </Box>
    </div>
    <div className="example-style">
    <Box marginRight='3%' position={'absolute'} top='50%' right='0' marginTop={'-130px'}>
    <StyledText fontSize="70px">{mapStatusToText[value]}</StyledText>
    </Box>
    </div>
    </>
  );
}

