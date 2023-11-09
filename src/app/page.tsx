"use client";

import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

const useMe = () => {
  const [data, setData] = useState<{ email: string } | null>(null);

  const fetchData = useCallback(async () => {
    setData(await fetch("/api/getMe").then((res) => res.json()));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return data;
};

export default function IndexPage() {
  const data = useMe();

  return (
    <Box
      display="flex"
      flex={1}
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <h1>
        Hello, {data?.email ? data.email : " unathorized"}!<br />
        Are you ready for a joke?!
      </h1>
    </Box>
  );
}
