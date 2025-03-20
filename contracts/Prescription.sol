// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Prescription {

    // Holds all relevant prescription data
    struct PrescriptionData {
        string doctorLicense;
        string patientName;
        uint patientAge;
        uint patientWeight;
        string medicalHistory;
        string patientID;
        string medicine;
        string dosage;
        uint tablets;
        string expiryDate;
        string datePrescribed;
        bool isDispensed;
    }

    // Maps a ZK proof (or unique ID string) to the PrescriptionData
    mapping(string => PrescriptionData) private prescriptions;

    /**
     * @dev Stores a new prescription by proof.
     * @param _proof The ZK Proof or unique prescription ID (string).
     * @param _data A struct containing all prescription details.
     *              The 'isDispensed' field will be overridden to false.
     */
    function storePrescription(string memory _proof, PrescriptionData memory _data) public {
        // Force the prescription to start as not dispensed
        _data.isDispensed = false;
        prescriptions[_proof] = _data;
    }

    /**
     * @dev Retrieves the prescription details by proof.
     * @param _proof The ZK Proof or unique prescription ID (string).
     */
    function getPrescription(string memory _proof)
        public
        view
        returns (
            string memory,
            string memory,
            uint,
            uint,
            string memory,
            string memory,
            string memory,
            string memory,
            uint,
            string memory,
            string memory,
            bool
        )
    {
        PrescriptionData memory p = prescriptions[_proof];
        return (
            p.doctorLicense,
            p.patientName,
            p.patientAge,
            p.patientWeight,
            p.medicalHistory,
            p.patientID,
            p.medicine,
            p.dosage,
            p.tablets,
            p.expiryDate,
            p.datePrescribed,
            p.isDispensed
        );
    }

    /**
     * @dev Marks a prescription as dispensed (pharmacist calls this).
     * @param _proof The ZK Proof or unique prescription ID (string).
     */
    function dispensePrescription(string memory _proof) public {
        prescriptions[_proof].isDispensed = true;
    }
}
