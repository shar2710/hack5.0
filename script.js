// Handle tab switching
function switchTab(tabName) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`.tab[onclick="switchTab('${tabName}')"]`).classList.add('active');
}

let zkProof = ""; // Store the proof

// Doctor generates ZK Proof
function generateZKProof() {
    let doctorID = document.getElementById("doctorID").value;
    let medicine = document.getElementById("medicine").value;
    let dosage = document.getElementById("dosage").value;
    let tabletCount = document.getElementById("tabletCount").value;
    let expiryDate = document.getElementById("expiryDate").value;

    if (!doctorID || !medicine || !dosage || !tabletCount || !expiryDate) {
        alert("Please fill all required fields!");
        return;
    }

    tabletCount = parseInt(tabletCount); // Ensure it's a number

    // Generate a short 8-character ZK proof (randomized)
    zkProof = Math.random().toString(36).substr(2, 8).toUpperCase();

    // Store prescription details in session storage (temporary storage)
    sessionStorage.setItem("zkProof", zkProof);
    sessionStorage.setItem("doctorID", doctorID);
    sessionStorage.setItem("medicine", medicine);
    sessionStorage.setItem("dosage", dosage);
    sessionStorage.setItem("tabletCount", tabletCount);
    sessionStorage.setItem("expiryDate", expiryDate);
    sessionStorage.setItem("tabletsLeft", tabletCount); // Initially set to full count

    document.getElementById("zkProofDisplay").textContent = zkProof;
    document.getElementById("patientZKProof").textContent = zkProof;

    alert("ZK Proof Generated! Patient can now use it at a pharmacy.");
}

// Patient copies the ZK Proof
function copyProof() {
    navigator.clipboard.writeText(zkProof);
    alert("ZK Proof copied!");
}

// Pharmacy verifies the proof
function verifyProof() {
    let inputProof = document.getElementById("pharmacyInput").value;
    let storedProof = sessionStorage.getItem("zkProof");
    let tabletsLeft = parseInt(sessionStorage.getItem("tabletsLeft")) || 0;
    let expiryDate = new Date(sessionStorage.getItem("expiryDate"));
    let today = new Date();
    
    // ❌ Check if proof is missing or invalid
    if (!storedProof || inputProof !== storedProof) {
        document.getElementById("pharmacyResult").innerHTML = "❌ Medicine has already been dispensed!";
        return;
    }

    // ❌ Check if prescription has already been used
    if (tabletsLeft === 0) {
        document.getElementById("pharmacyResult").innerHTML = "❌ Medicines have already been dispensed. ZK Proof is expired!";
        return;
    }

    // ❌ Check if prescription is expired
    if (today > expiryDate) {
        document.getElementById("pharmacyResult").innerHTML = "❌ Prescription Expired!";
        return;
    }

    // 🟢 Dispense medicine (set remaining to 0 and remove proof)
    sessionStorage.setItem("tabletsLeft", 0);
    sessionStorage.removeItem("zkProof"); // Remove proof after first use

    let doctorID = sessionStorage.getItem("doctorID");
    let medicine = sessionStorage.getItem("medicine");
    let dosage = sessionStorage.getItem("dosage");
    let totalTablets = sessionStorage.getItem("tabletCount");

    document.getElementById("pharmacyResult").innerHTML = 
        `✅ Valid Prescription!<br>
         <strong>Doctor License Number:</strong> ${doctorID}<br>
         <strong>Medicine:</strong> ${medicine}<br>
         <strong>Dosage:</strong> ${dosage}<br>
         <strong>Total Tablets:</strong> ${totalTablets}<br>
         🏥 Medicine has been dispensed.`;
}
