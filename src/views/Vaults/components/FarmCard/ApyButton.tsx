import React from 'react'
import BigNumber from 'bignumber.js'
import { IconButton, useModal, CalculateIcon, LinkExternal } from '@mochiswap/huikit'
import ApyCalculatorModal from 'components/ApyCalculatorModal'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'

export interface ApyButtonProps {
  lpLabel?: string
  cakePrice?: BigNumber
  apr?: number
  addLiquidityUrl?: string
}
const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
  margin-right: 6px;
`
const ApyButton: React.FC<ApyButtonProps> = ({ lpLabel, cakePrice, apr, addLiquidityUrl }) => {
  const { t } = useTranslation()
  const [onPresentApyModal] = useModal(
    <ApyCalculatorModal
      linkLabel={`${t('Get')} ${lpLabel}`}
      tokenPrice={cakePrice.toNumber()}
      apr={apr}
      linkHref={addLiquidityUrl}
    />,
  )

  const handleClickButton = (event): void => {
    event.stopPropagation()
    onPresentApyModal()
  }

  return (
    <StyledLinkExternal target="_blank" href="https://vfat.tools/harmony/mochi/">
      {t('VFAT')}
    </StyledLinkExternal>
    // <IconButton onClick={handleClickButton} variant="text" scale="sm" ml="4px">
    //   <CalculateIcon width="18px" />
    // </IconButton>
  )
}

export default ApyButton
