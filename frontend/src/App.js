import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";  
import DoctorDashboard from "./DoctorDashboard";
import PharmacyPortal from "./PharmacyPortal";
import PatientPortal from "./PatientPortal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctorDashboard" element={<DoctorDashboard />} />
        <Route path="/pharmacyPortal" element={<PharmacyPortal />} />
        <Route path="/patientPortal" element={<PatientPortal />} />
      </Routes>
    </Router>
  );
}

export default App;
