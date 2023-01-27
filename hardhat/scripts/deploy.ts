import { ethers } from "hardhat";

const hre = require('hardhat')
const { items } = require("../src/items.json")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ethers')
}

async function main() {
  const [deployer] = await ethers.getSigners()
  const Libro = await hre.ethers.getContractFactory('Libro')
  const libro = await Libro.deploy()
  await libro.deployed()

  console.log(`deployed libro marketplace contract successfully at ${libro.addresss}\n`)

  //deploy all items to deployer address
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
