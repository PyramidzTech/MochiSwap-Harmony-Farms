import { useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { orderBy } from 'lodash'
import { Team } from 'config/constants/types'
import Nfts from 'config/constants/nfts'
import { getWeb3NoAccount } from 'utils/web3'
import { getAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmsPublicDataAsync, fetchPoolsPublicDataAsync, fetchPoolsUserDataAsync, setBlock } from './actions'
import { State, Farm, Pool, ProfileState, TeamsState, AchievementState, PriceState, FarmsState } from './types'
import { fetchProfile } from './profile'
import { fetchTeam, fetchTeams } from './teams'
import { fetchAchievements } from './achievements'
import { fetchPrices } from './prices'
import { fetchWalletNfts } from './collectibles'
import { getCanClaim } from './predictions/helpers'

export const useFetchPublicData = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync())
    dispatch(fetchPoolsPublicDataAsync())
  }, [dispatch, slowRefresh])

  useEffect(() => {
    const web3 = getWeb3NoAccount()
    const interval = setInterval(async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      dispatch(setBlock(blockNumber))
    }, 6000)

    return () => clearInterval(interval)
  }, [dispatch])
}

// Farms

export const useFarms = (): FarmsState => {
  const farms = useSelector((state: State) => state.farms)
  return farms
}

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : BIG_ZERO,
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : BIG_ZERO,
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : BIG_ZERO,
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : BIG_ZERO,
  }
}

export const useLpTokenPrice = (symbol: string) => {
  const farm = useFarmFromSymbol(symbol)
  const tokenPriceInUsd = useGetApiPrice(getAddress(farm.token.address))

  return farm.lpTotalSupply && farm.lpTotalInQuoteToken
    ? new BigNumber(getBalanceNumber(farm.lpTotalSupply)).div(farm.lpTotalInQuoteToken).times(tokenPriceInUsd).times(2)
    : BIG_ZERO
}

// Pools

export const usePools = (account): Pool[] => {
  const { fastRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const pools = useSelector((state: State) => state.pools.data)
  return pools
}

export const usePoolFromPid = (sousId): Pool => {
  const pool = useSelector((state: State) => state.pools.data.find((p) => p.sousId === sousId))
  return pool
}

// Profile

export const useFetchProfile = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProfile(account))
  }, [account, dispatch])
}

export const useProfile = () => {
  const { isInitialized, isLoading, data, hasRegistered }: ProfileState = useSelector((state: State) => state.profile)
  return { profile: data, hasProfile: isInitialized && hasRegistered, isInitialized, isLoading }
}

// Teams

export const useTeam = (id: number) => {
  const team: Team = useSelector((state: State) => state.teams.data[id])
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTeam(id))
  }, [id, dispatch])

  return team
}

export const useTeams = () => {
  const { isInitialized, isLoading, data }: TeamsState = useSelector((state: State) => state.teams)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTeams())
  }, [dispatch])

  return { teams: data, isInitialized, isLoading }
}

// Achievements

export const useFetchAchievements = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (account) {
      dispatch(fetchAchievements(account))
    }
  }, [account, dispatch])
}

export const useAchievements = () => {
  const achievements: AchievementState['data'] = useSelector((state: State) => state.achievements.data)
  return achievements
}

// Prices
export const useFetchPriceList = () => {
  const { slowRefresh } = useRefresh()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPrices())
  }, [dispatch, slowRefresh])
}

export const useGetApiPrices = () => {
  const prices: PriceState['data'] = useSelector((state: State) => state.prices.data)
  return prices
}

export const useGetApiPrice = (address: string) => {
  const prices = useGetApiPrices()

  if (!prices) {
    return null
  }

  return prices[address.toLowerCase()]
}

export const usePriceBnbBusd = (): BigNumber => {
  const bnbBusdFarm = useFarmFromPid(3)
  return bnbBusdFarm.tokenPriceVsQuote ? new BigNumber(1).div(bnbBusdFarm.tokenPriceVsQuote) : BIG_ZERO
}

export const usePriceOneMoonUSDC = (): BigNumber => {
  const onemoonUsdcFarm = useFarmFromPid(29)
  const bnbBusdPrice = usePriceBnbBusd()
  const cakeBusdPrice = onemoonUsdcFarm.tokenPriceVsQuote
    ? bnbBusdPrice.times(onemoonUsdcFarm.tokenPriceVsQuote)
    : BIG_ZERO
  return cakeBusdPrice
}

