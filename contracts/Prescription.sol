// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Prescription {
    struct PrescriptionData {
        uint expiration;
        bool used;
    }

    mapping(bytes32 => PrescriptionData) public prescriptions;

    event PrescriptionIssued(bytes32 indexed zkProofHash, uint expiration);
    event PrescriptionVerified(bytes32 indexed zkProofHash, bool valid);

    function issuePrescription(bytes32 zkProofHash, uint expiration) public {
        require(expiration > block.timestamp, "Expiration must be in the future");
        prescriptions[zkProofHash] = PrescriptionData(expiration, false);
        emit PrescriptionIssued(zkProofHash, expiration);
    }

    function isValidPrescription(bytes32 zkProofHash) public view returns (bool) {
        PrescriptionData storage pres = prescriptions[zkProofHash];
        return (pres.expiration > block.timestamp && !pres.used);
    }

    function usePrescription(bytes32 zkProofHash) public {
        require(isValidPrescription(zkProofHash), "Prescription is invalid or expired");
        prescriptions[zkProofHash].used = true;
        emit PrescriptionVerified(zkProofHash, true);
    }
}
