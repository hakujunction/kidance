"use client";

import { Box } from "@mui/material";
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
        <Box>
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Submit</button>
        </Box>
      </form>
    </Box>
  );
}