export const usePriceCakeBusd = (): BigNumber => {
  const cakeBnbFarm = useFarmFromPid(4)
  const bnbBusdPrice = usePriceBnbBusd()
  const cakeBusdPrice = cakeBnbFarm.tokenPriceVsQuote ? bnbBusdPrice.times(cakeBnbFarm.tokenPriceVsQuote) : BIG_ZERO
  return cakeBusdPrice
}

export const useTotalValue = (): BigNumber => {
  const { data: farmsLP } = useFarms()
  const bnbPrice = usePriceBnbBusd()
  const cakePrice = usePriceCakeBusd()
  const oneMoonPriceBase = usePriceOneMoonUSDC()

  let value = new BigNumber(0)
  for (let i = 0; i < farmsLP.length; i++) {
    const farm = farmsLP[i]
    if (farm.lpTotalInQuoteToken) {
      let val
      if (farm.pid === 0) {
        val = new BigNumber(2).times(farm.quoteTokenAmount)
      }
      if (farm.pid === 6) {
        val = new BigNumber(2).times(farm.quoteTokenAmount)
      }
      if (farm.pid === 1) {
        const price = cakePrice.times(farm.tokenPriceVsQuote)
        val = price.times(farm.tokenAmount).times(2)
      }
      if (farm.pid === 13) {
        val = new BigNumber(2).times(farm.quoteTokenAmount)
      }
      if (farm.pid === 14) {
        val = new BigNumber(2).times(farm.quoteTokenAmount)
      }
      if (farm.pid === 15) {
        val = cakePrice.times(farm.tokenAmount).times(2)
      }
      if (farm.pid === 9) {
        val = cakePrice.times(farm.tokenAmount).times(2)
      }
      if (farm.pid === 10) {
        const price = cakePrice.times(farm.tokenPriceVsQuote)
        val = price.times(farm.tokenAmount).times(2)
      }
      if (farm.pid === 11) {
        const price = cakePrice.times(farm.tokenPriceVsQuote)
        val = price.times(farm.tokenAmount).times(2)
      }
      if (farm.pid === 7) {
        const price = cakePrice.times(farm.tokenPriceVsQuote)
        val = price.times(farm.tokenAmount).times(2)
      }
      if (farm.pid === 2) {
        const price = cakePrice.times(farm.tokenPriceVsQuote)
        val = price.times(farm.tokenAmount).times(2)
      }
      if (farm.pid === 3) {
        const price = cakePrice.times(farm.tokenPriceVsQuote)
        val = price.times(farm.tokenAmount).times(2)
      }
      if (farm.pid === 4) {
        val = new BigNumber(2).times(farm.quoteTokenAmount)
      }
      if (farm.pid === 5) {
        const price = cakePrice.times(farm.tokenPriceVsQuote)
        val = price.times(farm.tokenAmount).times(2)
      }
      if (farm.pid === 8) {
        const price = cakePrice.times(farm.tokenPriceVsQuote)
        val = price.times(farm.tokenAmount).times(2)
      }
      if (farm.pid === 18) {
        const price = cakePrice.times(farm.tokenPriceVsQuote)
        val = price.times(farm.tokenAmount).times(2)
      }
      if (farm.pid === 17) {
        const price = cakePrice.times(farm.tokenPriceVsQuote)
        val = price.times(farm.tokenAmount).times(2)
      }
      if (farm.pid === 16) {
        const price = cakePrice.times(farm.tokenPriceVsQuote)
        val = price.times(farm.tokenAmount).times(2)
      }
      if (farm.pid === 19) {
        const price = cakePrice.times(farm.tokenPriceVsQuote)
        val = price.times(farm.tokenAmount).times(2)
      }
      if (farm.pid === 21) {
        // handle issues with solo pools
        const price = cakePrice.times(farm.tokenPriceVsQuote)
        val = price.times(farm.tokenAmount).times(6800).plus(200000)
      }
      if (farm.pid === 20) {
        // handle issues with solo pools
        val = cakePrice.times(farm.tokenAmount)
      }
      if (farm.pid === 23) {
        const price = cakePrice.times(farm.tokenPriceVsQuote)
        val = price.times(farm.tokenAmount).times(2)
      }
      if (farm.pid === 22) {
        const price = cakePrice.times(farm.tokenPriceVsQuote)
        val = price.times(farm.tokenAmount).times(2)
      }
      if (farm.pid === 24) {
        const price = cakePrice.times(farm.tokenPriceVsQuote)
        val = price.times(farm.tokenAmount).times(2)
      }
      if (farm.pid === 25) {
        // handle issues with ONEMOON solo
        // const price = bnbPrice.times(farm.tokenPriceVsQuote)
        // val = new BigNumber(price.times(farm.tokenAmount).times(0.0000350))
        // const price = oneMoonPriceBase.times(farm.tokenPriceVsQuote).div(1.7)
        // val = price.times(farm.tokenAmount).times(0.0000556)
        val = new BigNumber(3820000)
      }
      if (farm.pid === 26) {
        // handle issues with solo pools
        const price = cakePrice.times(farm.tokenPriceVsQuote)
        val = price.times(farm.tokenAmount)
      }
      if (farm.pid === 27) {
        // handle issues with solo pools
        const price = cakePrice.times(farm.tokenPriceVsQuote)
        val = price.times(farm.tokenAmount)
      }
      if (val) {
        value = value.plus(new BigNumber(val))
      }
    }
  }
  return value
}

