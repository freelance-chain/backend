pragma solidity ^0.8.24;

contract FreelanceChain {
    enum JobStatus { Pending, Active, Completed, Approved, Finished }

    struct Job {
        string id;
        address payable employer;
        address payable employee;
        uint price;
        bool isCompleted;
        bool isCancelled;
        uint256 timestamp;
        JobStatus status;
    }

    struct RequestJob {
        string id;
        address payable employer;
        address payable employee;
        uint price;
    }

    event NewJob (
        string indexed id,
        address payable employer,
        address payable employee,
        uint price,
        uint256 timestamp,
        JobStatus status
    );

    address payable owner;
    mapping(string => Job) public jobs;
    mapping(string => bool) public jobExists;
    string[] public jobIds;

    constructor() {
        owner = payable(msg.sender);
    }

    function newJob(string memory id, RequestJob memory jobData) public payable {
        require(msg.value > 0 , "Cant create a job with 0 eth");
        require(!jobExists[id], "Job with this ID already exists");
        
        jobs[id] = Job(
            {                
            id: id,
            employer: payable(msg.sender),
            employee: jobData.employee,
            price: msg.value,
            isCompleted: false,
            isCancelled: false,
            timestamp: block.timestamp,
            status: JobStatus.Active
            }
        );

        jobExists[id] = true;
        jobIds.push(id);

        emit NewJob(jobData.id,jobData.employer,jobData.employee, jobData.price, block.timestamp, JobStatus.Active);
    }

    function getJobs() public view returns(Job[] memory){
        Job[] memory allJobs = new Job[](jobIds.length);

        for (uint i = 0; i < jobIds.length; i++) {
            allJobs[i] = jobs[jobIds[i]]; 
        }

        return allJobs;
    }

    function getJob(string memory id) public view returns (Job memory) {
        require(jobExists[id], "Job does not exist");
        return jobs[id];
    }

    function completeJob(string memory id) public {
        require(jobExists[id], "Job does not exist");
        require(jobs[id].employee == msg.sender, "Only the assigned employee can complete the job");

        jobs[id].isCompleted = true;
        jobs[id].status = JobStatus.Completed;
    }

    function approveJob(string memory id ) public {
        require(jobExists[id], "Job does not exist");
        require(jobs[id].employer == msg.sender, "Only the assigned employer can approve the job");

        jobs[id].status = JobStatus.Approved;

        jobs[id].employee.transfer(jobs[id].price);

    }
}
