pragma solidity ^0.5.15;

contract VotingSystem {
    struct Candidate {
        uint identifier;
        string fullName;
        string politicalParty; 
        uint voteTally;
    }

    mapping (uint => Candidate) public nominees;
    mapping (address => bool) public voters;

    uint public totalCandidates;
    uint256 public endVotingPeriod;
    uint256 public startVotingPeriod;

    function enlistCandidate(string memory name, string memory party) public returns(uint) {
        totalCandidates++;
        nominees[totalCandidates] = Candidate(totalCandidates, name, party, 0);
        return totalCandidates;
    }

    function getCandidateDetails(uint candidateID) public view returns (uint, string memory, string memory, uint) {
        return (candidateID, nominees[candidateID].fullName, nominees[candidateID].politicalParty, nominees[candidateID].voteTally);
    }

    function getCandidatesCount() public view returns(uint) {
        return totalCandidates;
    }

    function castVote(uint candidateID) public {
        require((startVotingPeriod <= now) && (endVotingPeriod > now), "Voting is inactive.");
        require(candidateID > 0 && candidateID <= totalCandidates, "Invalid candidate ID.");
        require(!voters[msg.sender], "You have already voted.");

        voters[msg.sender] = true;
        nominees[candidateID].voteTally++;
    }

    function hasVoted() public view returns(bool) {
        return voters[msg.sender];
    }

    function setVotingDates(uint256 _startDate, uint256 _endDate) public {
        require((endVotingPeriod == 0) && (startVotingPeriod == 0) && (_startDate + 1000000 > now) && (_endDate > _startDate), "Invalid date settings.");
        endVotingPeriod = _endDate;
        startVotingPeriod = _startDate;
    }

    function getVotingDates() public view returns (uint256, uint256) {
        return (startVotingPeriod, endVotingPeriod);
    }
}
