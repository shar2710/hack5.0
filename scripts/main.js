// // scripts/main.js
// const Web3 = require("web3"); // Use require instead of import

// const web3 = new Web3("http://localhost:8545"); // Example usage


// // 1. Put your actual ABI here (from build/contracts/Prescription.json).
// //    It's an array of objects describing each function/event in the contract.
// const prescriptionABI = [
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "_proof",
//           "type": "string"
//         },
//         {
//           "components": [
//             {
//               "internalType": "string",
//               "name": "doctorLicense",
//               "type": "string"
//             },
//             {
//               "internalType": "string",
//               "name": "patientName",
//               "type": "string"
//             },
//             {
//               "internalType": "uint256",
//               "name": "patientAge",
//               "type": "uint256"
//             },
//             {
//               "internalType": "uint256",
//               "name": "patientWeight",
//               "type": "uint256"
//             },
//             {
//               "internalType": "string",
//               "name": "medicalHistory",
//               "type": "string"
//             },
//             {
//               "internalType": "string",
//               "name": "patientID",
//               "type": "string"
//             },
//             {
//               "internalType": "string",
//               "name": "medicine",
//               "type": "string"
//             },
//             {
//               "internalType": "string",
//               "name": "dosage",
//               "type": "string"
//             },
//             {
//               "internalType": "uint256",
//               "name": "tablets",
//               "type": "uint256"
//             },
//             {
//               "internalType": "string",
//               "name": "expiryDate",
//               "type": "string"
//             },
//             {
//               "internalType": "string",
//               "name": "datePrescribed",
//               "type": "string"
//             },
//             {
//               "internalType": "bool",
//               "name": "isDispensed",
//               "type": "bool"
//             }
//           ],
//           "internalType": "struct Prescription.PrescriptionData",
//           "name": "_data",
//           "type": "tuple"
//         }
//       ],
//       "name": "storePrescription",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "_proof",
//           "type": "string"
//         }
//       ],
//       "name": "getPrescription",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         },
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         },
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         },
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         },
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         },
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function",
//       "constant": true
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "_proof",
//           "type": "string"
//         }
//       ],
//       "name": "dispensePrescription",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     }
//   ];
  
//   // 2. Your deployed contract address on Ganache
//   const prescriptionAddress = "0xa5158f247B8316d1C1a637BedDE1A412A25CCA36";
  
//   // 3. A reference to our contract (set once we initialize Web3)
//   let prescriptionContract;
  
//   // 4. Current account (doctor/pharmacist) from MetaMask
//   let currentAccount = null;
  
//   async function connectWeb3() {
//     // Check if MetaMask (window.ethereum) is available
//     if (typeof window.ethereum === "undefined") {
//       alert("MetaMask is not installed. Please install it to interact with the blockchain.");
//       return;
//     }
  
//     // Request account access
//     const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
//     currentAccount = accounts[0];
//     console.log("Connected account:", currentAccount);
  
//     // Create a Web3 instance
//     window.web3 = new Web3(window.ethereum);
  
//     // Create a contract instance
//     prescriptionContract = new web3.eth.Contract(prescriptionABI, prescriptionAddress);
//     console.log("Contract instance created:", prescriptionContract);
//   }
  
//   // This function stores the prescription on-chain
//   async function storePrescriptionOnChain(zkProof) {
//     if (!prescriptionContract || !currentAccount) {
//       alert("Web3 is not initialized. Please connect MetaMask first.");
//       return;
//     }
  
//     // Gather form data
//     const doctorID = document.getElementById("doctorID").value;
//     const patientName = document.getElementById("patientName").value;
//     const patientAge = parseInt(document.getElementById("patientAge").value, 10);
//     const patientWeight = parseInt(document.getElementById("patientWeight").value, 10);
//     const medicalHistory = document.getElementById("medicalHistory").value;
//     const patientID = document.getElementById("patientID").value;
//     const medicine = document.getElementById("medicine").value;
//     const dosage = document.getElementById("dosage").value;
//     const tabletCount = parseInt(document.getElementById("tabletCount").value, 10);
//     const expiryDate = document.getElementById("expiryDate").value;
//     const datePrescribed = new Date().toLocaleDateString(); // or toISOString()
  
