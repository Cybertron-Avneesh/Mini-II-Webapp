// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.11;

import 'hardhat/console.sol';

contract EvidenceContract {
    struct station {
        string name;
        string location;
    }

    struct Evidence {
        string Title;
        string id;
    }

    struct Fir {
        string Title;
        string Description;
        uint256 time;
        uint256 stationid;
        address creator;
        uint256[] evidences_arr;
    }

    address public administrator;
    mapping(address => uint256) public police_men;
    mapping(uint256 => Evidence) public evidences;
    mapping(uint256 => Fir) public Firs;
    station[] public stations;
    uint256 public numEvidence;
    uint256 public numFir;

    modifier restricted() {
        require(msg.sender == administrator);
        _;
    }

    constructor() {
        administrator = msg.sender;
        numFir = 0;
        numEvidence = 0;
    }

    // DONE
    function createPolice(address police_address) public restricted {
        police_men[police_address] = 1;
        console.log('Access given to:', police_address);
    }

    // DONE
    function revokeAccess(address police_address) public restricted {
        police_men[police_address] = 0;
        console.log('Access revoked for:', police_address);
    }

    // DONE
    function isAuthorised(address police_address) public view returns (bool) {
        return police_men[police_address] == 1;
    }

    // DONE
    function createFir(
        string memory Title,
        string memory Description,
        uint256 time,
        uint256 stationid
    ) public {
        require(police_men[msg.sender] == 1, 'Must be a authorised police man');
        Fir memory tmp;
        tmp.creator = msg.sender;
        tmp.Title = Title;
        tmp.Description = Description;
        tmp.stationid = stationid;
        tmp.time = time;
        Firs[numFir++] = tmp;
        console.log('FIR created with ID: ', numFir - 1);
    }

    // DONE
    function createEvidence(
        string memory id,
        string memory Title,
        uint256 FirID
    ) public {
        require(Firs[FirID].time != 0, 'FIRID must already exist.');
        Evidence storage newEvidence = evidences[numEvidence++];
        newEvidence.id = id;
        newEvidence.Title = Title;
        Firs[FirID].evidences_arr.push(numEvidence - 1);
    }

    // DONE
    function createStation(string memory name, string memory location)
        public
        restricted
    {
        stations.push(station(name, location));
        console.log('New Station created.');
    }

    // DONE
    function getAllStations() public view returns (station[] memory) {
        return stations;
    }

    // DONE
    function getAllFirs() public view returns (Fir[] memory) {
        Fir[] memory res = new Fir[](numFir);
        for (uint256 i = 0; i < numFir; i++) {
            res[i] = Firs[i];
        }
        return res;
    }

    function getFir(uint256 firid) public view returns (Fir memory) {
        return Firs[firid];
    }
}
