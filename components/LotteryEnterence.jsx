import { useWeb3Contract, useMoralis } from "react-moralis"
import { abi, contractAddress } from "../constants/index"
import { useEffect, useState } from "react"

export default function LotterEnterence() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    let chainId = parseInt(chainIdHex)
    let [entrenceFee, setEntrenceFee] = useState("")
    const raffflAddress = chainId in contractAddress ? contractAddress[chainId][0] : null

    // const { runContractFunction: enterRaffle } = useWeb3Contract({
    //     abi: abi,
    //     contractAddress: raffflAddress,
    //     functionName: "enterRaffle",
    //     params: {},
    //     msgValue: fdsfkj,
    // })
    const { runContractFunction: getEntrenceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffflAddress,
        functionName: "getEntrenceFee",
        params: {},
    })

    useEffect(() => {
        console.log("just starting ----------------------")
        if (isWeb3Enabled) {
            async function updateUI() {
                let fee = (await getEntrenceFee()).toString()
                console.log("entrence fee", fee)
                setEntrenceFee(fee)
            }
            updateUI()
        }
    }, [isWeb3Enabled])
    return (
        <div>
            Hi from Lottary Enterence
            <div>{entrenceFee == "" ? "entho patti gays" : { entrenceFee }}</div>
        </div>
    )
}
