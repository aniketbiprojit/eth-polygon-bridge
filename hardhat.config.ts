import * as dotenv from 'dotenv'

import { HardhatUserConfig, task } from 'hardhat/config'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'hardhat-gas-reporter'
import 'solidity-coverage'
import 'hardhat-deploy'
import { existsSync, readFileSync } from 'fs'

dotenv.config()

function getPrivateKey(): string[] {
	if (process.env.PRIVATE_KEY && existsSync(process.env.PRIVATE_KEY)) {
		return readFileSync(process.env.PRIVATE_KEY, 'utf8')
			.split('\n')
			.map((elem) => elem.trim())
			.filter(Boolean)
	}
	return []
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
	solidity: '0.8.4',
	networks: {
		hardhat: {
			companionNetworks: {
				l1: 'hardhat',
				l2: 'hardhat',
			},
		},
		goerli: {
			url: process.env.GOERLI_URL || '',
			accounts: getPrivateKey(),
			companionNetworks: {
				l1: 'goerli',
				l2: 'mumbai',
			},
		},
		mumbai: {
			url: process.env.MUMBAI_URL || '',
			accounts: getPrivateKey(),
			companionNetworks: {
				l1: 'goerli',
				l2: 'mumbai',
			},
		},
	},
	gasReporter: {
		enabled: process.env.REPORT_GAS !== undefined,
		currency: 'USD',
	},
	etherscan: {
		apiKey: process.env.ETHERSCAN_API_KEY,
	},
	namedAccounts: {
		deployer: {
			default: 0,
		},
	},
}

export default config
