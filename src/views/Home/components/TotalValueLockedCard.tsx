import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { getBalanceNumber, getFullDisplayBalance, getDecimalAmount } from 'utils/formatBalance'
import { Card, CardBody, Heading, Skeleton, Text } from '@mochiswap/huikit'
import { useTranslation } from 'contexts/Localization'
import { useTotalValue } from '../../../state/hooks'
// import { useGetStats } from 'hooks/api'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
`

const TotalValueLockedCard = () => {
  const { t } = useTranslation()
  // const data = useGetStats()
  // const tvl = data ? data.total_value_locked_all.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null
  let totalValue = useTotalValue()
  totalValue = totalValue.decimalPlaces(0)
  const commas = totalValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading scale="lg" mb="24px">
          {t('Total Value Locked (TVL)')}
        </Heading>
        {totalValue ? (
          <>
            <Heading scale="xl">{`$${commas}`}</Heading>
            <Text color="textSubtle">{t('Across all Farm LP')}</Text>
          </>
        ) : (
          <Skeleton height={66} />
        )}
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
