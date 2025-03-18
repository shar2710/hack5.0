import React, { useEffect, useState } from "react";
import Web3 from "web3";
import PrescriptionContract from "./contracts/Prescription.json";

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [zkProofHash, setZkProofHash] = useState("");
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = PrescriptionContract.networks[networkId];

        if (!deployedNetwork) {
          alert("Smart contract not deployed on this network.");
          return;
        }

        const instance = new web3.eth.Contract(PrescriptionContract.abi, deployedNetwork.address);
        setContract(instance);

        // Handle account change
        window.ethereum.on("accountsChanged", (accounts) => {
          if (accounts.length === 0) {
            alert("MetaMask account disconnected!");
            setAccount("");
          } else {
            setAccount(accounts[0]);
          }
        });

      } catch (error) {
        console.error("MetaMask Connection Error:", error);
        alert("Failed to connect to MetaMask. Check console for details.");
      }
    };

    loadBlockchainData();
  }, []);

  const issuePrescription = async () => {
    if (!contract) {
      alert("Smart contract not loaded.");
      return;
    }

    try {
      const proofHash = Web3.utils.soliditySha3(zkProofHash);
      await contract.methods
        .issuePrescription(proofHash, Math.floor(Date.now() / 1000) + 3600)
        .send({ from: account });

      alert("Prescription Issued!");
    } catch (error) {
      console.error("Transaction Error:", error);
      alert("Transaction failed. See console for details.");
    }
  };

  const checkPrescription = async () => {
    if (!contract) {
      alert("Smart contract not loaded.");
      return;
    }

    try {
      const proofHash = Web3.utils.soliditySha3(zkProofHash);
      const result = await contract.methods.isValidPrescription(proofHash).call();
      setIsValid(result);
    } catch (error) {
      console.error("Prescription Check Error:", error);
      alert("Failed to check prescription.");
    }
  };

  return (
    <div>
      <h2>Prescription DApp</h2>
      <p>Connected Account: {account || "❌ Not Connected"}</p>

      <input
        type="text"
        placeholder="Enter zkProofHash"
        value={zkProofHash}
        onChange={(e) => setZkProofHash(e.target.value)}
      />
      <button onClick={issuePrescription}>Issue Prescription</button>
      <button onClick={checkPrescription}>Check Prescription</button>

      {isValid !== null && (
        <p>Prescription Status: {isValid ? "✅ Valid" : "❌ Invalid or Used"}</p>
      )}
    </div>
  );
};

export default App;
