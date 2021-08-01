import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Image } from '@mochiswap/huikit'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import Countdown from 'react-countdown'

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }

  transition: opacity 200ms;
  &:hover {
    opacity: 0.65;
  }
`
const CardMidContent = styled(Heading).attrs({ scale: 'xl' })`
  line-height: 44px;
`
const WinCard = () => {
  const { t } = useTranslation()

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading color="contrast" scale="lg">
          {t('NFTs')}
        </Heading>
        {/* <CardMidContent color="#7645d9"><Countdown precision={1} date={new Date('2021-07-17T18:02:03')} />
          <br/>
          <span>Time in Day</span>
          <br />
          <span style={{fontSize: "15px"}}>Still testing! Coming soon!</span>
          </CardMidContent> */}
        <br />
        <a style={{ textDecoration: 'underline double purple' }} rel="noreferrer" href="https://cybermochi.com">
          <Image src="https://i.ibb.co/YX5qYD1/mochi1.png" width={200} height={205} />
          CyberMochi is now LIVE! CLICK{' '}
        </a>
        <Flex justifyContent="space-between">
          <Heading color="contrast" scale="lg" />
          {/* <ArrowForwardIcon mt={30} color="primary" /> */}
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default WinCard
