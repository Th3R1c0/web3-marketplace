import { ethers } from "hardhat"
import { Libro } from "../typechain-types"

const {expect} = require("chai")

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}


describe('malllibro tests', () => {
    let libro: Libro
    let deployer, buyer
    beforeEach(async () => {
        [deployer, buyer] = await ethers.getSigners()
        const Libro = await ethers.getContractFactory("Libro")
        libro = await Libro.deploy()
    })
    describe('deployment', () => {
        it('sets the owner', async () => {
            expect(await libro.owner()).to.equal(deployer.address)
        })
    
        describe('listing', () => {
            let transaction

            const ID = 1
            const COST = tokens(2)

            beforeEach(async () => {
                transaction = await libro.connect(deployer).list(
                    ID,
                    "shoes", 
                    "clothing", 
                    "IMAGE",
                    1,
                    4,
                    5,
                )
                await transaction.wait()
                transaction = await libro.connect(buyer).buy(ID, { value: COST })
            })
            it('returns items attributes', async () => {
                const item = await libro.items(ID)
                expect(item.id).to.equal(ID)
            })
            it('emits list events', () => {
                expect(transaction).to.emit(libro, "List")
            })

            it('updates the contract balance', async () => {
                const result= await ethers.provider.getBalance(libro.address)
                expect(result).to.equal(COST) 
            })
            it('updates buyers order count', async () => {
                const result = libro.orderCount(buyer.address)
                expect(result).to.equal(1)
            })
        })

    })

})