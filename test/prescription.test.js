const Prescription = artifacts.require("Prescription");

contract("Prescription", (accounts) => {
  let contract;
  const doctor = accounts[0];
  const pharmacy = accounts[1];
  const zkProofHash = web3.utils.sha3("Test Prescription");
  const expiryTimestamp = Math.floor(Date.now() / 1000) + 3600; // 1 hour later

  before(async () => {
    contract = await Prescription.deployed();
  });

  it("should issue a prescription", async () => {
    await contract.issuePrescription(zkProofHash, expiryTimestamp, { from: doctor });
    const result = await contract.isValidPrescription(zkProofHash);
    assert.equal(result, true, "Prescription should be valid");
  });

  it("should verify and use a prescription", async () => {
    await contract.verifyAndUsePrescription(zkProofHash, { from: pharmacy });
    const result = await contract.isValidPrescription(zkProofHash);
    assert.equal(result, false, "Prescription should be marked as used");
  });
});
