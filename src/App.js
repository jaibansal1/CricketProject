import React from "react";
import Application from "./Components/Application";
import { AuthProvider } from "./Providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Application />
    </AuthProvider>
  );
}

export default App;
