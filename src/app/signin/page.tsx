"use client";

import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

export default function SignInPage() {
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
        <Box flexDirection="column" gap={2} display="flex">
          <TextField
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}