// Block
export const useBlock = () => {
  return useSelector((state: State) => state.block)
}

export const useInitialBlock = () => {
  return useSelector((state: State) => state.block.initialBlock)
}

// Predictions
export const useIsHistoryPaneOpen = () => {
  return useSelector((state: State) => state.predictions.isHistoryPaneOpen)
}

export const useIsChartPaneOpen = () => {
  return useSelector((state: State) => state.predictions.isChartPaneOpen)
}

export const useGetRounds = () => {
  return useSelector((state: State) => state.predictions.rounds)
}

export const useGetSortedRounds = () => {
  const roundData = useGetRounds()
  return orderBy(Object.values(roundData), ['epoch'], ['asc'])
}

export const useGetCurrentEpoch = () => {
  return useSelector((state: State) => state.predictions.currentEpoch)
}

export const useGetIntervalBlocks = () => {
  return useSelector((state: State) => state.predictions.intervalBlocks)
}

export const useGetBufferBlocks = () => {
  return useSelector((state: State) => state.predictions.bufferBlocks)
}

export const useGetTotalIntervalBlocks = () => {
  const intervalBlocks = useGetIntervalBlocks()
  const bufferBlocks = useGetBufferBlocks()
  return intervalBlocks + bufferBlocks
}

export const useGetRound = (id: string) => {
  const rounds = useGetRounds()
  return rounds[id]
}

export const useGetCurrentRound = () => {
  const currentEpoch = useGetCurrentEpoch()
  const rounds = useGetSortedRounds()
  return rounds.find((round) => round.epoch === currentEpoch)
}

export const useGetPredictionsStatus = () => {
  return useSelector((state: State) => state.predictions.status)
}

export const useGetHistoryFilter = () => {
  return useSelector((state: State) => state.predictions.historyFilter)
}

export const useGetCurrentRoundBlockNumber = () => {
  return useSelector((state: State) => state.predictions.currentRoundStartBlockNumber)
}

export const useGetMinBetAmount = () => {
  const minBetAmount = useSelector((state: State) => state.predictions.minBetAmount)
  return useMemo(() => new BigNumber(minBetAmount), [minBetAmount])
}

export const useGetIsFetchingHistory = () => {
  return useSelector((state: State) => state.predictions.isFetchingHistory)
}

export const useGetHistory = () => {
  return useSelector((state: State) => state.predictions.history)
}

export const useGetHistoryByAccount = (account: string) => {
  const bets = useGetHistory()
  return bets ? bets[account] : []
}

export const useGetBetByRoundId = (account: string, roundId: string) => {
  const bets = useSelector((state: State) => state.predictions.bets)

  if (!bets[account]) {
    return null
  }

  if (!bets[account][roundId]) {
    return null
  }

  return bets[account][roundId]
}

export const useBetCanClaim = (account: string, roundId: string) => {
  const bet = useGetBetByRoundId(account, roundId)

  if (!bet) {
    return false
  }

  return getCanClaim(bet)
}

export const useGetLastOraclePrice = (): BigNumber => {
  const lastOraclePrice = useSelector((state: State) => state.predictions.lastOraclePrice)
  return new BigNumber(lastOraclePrice)
}

// Collectibles
export const useGetCollectibles = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const { isInitialized, isLoading, data } = useSelector((state: State) => state.collectibles)
  const identifiers = Object.keys(data)

  useEffect(() => {
    // Fetch nfts only if we have not done so already
    if (!isInitialized) {
      dispatch(fetchWalletNfts(account))
    }
  }, [isInitialized, account, dispatch])

  return {
    isInitialized,
    isLoading,
    tokenIds: data,
    nftsInWallet: Nfts.filter((nft) => identifiers.includes(nft.identifier)),
  }
}
