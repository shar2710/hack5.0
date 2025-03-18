import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConnectWallet from "./components/ConnectWallet";
import "./index.css"; // Import Bootstrap styles

const Home = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState(null); // Lift state up

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-gradient">
      {/* Header */}
      <h1 className="display-4 fw-bold text-dark text-center mb-4 shadow-text">
        Secure Prescription System
      </h1>

      {/* Wallet Connection Card */}
      <div className="card wallet-card text-center p-4">
        <h2 className="fs-4 fw-semibold text-dark">Connect Your Wallet</h2>

        {/* Show wallet address if connected */}
        {walletAddress ? (
          <div className="wallet-address-box p-3 rounded-md border-2 border-black bg-white">
            <p className="wallet-address text-black font-mono text-lg break-words">
              {walletAddress}
            </p>
          </div>
        ) : (
          <ConnectWallet setWalletAddress={setWalletAddress} />
        )}
      </div>

      {/* Role Selection */}
      <h2 className="fs-4 fw-bold text-dark mt-4">Choose Your Role</h2>

      <div className="d-flex flex-column flex-md-row gap-3 mt-3">
        <button
          onClick={() => navigate("/doctorDashboard")}
          className="btn role-button btn-primary"
        >
          👨‍⚕️ Doctor
        </button>
        <button
          onClick={() => navigate("/pharmacistDashboard")}
          className="btn role-button btn-success"
        >
          🏥 Pharmacist
        </button>
        <button
          onClick={() => navigate("/patientDashboard")}
          className="btn role-button btn-purple"
        >
          👤 Patient
        </button>
      </div>
    </div>
  );
};

export default Home;
