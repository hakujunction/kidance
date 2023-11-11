"use client";

import { Box} from "@mui/material";

import { StyledText } from "../styledText";

const mapStatusToText: Record<string, string> = {
  'doBetter': 'do better',
  'good': 'good',
  'best': 'you\'re the best',
  'excelent': 'perfect'
};

const getTextByPercent = (value: number | null):string => {
  if (value === null) {
    return 'none';
  }
  if (value < 30) {
    return 'doBetter';
  }

  if (value < 60) {
    return 'good';
  }

  if (value < 90) {
    return 'best';
  }

  if (value < 190) {
   return 'excelent';
  }

  return 'none';
}

export const Progress = ({value}: {value: number | null}) => {

  const stage = getTextByPercent(value);



  return (
    <>
    <div className="example-style">
    <Box marginLeft='3%' position={'absolute'} top='50%' marginTop={'-130px'}>
        <StyledText fontSize="70px">{mapStatusToText[stage]}</StyledText>
    </Box>
    </div>
    <div className="example-style">
    <Box marginRight='3%' position={'absolute'} top='50%' right='0' marginTop={'-130px'}>
    <StyledText fontSize="70px">{mapStatusToText[stage]}</StyledText>
    </Box>
    </div>
    </>
  );
}

