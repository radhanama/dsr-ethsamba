pragma solidity >=0.8.2 <0.9.0;

contract SoftwareRegistry {
    struct Record {
        address owner;
        bytes32 sha256Hash;
        string description;
        string authorName;
        string authorEmail;
        uint256 blockTimestamp;
    }

    Record[] _records;
    mapping(address => uint256[]) ownerRecordsMap;
    mapping(bytes32 => uint256) hashRecordMap;

    event NewRegistration(
        address indexed _owner,
        bytes32 _hash,
        string _description,
        uint256 _timestamp
    );

}
