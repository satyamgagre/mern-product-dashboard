import { Box, useColorModeValue } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";

function App() {
  const bg = useColorModeValue("gray.50", "gray.900");

  return (
    <Box minH="100vh" bg={bg}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
