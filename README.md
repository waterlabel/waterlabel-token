# waterlabel-token
WaterLabel(Label) is an ERC-20 compatible token. It implements governance-inspired features with openzeppelin's ERC20Snapshot.

## Setup
- Create an file named `.env` and fill the enviroment variables

```
# Secret key for deploying contracts

ADMIN=

ETHERSCAN_API_KEY=

```
- Install dependencies with `yarn` or `npm`

## Deployment
You can deploy WaterlabelToken to the networks via the following command:

- When you deploy main net
```bash
yarn verify:mainnet

```

- When you deploy Test net
```bash
yarn verify:testnet
```

