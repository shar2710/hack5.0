import React from "react";
import { BrowserProvider } from "ethers";

const ConnectWallet = ({ setWalletAddress }) => {
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address); // Set state in Home.js
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("MetaMask not detected! Please install MetaMask.");
    }
  };

  return (
    <button
      className="px-6 py-3 text-lg font-semibold text-black bg-white border border-black hover:bg-gray-200 transition-all rounded-lg shadow-md"
      onClick={connectWallet}
    >
      Connect Wallet
    </button>
  );
};

export default ConnectWallet;
