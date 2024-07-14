// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import WelcomePage from "./Pages/WelcomePage";
import Navigation from "./component/Layout/Navigation";
import { AuthContextProvider } from "./Store/auth-content";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/" element={<Navigate to="/" />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
