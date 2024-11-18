// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract MyTest {
    uint256 public unlockedTime;
    address payable public owner;

    event Withdrawal(uint256 amount, uint256 time);

    constructor(uint256 _unlockedTime) payable {
        require(
            block.timestamp < _unlockedTime,
            "The unlocked time has not passed yet"
        );

        unlockedTime = _unlockedTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        require(
            block.timestamp >= unlockedTime,
            "The unlocked time has not passed yet"
        );
        require(msg.sender == owner, "Only the owner can withdraw");
        emit Withdrawal(address(this).balance, block.timestamp);
        owner.transfer(address(this).balance);
    }
}
