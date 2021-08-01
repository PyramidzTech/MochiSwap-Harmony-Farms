import React from 'react'
import { Card, CardBody, Heading, Text } from '@mochiswap/huikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js/bignumber'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getCakeAddress } from 'utils/addressHelpers'
import { useFarms, usePriceCakeBusd } from '../../../state/hooks'
import CardValue from './CardValue'

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const CakeStats = () => {
  const { t } = useTranslation()
  // const totalSupply = useTotalSupply()
  // const burnedBalance = getBalanceNumber(useBurnedBalance(getCakeAddress()))

  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0)
  const cakeSupply = getBalanceNumber(circSupply)

  const farms = useFarms()
  const cubPrice = usePriceCakeBusd()
  const marketCap = cubPrice.times(circSupply)
  const maxBurnSupply = new BigNumber(100000000000000000000000000)
  const maxBurnTotal = maxBurnSupply.minus(burnedBalance)
  const totalMarketcap = cubPrice.times(new BigNumber(100000000000000000000000000))

  return (
    <StyledCakeStats>
      <CardBody>
        <Heading size="xl" mb="24px">
          {t('Cake Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{t('Current hMOCHI Supply')}</Text>
          {cakeSupply && <CardValue fontSize="14px" value={cakeSupply} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px" color="#22cac5">
            Total hMOCHI Burned
          </Text>
          <CardValue fontSize="14px" value={getBalanceNumber(burnedBalance)} decimals={0} />
        </Row>
        <Row>
          <Text fontSize="14px" color="">
            Max hMOCHI Ever with Burn
          </Text>
          <CardValue fontSize="14px" value={getBalanceNumber(maxBurnTotal)} decimals={0} />
        </Row>
        <Row>
          <Text fontSize="14px">{t('Market Cap')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(marketCap)} decimals={0} prefix="$" />
        </Row>
        <Row>
          <Text fontSize="14px">{t('Fully Diluted Market Cap ')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(totalMarketcap)} decimals={0} prefix="$" />
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
