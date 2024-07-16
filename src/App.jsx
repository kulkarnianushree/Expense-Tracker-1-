import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import WelcomePage from "./Pages/WelcomePage";
import Navigation from "./component/Layout/Navigation";
import ProfilePage from "./Pages/ProfilePage";
import ForgotPasswordPage from "./Pages/Forgot-PasswordPage";
import { useSelector } from "react-redux";
import DownloadPage from "./Pages/DownloadPage";

function App() {
  const loginstatus = useSelector((state) => state.auth.isLoggedin);

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={loginstatus ? <Navigate to="/welcome" /> : <AuthPage />} />
        <Route path="/welcome" element={loginstatus ? <WelcomePage /> : <Navigate to="/" />} />
        <Route path="/Profile" element={loginstatus ? <ProfilePage /> : <Navigate to="/" />} />
        <Route path="/ForgotPassword" element={loginstatus ? <Navigate to="/welcome" /> : <ForgotPasswordPage />} />
        <Route path="/download" element={<DownloadPage/>}/>
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect any unknown routes to the home page */}
      </Routes>
    </Router>
  );
}

export default App;
