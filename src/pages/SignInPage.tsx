import { Box, Button, Input } from "@mui/material";
import { useState } from "react";

export function SignInPage() {
  const [email, setEmail] = useState("");

  return (
    <Box
      display="flex"
      flex={1}
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <form method="POST" action="/api/auth/signin">
        <h1>Sign In</h1>
        <Box>
          <Input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}
