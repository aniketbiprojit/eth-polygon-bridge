// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import 'fx-portal/contracts/tunnel/FxBaseRootTunnel.sol';

contract L1Tunnel is FxBaseRootTunnel {
	constructor(address _checkpointManager, address _fxRoot)
		FxBaseRootTunnel(_checkpointManager, _fxRoot)
	{}

	uint256 private _nonce;

	function _processMessageFromChild(bytes memory message)
		internal
		virtual
		override
	{
		_nonce += 1;
		emit Received(message, _nonce);
	}

	function sendMessageToChild(bytes memory encodedData) public {
		_sendMessageToChild(encodedData);
	}

	event Received(bytes message, uint256 _nonce);
}
