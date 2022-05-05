import { DeployFunction } from 'hardhat-deploy/dist/types'

const func: DeployFunction = async (hre) => {
	const { deployments, getNamedAccounts } = hre
	const { deploy } = deployments
	const { deployer } = await getNamedAccounts()

	const FxChildAddress = (await deployments.get('FxChild')).address

	await deploy('L2Tunnel', {
		from: deployer,
		log: true,
		skipIfAlreadyDeployed: true,
		args: [FxChildAddress],
	})
}

export default func
func.dependencies = []
func.tags = ['L2Tunnel']
