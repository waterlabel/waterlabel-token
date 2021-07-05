import { BigNumber } from "ethers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { WaterLabelToken } from '../typechain'
import { access } from "fs";

const TOTAL_SUPPLY = '100000000'

describe("LABEL token", function () {
    context('Deployed', async () => {
        it('Checks initial configuration', async () => {
            const [deployer, account] = await ethers.getSigners();
            const WaterLabelToken = await ethers.getContractFactory("WaterlabelToken");
            const waterLabelToken = await WaterLabelToken.deploy();

            await waterLabelToken.deployed();
            expect(await waterLabelToken.name()).to.be.eq('LABEL Token')
            expect(await waterLabelToken.symbol()).to.eq('LABEL')
            const totalSupply = await waterLabelToken.totalSupply() as BigNumber
            expect(totalSupply.eq(ethers.utils.parseEther(TOTAL_SUPPLY))).to.be.true
            const deployerBalance = await waterLabelToken.balanceOf(deployer.address) as BigNumber
            expect(deployerBalance.eq(ethers.utils.parseEther(TOTAL_SUPPLY))).to.be.true
        });
    })

    context('Init migration', async () => {
        let waterLabelToken: WaterLabelToken
        let newWaterLabelToken: WaterLabelToken
        const [deployer, account] = await ethers.getSigners();
        beforeEach('Deploy Waterlabel token', async () => {
            const WaterLabelToken = await ethers.getContractFactory("WaterlabelToken");
            waterLabelToken = (await WaterLabelToken.deploy()) as WaterLabelToken;

            newWaterLabelToken = (await WaterLabelToken.deploy()) as WaterLabelToken;
        })

        it('Reverts if non-admin account initialize migration', async () => {
            await expect(waterLabelToken.connect(account).initMigration(newWaterLabelToken.address)).to.be.reverted
        })

        it('Updates the newWaterLabelToken address', async () => {
            await waterLabelToken.connect(deployer).initMigration(newWaterLabelToken.address)
            expect(await waterLabelToken.newWaterLabelToken()).to.be.equal(newWaterLabelToken.address)
        })

        it('Reverts after the newWaterLabelToken has been updated', async () => {
            await waterLabelToken.connect(deployer).initMigration(newWaterLabelToken.address)
            expect(await waterLabelToken.connect(deployer).initMigration(newWaterLabelToken.address)).to.be.reverted
        })
    })

    context('Migrate', async () => {
        let waterLabelToken: WaterLabelToken
        let newWaterLabelToken: WaterLabelToken
        const [deployer, account] = await ethers.getSigners();

        beforeEach('Deploy Waterlabel token and init migration', async () => {
            const WaterLabelToken = await ethers.getContractFactory("WaterLabelToken");
            waterLabelToken = (await WaterLabelToken.deploy()) as WaterLabelToken;
            newWaterLabelToken = (await WaterLabelToken.deploy()) as WaterLabelToken;
            await waterLabelToken.connect(deployer).initMigration(newWaterLabelToken.address)
        })

        it('Reverts if the user balance is 0', async () => {
            await expect(waterLabelToken.connect(account).migrate()).to.be.reverted
        })

        it('Transfer the new waterlabel tokens and burn old waterlabel tokens', async () => {
            await waterLabelToken.connect(deployer).transfer(account.address, ethers.utils.parseEther("100"))
            await waterLabelToken.connect(account).migrate()
            expect(await newWaterLabelToken.balanceOf(account.address)).to.be.equal(ethers.utils.parseEther("100"))
            expect(await waterLabelToken.balanceOf(account.address)).to.be.equal(0)
        })
    })
});
