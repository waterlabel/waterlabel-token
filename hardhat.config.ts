import 'dotenv/config';
import '@typechain/hardhat'
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-deploy';

import { HardhatUserConfig } from 'hardhat/types';

const config: HardhatUserConfig = {
    solidity: '0.8.4',
    namedAccounts: {
        deployer: 0,
    },
    // networks: {
    //   binanceTestnet: {
    //     url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    //     chainId: 97,
    //     gasPrice: 20000000000,
    //     accounts: [process.env.ADMIN || ''],
    //   },
    //   binanceMainnet: {
    //     url: 'https://bsc-dataseed.binance.org/',
    //     chainId: 56,
    //     gasPrice: 20000000000,
    //     accounts: [process.env.ADMIN || ''],
    //   },
    //   kovan: {
    //     url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
    //     chainId: 42,
    //     gasPrice: 20000000000,
    //     accounts: [process.env.ADMIN || ''],
    //   },
    paths: {
        sources: './contracts',
        tests: './test',
        cache: './cache',
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY || '',
    },
};

export default config;
