// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


contract ValidEatLog {

    struct Log {
        string message;
        uint256 timestamp;
    }

    Log[] private logs;

    function addLog(string memory message) public {

        logs.push(
            Log(
                message,
                block.timestamp
            )
        );

    }

    function getLogs() public view returns(
        string[] memory messages,
        uint256[] memory timestamps
    ) {
        messages = new string[](logs.length);
        timestamps = new uint256[](logs.length);

        for(uint i = 0; i < logs.length; i++) {

            messages[i] = logs[i].message;
            timestamps[i] = logs[i].timestamp;

        }
    }

}