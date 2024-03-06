import { RouterProvider } from "react-router-dom";

import CustomProvider from "./redux/provider.tsx";
import Setup from "./components/utils/Setup.tsx";
import { router } from "./router/router.tsx";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <CustomProvider>
      <Setup />
      <RouterProvider router={router} />
    </CustomProvider>
  );
}

export default App;
