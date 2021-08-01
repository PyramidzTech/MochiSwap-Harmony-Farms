import React from 'react'
import styled from 'styled-components'
// import { Spinner } from '@mochiswap/huikit'
import { Flex, Box, Image } from '@mochiswap/huikit'
import Page from './layout/Page'

const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PageLoader: React.FC = () => {
  return (
    <Wrapper>
      <Image src="https://i.ibb.co/qrNg2gx/logo2.png" width={207} height={200} />
    </Wrapper>
  )
}

export default PageLoader
