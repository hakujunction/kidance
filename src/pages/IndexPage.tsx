import { Box } from "@mui/material";
import { useQuery } from "react-query";

export function IndexPage() {
  const { data } = useQuery<{ email: string }>("me", () => {
    return fetch("/api/getMe").then((res) => res.json());
  });

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
        Are you ready for a joke?
      </h1>
    </Box>
  );
}
