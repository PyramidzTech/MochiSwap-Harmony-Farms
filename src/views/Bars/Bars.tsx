import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { Heading, Flex, Image, Button, Skeleton, useModal } from '@mochiswap/huikit'
import { useBar, useCake } from 'hooks/useContract'
import PageHeader from 'components/PageHeader'
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'bignumber.js'
import { useBarName } from 'hooks/useBarName'
import { ethers } from 'ethers'
import useTokenBalance, { useMochiBalance } from 'hooks/useTokenBalance'
import { getCakeAddress, getMochiXAddress } from 'utils/addressHelpers'
import { BIG_TEN } from 'utils/bigNumber'
import { AlertTriangle } from 'react-feather'
import DepositModal from '../Farms/components/DepositModal'

const Bars: React.FC = () => {
  // deposit model confirmation
  const max = new BigNumber('10000000000000')
  const lpSymbol = 'xMOCHI'
  const addLiquidityUrl = ''

  const a = useBarName()
  const contract = useBar()
  const hContract = useCake()
  const { account } = useWeb3React()

  // balances
  const mochiBalance = useTokenBalance(getCakeAddress())
  const mochiXBalance = useMochiBalance(getCakeAddress())

  const hmochiAddy = getCakeAddress()
  const mochiBalanceFormatted = mochiBalance.div(BIG_TEN.pow(18))
  const mochiDecimalFormatted = new BigNumber(mochiBalance).times(BIG_TEN.pow(18)).toString()
  const mochiXFormatted = new BigNumber(mochiXBalance).div(BIG_TEN.pow(18)).toString()

  let noXMochi = null
  if (mochiXFormatted !== '0') {
    noXMochi = 'false'
  }
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
      const hBalance = await hContract.methods.balanceOf(account).call()

      const allowance = await hContract.methods.allowance(account, contract.options.address).call()
      // console.log(hBalance, allowance)
      if (hBalance.toString().length > allowance.toString().length) {
        const approve = await hContract.methods
          .approve(contract.options.address, ethers.constants.MaxUint256)
          .send({ from: account })
      }
      // step 2. final stake on xmochi contract
      const name = await contract.methods
        .enter(hBalance)
        .send({ from: account, gas: 200000 })
        .on('transactionHash', (tx) => {
          console.log(tx)
        })
    } catch (e) {
      console.error(e)
    }
  }, [account, contract, hContract])

  const removeMochiX = useCallback(async () => {
    try {
      const xBalance = await contract.methods.balanceOf(account).call()
      const name = await contract.methods
        .leave(xBalance)
        .send({ from: account, gas: 200000 })
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
        MochiSwap xMOCHI HAS Arrived! 🚀🚀 The new xMOCHI system will periodically perform hMOCHI buybacks, which are
        distrubuted to xMOCHI holders!
      </Heading>
      <p style={{ color: 'green', marginTop: '30px', marginBottom: '40px' }}>
        1. Authorize the hMOCHI Allowance
        <br />
        2. Stake hMOCHI
        <br />
        3. When you unstake xMOCHI, your original hMOCHI Balance will be higher!
        <br />
        4. Buy-backs happen roughly every 24-48 hours, if you unstake before the buybacks you will have no increased
        hMOCHI balance.
      </p>
      <Button disabled={!account} onClick={StakeMochiX}>
        STAKE {mochiBalanceFormatted.toString()} hMOCHI
      </Button>
      <br />
      <br />
      <Button variant="secondary" disabled={!account || noXMochi === null} onClick={removeMochiX}>
        UNSTAKE {mochiXFormatted} xMOCHI
      </Button>
    </PageHeader>
  )
}

export default Bars
