"use client";

import { Box} from "@mui/material";

import { StyledText } from "../styledText";

const getConfigByPercent = (value: number | null): {
  text: string,
  theme?: string
} => {
  if (value === null) {
    return {
      text: '',
      theme: 'default'
    };
  }
  if (value <= 30) {
    return {
      text: 'MISSED',
      theme: 'MISSED'
    };
  }

  if (value <= 50) {
    return {
      text: 'OK',
      theme: 'default'
    }
  }

  if (value <= 80) {
    return {
      text: 'BETTER',
      theme: 'BETTER'
    };
  }

  if (value <= 90) {
   return {
    text: 'ALMOST',
    theme: 'ALMOST'
   }
  }

  if (value <= 100) {
   return {
    text: 'PERFECT',
    theme: 'PERFECT'
   }
  }

  return {
    text: ''
  };
}

export const Progress = ({value}: {value: number | null}) => {
  const {text, theme} = getConfigByPercent(value);

  const colorTheme: any = {
    default: {
      primary: 'pink',
      secondary: 'violet'
    },
    PERFECT: {
      primary: 'green',
      secondary: 'violet'
    },
    ALMOST: {
      primary: 'green',
      secondary: 'yellow'
    },
    MISSED: {
      primary: 'black',
      secondary: 'red'
    },
    BETTER: {
      primary: 'green',
      secondary: 'red'
    }
  }
  const colors = colorTheme[theme as any || 'default'];

  if (!text) {
    return null;
  }

  return (
    <>
      <div className="example-style">
      <Box marginLeft='3%' position={'absolute'} top='50%' marginTop={'-130px'}>
          <StyledText colors={colors} fontSize="70px">{text}</StyledText>
      </Box>
      </div>
      <div className="example-style">
        <Box marginRight='3%' position={'absolute'} top='50%' right='0' marginTop={'-130px'}>
        <StyledText colors={colors} fontSize="70px">{text}</StyledText>
        </Box>
      </div>
    </>
  );
}

