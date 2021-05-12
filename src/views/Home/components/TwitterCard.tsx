import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { Timeline } from 'react-twitter-widgets'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
// import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import { useFarms } from '../../../state/hooks'

const StyledTwitterCard = styled(Card)`
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

const TwitterCard = () => {
//   const TranslateString = useI18n()

  return (
    <StyledTwitterCard>
      <CardBody>
        <Heading size="xl" mb="24px">
          Announcements
        </Heading>
        <Timeline 
          dataSource={{
            sourceType: 'profile',
            screenName: 'mochiswap'
          }}
          options={{
            height: '350',
            chrome: "noheader, nofooter, noborders",
            width: "900",
            color: "#22cac5",
            theme: "light"
          }}
        />
      </CardBody>
    </StyledTwitterCard>
  )
}

export default TwitterCard
