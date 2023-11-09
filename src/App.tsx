import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { SignInPage } from "./pages/SignInPage";
import { SignInCheckPage } from "./pages/SignInCheckPage";
import { IndexPage } from "./pages/IndexPage";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/signin/check",
    element: <SignInCheckPage />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
