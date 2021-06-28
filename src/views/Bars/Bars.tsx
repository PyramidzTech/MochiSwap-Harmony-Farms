import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { Heading, Flex, Image, Button, Skeleton, useModal } from '@pancakeswap/uikit'
import { useBar, useCake } from 'hooks/useContract'
import PageHeader from 'components/PageHeader'
import { useWeb3React } from '@web3-react/core'
import {BigNumber} from 'bignumber.js'
import { useBarName } from 'hooks/useBarName'
import { ethers } from 'ethers'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress, getMochiXAddress } from 'utils/addressHelpers'
import { BIG_TEN } from 'utils/bigNumber'
import { AlertTriangle } from 'react-feather'
import DepositModal from '../Farms/components/DepositModal'

const Bars: React.FC = () => {
    // deposit model confirmation
    const max = new BigNumber("10000000000000")
    const lpSymbol = "xMOCHI"
    const addLiquidityUrl = ""

    const a = useBarName()
    const contract = useBar()
    const hContract = useCake()
    const { account } = useWeb3React()

    // balances
    const mochiBalance = useTokenBalance(getCakeAddress())
    const hmochiAddy   = getCakeAddress()
    const mochiBalanceFormatted = mochiBalance.div(BIG_TEN.pow(18))
    const mochiDecimalFormatted = new BigNumber(mochiBalance).times(BIG_TEN.pow(18)).toString()

    const xBalanceCheck = useCallback(async () => {
        try {
            const xBalance = await contract.methods.balanceOf(account).call()
            return xBalance
        } catch (e) {
            console.error(e)
        }
        return 0
    }, [account, contract])

    // const [count, setCount] = React.useState(xBalanceCheck);

    // React.useEffect(() => {
    //     (async () => {
    //         const products = await xBalanceCheck()
    //       })()      
    //   }, [xBalanceCheck, setCount]);
    
    const StakeMochiX = useCallback(async () => {
        try {
        const allowance = await hContract.methods.allowance(account, contract.options.address).call()
        if(allowance === 0){
            const approve = await hContract.methods.approve(contract.options.address, ethers.constants.MaxUint256).send({ from: account })
        }
        // step 2. final stake on xmochi contract
        const name = await contract.methods
        .enter(mochiBalance)
        .send({from: account, gas: 200000})
        .on('transactionHash', (tx) => {
        console.log(tx)
            })
        } catch (e) {
          console.error(e)
        }
      }, [account, contract, hContract, mochiBalance])

      const removeMochiX = useCallback(async () => {
        try {
        const xBalance = await contract.methods.balanceOf(account).call()
        const name = await contract.methods
        .leave(xBalance)
        .send({from: account, gas: 200000})
        .on('transactionHash', (tx) => {
        console.log(tx)
            })
        } catch (e) {
          console.error(e)
        }
      }, [account, contract])

      const onPresentDeposit = useModal(
        <DepositModal max={max} onConfirm={StakeMochiX} tokenName={lpSymbol} addLiquidityUrl={addLiquidityUrl} />,
      )


    // const isApproved = account && allowance && allowance.isGreaterThan(0)

    // const renderApprovalOrStakeButton = () => {
    // return isApproved ? (
    //     <StakeAction
    //     stakedBalance={stakedBalance}
    //     tokenBalance={tokenBalance}
    //     tokenName={lpName}
    //     pid={pid}
    //     addLiquidityUrl={addLiquidityUrl}
    //     />
    // ) : (
    //     <Button mt="8px" width="100%" disabled={requestedApproval} onClick={handleApprove}>
    //     {t('Approve Contract')}
    //     </Button>
    // )
    // }


    return (
      <PageHeader>
        <Heading as="h1" scale="xxl" color="secondary" mb="24px">
            Stake hMOCHI to earn DEX BuyBacks!
        </Heading>
        <Heading scale="lg" color="text"> 
            MochiSwap xMOCHI HAS Arrived! 🚀🚀 The new xMOCHI system will periodically perform hMOCHI buybacks, which are distrubuted to xMOCHI holders!
        </Heading>
        <p style={{color: "green", marginTop: "30px", marginBottom: "40px"}}>
            1. Authorize the hMOCHI Allowance   
            <br />
            2. Stake hMOCHI 
            <br />
            3. When you unstake xMOCHI, your original hMOCHI Balance will be higher!
        </p>
        <Button disabled={!account} onClick={StakeMochiX}>
          STAKE {mochiBalanceFormatted.toString()} hMOCHI
        </Button>
        <br />
        <br />
        <Button variant="secondary" disabled={!account} onClick={removeMochiX}>
          UNSTAKE {} xMOCHI
        </Button>
     </PageHeader>
    )
}

export default Bars