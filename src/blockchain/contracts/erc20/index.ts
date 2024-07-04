import { GAS_LIMIT, GAS_PRICE } from "../../gas"
import Web3, { Address, Contract, EthExecutionAPI, SupportedProviders } from "web3"
import { abi } from "./abi"
import { ChainId } from "../../chains"
import { getHttpProvider } from "../../providers"

export class ERC20Contract {
    private contract: Contract<typeof abi>
    private sender?: Address

    constructor(
        chainId: ChainId,
        address: Address,
        provider?: SupportedProviders<EthExecutionAPI>,
        sender?: string
    ) {
        if (!provider) provider = getHttpProvider(chainId)
        const web3 = new Web3(provider)
        this.contract = new web3.eth.Contract(abi, address, web3)

        this.sender = sender
    }

    async name() {
        try {
            return await this.contract.methods.name().call()
        } catch (ex) {
            console.log(ex)
            return null
        }
    }

    async symbol() {
        try {
            return await  this.contract.methods.symbol().call()
        } catch (ex) {
            console.log(ex)
            return null
        }
    }

    async decimals() {
        try {
            return Number(await this.contract.methods.decimals().call())
        } catch (ex) {
            console.log(ex)
            return null
        }
    }

    balanceOf() {
        return {
            call: async (owner: Address) => {
                return await this.contract.methods.balanceOf(owner).call<bigint>()
            }
        }
    }

    async allowance(owner: Address, spender: Address) {
        try {
            return await this.contract.methods.allowance(owner, spender).call<bigint>()
        } catch (ex) {
            console.log(ex)
            return null
        }
    }

    approve() {
        return {
            send: async (spender: Address, value: bigint) => {
                return this.contract.methods.approve(spender, value).send({
                    from: this.sender,
                    gas: GAS_LIMIT,
                    gasPrice: GAS_PRICE,
                })
            }
        }
        
    }

    transfer() {
        return {
            send: async (recipient: Address, amount: bigint) => {
                return this.contract.methods.transfer(recipient, amount).send({
                    from: this.sender,
                    gas: GAS_LIMIT,
                    gasPrice: GAS_PRICE,
                })
            }
        }
    }
}