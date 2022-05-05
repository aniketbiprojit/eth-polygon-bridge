import { DeployFunction } from 'hardhat-deploy/dist/types'

const func: DeployFunction = async (hre) => {
	const { deployments, getNamedAccounts } = hre
	const { deploy, execute } = deployments
	const { deployer } = await getNamedAccounts()

	const CheckpointManagerAddress = (
		await deployments.get('CheckpointManager')
	).address

	const FxRootAddress = (await deployments.get('FxRoot')).address

	await deploy('L1Tunnel', {
		from: deployer,
		log: true,
		skipIfAlreadyDeployed: true,
		args: [CheckpointManagerAddress, FxRootAddress],
	})
}

export default func
func.dependencies = []
func.tags = ['L1Tunnel']
