import { DeployFunction } from 'hardhat-deploy/dist/types'

const func: DeployFunction = async (hre) => {
	const { deployments, getNamedAccounts } = hre
	const { deploy, execute, read } = deployments
	const { deployer } = await getNamedAccounts()

	const FxChildAddress = (await deployments.get('FxChild')).address

	await deploy('L2Tunnel', {
		from: deployer,
		log: true,
		skipIfAlreadyDeployed: true,
		args: [FxChildAddress],
	})

	const L1TunnelAddress = await hre.companionNetworks['l1'].deployments.get(
		'L1Tunnel'
	)

	if ((await read('L1Tunnel', 'fxRootTunnel')) !== L1TunnelAddress)
		await execute(
			'L2Tunnel',
			{ from: deployer, log: true },
			'setFxRootTunnel',
			L1TunnelAddress.address
		)

	const L2TunnelAddress = (await deployments.get('L2Tunnel')).address
	if (
		(await await hre.companionNetworks['l1'].deployments.read(
			'L1Tunnel',
			'fxChildTunnel'
		)) !== L2TunnelAddress
	)
		await hre.companionNetworks['l1'].deployments.execute(
			'L1Tunnel',
			{
				from: deployer,
				log: true,
			},
			'setFxChildTunnel',
			L2TunnelAddress
		)
}

export default func
func.dependencies = []
func.tags = ['L2Tunnel']
