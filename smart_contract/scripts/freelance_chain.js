const hre = require('hardhat')

async function getJobs(jobs) {
    for (const job of jobs) {
        console.log(job);

    }
}

async function getBalance(address) {
    const balanceBigInt = await hre.ethers.provider.getBalance(address);

    return hre.ethers.formatEther(balanceBigInt)
}

async function printBalance(addresses) {
    let idx = 0;
    for (const address of addresses) {
        console.log(`Address ${idx} balance:`, await getBalance(address));
        idx++;
    }
}

async function main() {
    const [owner, employer, employee] = await hre.ethers.getSigners();

    const FreelanceChain = await hre.ethers.getContractFactory("FreelanceChain");
    const freelanceChain = await FreelanceChain.deploy();
    await freelanceChain.waitForDeployment();
    const contractAddress = await freelanceChain.getAddress();
    console.log("FreelanceChain deployed to", contractAddress);

    const addresses = [owner.address, employer.address, employee.address];
    console.log("== start ==");
    await printBalance(addresses)

    console.log("== new job ==");
    const price = hre.ethers.parseEther("1");
    const jobData = {
        id: "jobId",
        employer: employer,
        employee: employee,
        price: price
    }
    await freelanceChain.connect(employer).newJob("jobId", jobData, { value: price });
    await printBalance(addresses)
    // log jobs

    console.log("== jobs ==");
    const jobs = await freelanceChain.getJobs();
    console.log(jobs);
    getJobs(jobs)
}

main();