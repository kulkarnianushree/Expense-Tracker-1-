// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import WelcomePage from "./Pages/WelcomePage";
import Navigation from "./component/Layout/Navigation";
import ProfilePage from "./Pages/ProfilePage";
import { AuthContextProvider } from "./Store/auth-content";
import ForgotPasswordPage from "./Pages/Forgot-PasswordPage";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/Profile" element={<ProfilePage/>}/>
          <Route path="/ForgotPassword" element={<ForgotPasswordPage/>}/>
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
