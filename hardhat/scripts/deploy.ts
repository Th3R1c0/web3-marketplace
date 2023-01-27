import { ethers } from "hardhat";

const hre = require('hardhat')
const { items } = require("./items.json")

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
  for (let i = 0; i < items.length; i++) {
    const transaction = await libro.connect(deployer).list(
      items[i].id,
      items[i].name,
      items[i].category,
      items[i].image,
      //tokens(items[i].price),
      1,
      items[i].rating,
      items[i].stock,
    )
    await transaction.wait()

    
    console.log(`Listed item ${items[i].id}: ${items[i].name}`)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
