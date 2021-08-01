import React from 'react'
import styled, { DefaultTheme } from 'styled-components'
import { Card, CardBody, Heading, Text } from '@mochiswap/huikit'
import BigNumber from 'bignumber.js/bignumber'
import { Timeline } from 'react-twitter-widgets'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
// import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import useTheme from 'hooks/useTheme'
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
  const { theme } = useTheme()
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
          height: '400',
          id: "profile:mochiswap",
          theme: theme.isDark ? 'dark' : 'light'
        }}
        />
      </CardBody>
    </StyledTwitterCard>
  )
}

export default TwitterCard
