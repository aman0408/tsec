pragma solidity >=0.4.21 <0.6.0;

contract HRProcess{
    struct User {
        uint id;
        string firstName;
        // string emailID;
        // string url;
        // string phoneNumber;
    }

    mapping(address => bool) public uploadedJobSeekers;

    mapping(uint => User) public allJobSeekers;

    uint public seekerCount;

    event uploadedResume(
        uint indexed _seekerId
    );

    constructor() public{
        addSeeker("Seeker 1");
        addSeeker("Seeker 2");
    }

    function addSeeker(string memory _seekerName) private{
        seekerCount++;
        allJobSeekers[seekerCount]=User(seekerCount,_seekerName);
    }

    function upload(uint _seekerId) public {
        require(!uploadedJobSeekers[msg.sender]);

        require(_seekerId > 0 && _seekerId <= seekerCount);

        uploadedJobSeekers[msg.sender] = true;

        emit uploadedResume(_seekerId);

    }
}
  