import React from 'react'
import styled from 'styled-components'
import { Text, BaseLayout } from '@mochiswap/huikit'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import LotteryCard from 'views/Home/components/LotteryCard'
import CakeStats from 'views/Home/components/CakeStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPRCard from 'views/Home/components/EarnAPRCard'
import TwitterCard from 'views/Home/components/TwitterCard'
import EarnAssetCard from 'views/Home/components/EarnAssetCard'
import WinCard from 'views/Home/components/WinCard'

const Hero = styled.div`
  align-items: center;
  background-image: url('/images/farm-bg.png');
  background-size: auto;
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: left;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  text-align: left;
  border-radius: 30px;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image:  url('/images/farm-bg.png');
    background-position: right center;
    opacity: 0.6;
    height: 165px;
    padding-top: 0;
  }
`

const Heading = styled.div`
  padding-top: 15px;
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: rgba(255,255,255,1);
  font-weight: 400;
  text-align: left;
  background: rgba(0,0,0,0.8);
  text-align: center;
  width: 100%;
  height: 100%;
  border-radius: 30px;
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 4;
    }
  }
`

const Home: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <Hero>
        <Heading>
          Welcome to the MOCHISWAP Harmony ONE Yield Farms!!!
        </Heading>
        {/* <Text>{t('The #1 AMM and yield farm on Binance Smart Chain.')}</Text> */}
      </Hero>
      <div>
        <Cards>
          <FarmStakingCard />
          <TwitterCard />
        </Cards>
        {/* <CTACards>
          <EarnAPRCard />
          <EarnAssetCard />
          <WinCard />
        </CTACards> */}
        <Cards>
          <CakeStats />
          <TotalValueLockedCard />
        </Cards>
      </div>
    </Page>
  )
}

export default Home
