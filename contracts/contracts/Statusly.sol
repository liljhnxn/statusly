// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Statusly
 * @notice A lightweight decentralized status board where users can publish, update,
 *         and clear their status on-chain.
 */
contract Statusly {
    // Predefined status types
    enum StatusType {
        Available,  // 0
        Busy,       // 1
        Studying,   // 2
        Gaming,     // 3
        Away        // 4
    }

    struct StatusRecord {
        address user;
        StatusType statusType;
        string message;
        uint256 timestamp;
        bool isActive;
    }

    // Mapping from user address to their StatusRecord
    mapping(address => StatusRecord) private _statuses;

    // Array of addresses that currently have active statuses
    address[] private _activeUsers;

    // Mapping to store 1-based index of address in _activeUsers array (0 indicates not in array)
    mapping(address => uint256) private _userIndex;

    // Events
    event StatusUpdated(
        address indexed user,
        StatusType statusType,
        string message,
        uint256 timestamp
    );

    event StatusCleared(
        address indexed user,
        uint256 timestamp
    );

    /**
     * @notice Create or update caller's status.
     * @param statusType The status type (0: Available, 1: Busy, 2: Studying, 3: Gaming, 4: Away)
     * @param message Optional short message (max 100 characters)
     */
    function updateStatus(uint8 statusType, string calldata message) external {
        require(statusType <= uint8(StatusType.Away), "Invalid status type");
        require(bytes(message).length <= 100, "Message exceeds 100 characters");

        bool wasActive = _statuses[msg.sender].isActive;

        _statuses[msg.sender] = StatusRecord({
            user: msg.sender,
            statusType: StatusType(statusType),
            message: message,
            timestamp: block.timestamp,
            isActive: true
        });

        // Add to active users list if not already active
        if (!wasActive) {
            _activeUsers.push(msg.sender);
            _userIndex[msg.sender] = _activeUsers.length; // 1-based index
        }

        emit StatusUpdated(msg.sender, StatusType(statusType), message, block.timestamp);
    }

    /**
     * @notice Clear caller's active status.
     */
    function clearStatus() external {
        require(_statuses[msg.sender].isActive, "No active status");

        _statuses[msg.sender].isActive = false;

        // Efficient swap-and-pop removal from _activeUsers array
        uint256 index = _userIndex[msg.sender];
        if (index > 0) {
            uint256 lastIndex = _activeUsers.length;
            if (index != lastIndex) {
                address lastUser = _activeUsers[lastIndex - 1];
                _activeUsers[index - 1] = lastUser;
                _userIndex[lastUser] = index;
            }
            _activeUsers.pop();
            delete _userIndex[msg.sender];
        }

        emit StatusCleared(msg.sender, block.timestamp);
    }

    /**
     * @notice Retrieve status record for a given user.
     * @param user The address of the user.
     * @return The user's StatusRecord.
     */
    function getStatus(address user) external view returns (StatusRecord memory) {
        return _statuses[user];
    }

    /**
     * @notice Retrieve all active statuses.
     * @return An array of active StatusRecord items.
     */
    function getAllStatuses() external view returns (StatusRecord[] memory) {
        uint256 count = _activeUsers.length;
        StatusRecord[] memory activeStatuses = new StatusRecord[](count);

        for (uint256 i = 0; i < count; i++) {
            activeStatuses[i] = _statuses[_activeUsers[i]];
        }

        return activeStatuses;
    }

    /**
     * @notice Retrieve the count of active statuses.
     */
    function totalActiveStatuses() external view returns (uint256) {
        return _activeUsers.length;
    }
}

