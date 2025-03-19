document.addEventListener("DOMContentLoaded", function () {
    // Login form handling
    const loginForm = document.getElementById("login-form");
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get("role");

    if (role) {
        document.getElementById("login-title").innerText = `Login as ${role.charAt(0).toUpperCase() + role.slice(1)}`;
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Simple authentication logic (Replace with actual backend logic)
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username && password) {
                if (role === "doctor") {
                    window.location.href = "doctors.html";
                } else if (role === "patient") {
                    window.location.href = "patients.html";
                } else if (role === "pharmacist") {
                    window.location.href = "pharmacist.html";
                } else {
                    alert("Invalid Role! Please go back and select a role.");
                }
            } else {
                alert("Please enter valid credentials.");
            }
        });
    }

    // ZK Proof generation
    const generateZKProofButton = document.getElementById("generateZKProof");
    const zkProofDisplay = document.getElementById("zkProofDisplay");

    // Ensure the button exists before adding event listener
    if (generateZKProofButton) {
        generateZKProofButton.addEventListener("click", function () {
            const doctorID = document.getElementById("doctorID").value;
            const patientName = document.getElementById("patientName").value;
            const patientAge = document.getElementById("patientAge").value;
            const patientWeight = document.getElementById("patientWeight").value;
            const medicalHistory = document.getElementById("medicalHistory").value;
            const patientID = document.getElementById("patientID").value;
            const medicine = document.getElementById("medicine").value;
            const dosage = document.getElementById("dosage").value;
            const tabletCount = document.getElementById("tabletCount").value;
            const expiryDate = document.getElementById("expiryDate").value;

            // Validate fields before generating ZK Proof
            if (!doctorID || !patientName || !patientAge || !patientWeight || !medicine || !dosage || !tabletCount || !expiryDate) {
                alert("Please fill in all fields.");
                return;
            }

            // Generate ZK Proof (short 8 characters proof)
            let zkProof = Math.random().toString(36).substring(2, 10).toUpperCase();

            // Display the generated ZK proof
            zkProofDisplay.textContent = zkProof;
            console.log("Generated ZK Proof:", zkProof); // For debugging
        });
    }
});
