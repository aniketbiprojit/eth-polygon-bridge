// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import 'fx-portal/contracts/tunnel/FxBaseChildTunnel.sol';

contract L2Tunnel is FxBaseChildTunnel {
	constructor(address _fxChild) FxBaseChildTunnel(_fxChild) {}

	function _processMessageFromRoot(
		uint256 stateId,
		address sender,
		bytes memory message
	) internal override {
		emit Received(stateId, sender, message);
	}

	uint256 _nonce = 0;
	struct Encoded {
		uint256 nonce;
		address from;
	}

	function sendMessageToRoot(bytes memory message) public {
		_sendMessageToRoot(message);
	}

	function sendEncodedMessageToRoot() public {
		_nonce += 1;
		bytes memory message = abi.encode(Encoded(_nonce, msg.sender));
		_sendMessageToRoot(message);
	}

	function sendEncodedBytesMessageToRoot() public {
		_nonce += 1;
		bytes memory message = abi.encode(
			abi.encode(Encoded(_nonce, msg.sender))
		);

		_sendMessageToRoot(message);
	}

	event Received(uint256 stateId, address sender, bytes message);
}
