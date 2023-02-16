const hre = require("hardhat");

async function main() {
    const productbookingFact = await hre.ethers.getContractFactory(
      "ProductBooking"
    );
    const Contract = await productbookingFact.deploy();
    await Contract.deployed();
    console.log("Contract deployed to :",Contract.address);

}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });