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

    function createRecord(
        bytes32 combinatedFilesHash,
        string memory description,
        string memory authorName,
        string memory authorEmail
    ) public {
        require(combinatedFilesHash != 0, "Invalid SHA256 hash");
        require(bytes(description).length <= 140, "Description exceeds max length");
        require(bytes(authorName).length <= 50, "Author name exceeds max length");
        require(bytes(authorEmail).length <= 50, "Author email exceeds max length");
        require(hashRecordMap[combinatedFilesHash] == 0, "Hash already exists");

        uint256 timestamp = block.timestamp;
        uint256 recordsSize = _records.length;

        Record memory newRecord = Record({
            owner: msg.sender,
            sha256Hash: combinatedFilesHash,
            description: description,
            authorName: authorName,
            authorEmail: authorEmail,
            blockTimestamp: timestamp
        });

        _records.push(newRecord);

        ownerRecordsMap[msg.sender].push(recordsSize);
        hashRecordMap[combinatedFilesHash] = recordsSize;

        emit NewRegistration(
            msg.sender,
            combinatedFilesHash,
            description,
            timestamp
        );
    }

    function getRecordsByOwner(
        address ownerAddress
    ) public view returns (Record[] memory) {
        uint256[] memory recordIndexes = ownerRecordsMap[ownerAddress];
        Record[] memory records = new Record[](recordIndexes.length);

        for (uint256 i = 0; i < recordIndexes.length; i++) {
            uint256 recordIndex = recordIndexes[i];
            records[i] = _records[recordIndex];
        }

        return records;
    }

    function getRecordByHash(
        bytes32 sha256Hash
    ) public view returns (Record memory) {
        uint256 recordIndex = hashRecordMap[sha256Hash];
        require(recordIndex > 0, "Record not found for the given hash");

        return _records[recordIndex - 1];
    }
}
