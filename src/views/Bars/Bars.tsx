import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { Heading, Flex, Image, Button, Skeleton, useModal } from '@pancakeswap/uikit'
import { useBar } from 'hooks/useContract'
import PageHeader from 'components/PageHeader'
import { useWeb3React } from '@web3-react/core'
import {BigNumber} from 'bignumber.js'
import { useBarName } from 'hooks/useBarName'
import { ethers } from 'ethers'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import { BIG_TEN } from 'utils/bigNumber'
import DepositModal from '../Farms/components/DepositModal'

const Bars: React.FC = () => {
    // deposit model confirmation
    const max = new BigNumber("10000000000000")
    const lpSymbol = "xMOCHI"
    const addLiquidityUrl = ""

    const a = useBarName()
    const contract = useBar()
    const { account } = useWeb3React()

    // balances
    const mochiBalance = useTokenBalance(getCakeAddress())
    const xBalance     = useTokenBalance(getCakeAddress())
    const hmochiAddy   = getCakeAddress()
    const mochiBalanceFormatted = mochiBalance.div(BIG_TEN.pow(18))

    const StakeMochiX = useCallback(async () => {
        try {
        //   const allowance = await contract.methods.allowance(account, contract.options.address).call()
        //   const approve = await contract.methods.approve("0x4D22A39f8cC6584fD334D140E448D141ec67CE09", "1000000000").send({ from: account })
        //   if(allowance === 0){
        //     const approve = await contract.methods.approve(contract.options.address, ethers.constants.MaxUint256).send({ from: account })
        //   } 
          const name = await contract.methods.enter("1").send({from: account, gas: 200000, value: 3})
          .on('transactionHash', (tx) => {
          // alert
          })
        } catch (e) {
          console.error(e)
        }
      }, [contract, account])

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
            Stake hMOCHI to earn xMOCHI!
        </Heading>
        <Heading scale="lg" color="text">
            MochiSwap DEX Fee Sharing HAS Arrived! 🚀🚀
        </Heading>
        <p style={{color: "green", marginTop: "30px", marginBottom: "40px"}}>
            1. Authorize the xMOCHI Contract  2. Stake hMOCHI and watch xMOCHI rewards come in!
        </p>
        <Button disabled={!account} onClick={StakeMochiX}>
          STAKE hMOCHI
        </Button>
     </PageHeader>
    )
}

export default Bars