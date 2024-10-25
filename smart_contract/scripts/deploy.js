const hre = require('hardhat');

async function main() {
    
    const FreelanceChain = await hre.ethers.getContractFactory("FreelanceChain");
    const freelanceChain = await FreelanceChain.deploy();
    await freelanceChain.waitForDeployment();
    const contractAddress = await freelanceChain.getAddress();
    console.log("FreelanceChain deployed to", contractAddress);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    })