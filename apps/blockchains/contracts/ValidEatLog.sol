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

    function getLogs() public view returns(Log[] memory){
        return logs;
    }

}