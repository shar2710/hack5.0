// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Prescription {
    struct PrescriptionData {
        address doctor;
        bytes32 zkProofHash;
        uint256 expiryTimestamp;
        bool isUsed;
    }

    mapping(bytes32 => PrescriptionData) public prescriptions;

    event PrescriptionIssued(address indexed doctor, bytes32 zkProofHash, uint256 expiryTimestamp);
    event PrescriptionUsed(bytes32 zkProofHash, address indexed pharmacy);

    // ✅ Issue a new prescription
    function issuePrescription(bytes32 _zkProofHash, uint256 _expiryTimestamp) external {
        require(_expiryTimestamp > block.timestamp, "Expiry date must be in the future");
        require(prescriptions[_zkProofHash].doctor == address(0), "Prescription already exists");

        prescriptions[_zkProofHash] = PrescriptionData({
            doctor: msg.sender,
            zkProofHash: _zkProofHash,
            expiryTimestamp: _expiryTimestamp,
            isUsed: false
        });

        emit PrescriptionIssued(msg.sender, _zkProofHash, _expiryTimestamp);
    }

    // ✅ Verify and use prescription
    function verifyAndUsePrescription(bytes32 _zkProofHash) external {
        PrescriptionData storage prescription = prescriptions[_zkProofHash];

        require(prescription.doctor != address(0), "Prescription does not exist");
        require(!prescription.isUsed, "Prescription already used");
        require(block.timestamp <= prescription.expiryTimestamp, "Prescription has expired");

        prescription.isUsed = true; // Mark as used

        emit PrescriptionUsed(_zkProofHash, msg.sender);
    }

    // ✅ Check if a prescription is valid (for frontend)
    function isValidPrescription(bytes32 _zkProofHash) external view returns (bool) {
        PrescriptionData memory prescription = prescriptions[_zkProofHash];

        return (prescription.doctor != address(0) &&
                !prescription.isUsed &&
                block.timestamp <= prescription.expiryTimestamp);
    }
}
