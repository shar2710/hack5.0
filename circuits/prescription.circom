pragma circom 2.0;

template Prescription() {
    signal input doctorID;
    signal input patientID;
    signal input patientAge;
    signal input patientWeight;
    signal input medicine;
    signal input dosage;
    signal input tabletCount;
    signal input expiryDate;
    
    signal output zkProof;

    zkProof <== doctorID * patientID + patientAge + patientWeight + medicine + dosage + tabletCount + expiryDate;
}

component main = Prescription();