//     /*
// struct PrescriptionData {
//     string doctorLicense;
//     string patientName;
//     uint patientAge;
//     uint patientWeight;
//     string medicalHistory;
//     string patientID;
//     string medicine;
//     string dosage;
//     uint tablets;
//     string expiryDate;
//     string datePrescribed;
//     bool isDispensed;
// }
// */


//     const prescriptionData = [
//       doctorID,
//       patientName,
//       patientAge,
//       patientWeight,
//       medicalHistory,
//       patientID,
//       medicine,
//       dosage,
//       tabletCount,
//       expiryDate,
//       datePrescribed,
//       false // isDispensed will be forced to false in the contract anyway
//     ];
  
//     try {
//       // Call storePrescription(proof, PrescriptionData)
//       const txReceipt = await prescriptionContract.methods
//         .storePrescription(zkProof, prescriptionData)
//         .send({ from: currentAccount });
  
//       console.log("Prescription stored on-chain:", txReceipt);
//       alert("Prescription stored on the blockchain!");
//     } catch (err) {
//       console.error("Error storing prescription on-chain:", err);
//       alert("Failed to store prescription on-chain.");
//     }
//   }
  
//   document.addEventListener("DOMContentLoaded", async function () {
//     // Try to connect to Web3 immediately (optional)
//     await connectWeb3();
  
//     // ===================
//     // Existing login form logic
//     // ===================
//     document.addEventListener("DOMContentLoaded", async function () {
//         await connectWeb3();
      
//         const loginForm = document.getElementById("login-form");
//         const loginTitle = document.getElementById("login-title");
      
//         // Get role from URL or form
//         const urlParams = new URLSearchParams(window.location.search);
//         let role = urlParams.get("role") || ""; // Default to empty string if not found
      
//         if (role) {
//           role = role.toLowerCase(); // Normalize case
//           if (loginTitle) {
//             loginTitle.innerText = `Login as ${role.charAt(0).toUpperCase() + role.slice(1)}`;
//           }
//         } else {
//           alert("Role is missing! Please select your role before logging in.");
//         }
      
//         if (loginForm) {
//             loginForm.addEventListener("submit", function (event) {
//                 event.preventDefault();
//                 const username = document.getElementById("username").value.trim();
//                 const password = document.getElementById("password").value.trim();
        
//                 if (!username || !password) {
//                     alert("Please enter valid credentials.");
//                     return;
//                 }
        
//                 // Ensure valid roles are checked
//                 const validRoles = ["doctor", "patient", "pharmacist"];
//                 if (!validRoles.includes(role)) {
//                     alert("Invalid role selected.");
//                     return;
//                 }
        
//                 // Simulating authentication (Replace with real authentication logic)
//                 alert(`Login successful as ${role}`);
                
//                 // Redirect to the respective dashboard
//                 window.location.href = `${role}-dashboard.html`; // Ensure the page exists
//             });
//         }
        
//       });
      
  
//     // ===================
//     // ZK Proof generation logic
//     // ===================
//     const generateZKProofButton = document.getElementById("generateZKProof");
//     const zkProofDisplay = document.getElementById("zkProofDisplay");
  
//     if (generateZKProofButton) {
//       generateZKProofButton.addEventListener("click", async function () {
//         const doctorID = document.getElementById("doctorID").value;
//         const patientName = document.getElementById("patientName").value;
//         const patientAge = document.getElementById("patientAge").value;
//         const patientWeight = document.getElementById("patientWeight").value;
//         const medicalHistory = document.getElementById("medicalHistory").value;
//         const patientID = document.getElementById("patientID").value;
//         const medicine = document.getElementById("medicine").value;
//         const dosage = document.getElementById("dosage").value;
//         const tabletCount = document.getElementById("tabletCount").value;
//         const expiryDate = document.getElementById("expiryDate").value;
  
//         // Basic validation
//         if (
//           !doctorID ||
//           !patientName ||
//           !patientAge ||
//           !patientWeight ||
//           !medicine ||
//           !dosage ||
//           !tabletCount ||
//           !expiryDate
//         ) {
//           alert("Please fill in all fields before generating a ZK Proof.");
//           return;
//         }
  
//         // Generate a random 8-character proof
//         const zkProof = Math.random().toString(36).substring(2, 10).toUpperCase();
//         zkProofDisplay.textContent = zkProof;
//         console.log("Generated ZK Proof:", zkProof);
  
//         // Now store the prescription on-chain with this proof
//         await storePrescriptionOnChain(zkProof);
//       });
//     }
//   });
  