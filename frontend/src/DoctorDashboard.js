import React, { useState } from "react";
import * as snarkjs from "snarkjs"; // Import snarkjs for proof generation

const DoctorDashboard = () => {
  const [formData, setFormData] = useState({
    doctorID: "",
    patientName: "",
    patientAge: "",
    patientWeight: "",
    medicalHistory: "",
    patientID: "",
    medicine: "",
    dosage: "",
    tabletCount: "",
    expiryDate: "",
    zkProof: "N/A",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to generate ZK-SNARK proof
  const generateZKProof = async () => {
    try {
      const input = {
        doctorID: formData.doctorID,
        patientID: formData.patientID,
        medicine: formData.medicine,
        dosage: formData.dosage,
        tabletCount: formData.tabletCount,
      };

      // Load proving key and witness
      const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        input,
        "circuit.wasm", // Compiled Circom circuit
        "proving_key.zkey" // Proving key
      );

      // Set the generated proof
      setFormData({ ...formData, zkProof: JSON.stringify(proof) });

      console.log("Proof:", proof);
      console.log("Public Signals:", publicSignals);
    } catch (error) {
      console.error("Error generating ZK Proof:", error);
      alert("Failed to generate proof. Make sure the ZK-SNARK setup is correct.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Doctor Dashboard</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Create Prescription</h2>

        {/* Form Fields */}
        <input
          type="text"
          name="doctorID"
          placeholder="Licence Number (For Verification)"
          value={formData.doctorID}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="patientName"
          placeholder="Enter Patient Name"
          value={formData.patientName}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="number"
          name="patientAge"
          placeholder="Enter Patient Age"
          value={formData.patientAge}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="number"
          name="patientWeight"
          placeholder="Enter Patient Weight (kg)"
          value={formData.patientWeight}
          onChange={handleChange}
          className="input-field"
        />
        <textarea
          name="medicalHistory"
          placeholder="Enter Medical History"
          value={formData.medicalHistory}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="patientID"
          placeholder="Enter Patient ID"
          value={formData.patientID}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="medicine"
          placeholder="Enter Medicine Name"
          value={formData.medicine}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="dosage"
          placeholder="Enter Dosage (e.g., 1 tablet)"
          value={formData.dosage}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="number"
          name="tabletCount"
          placeholder="Number of Tablets"
          value={formData.tabletCount}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          className="input-field"
        />

        {/* Generate ZK Proof Button */}
        <button
          onClick={generateZKProof}
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md hover:bg-blue-700 transition"
        >
          Generate ZK Proof
        </button>

        {/* Display ZK Proof */}
        <p className="mt-3 text-sm text-gray-600">
          <strong>ZK Proof:</strong> <span className="text-blue-700 break-words">{formData.zkProof}</span>
        </p>
      </div>
    </div>
  );
};

export default DoctorDashboard;
