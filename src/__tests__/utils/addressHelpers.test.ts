import { getAddress } from 'utils/addressHelpers'

describe('getAddress', () => {
  const address = {
    1666600000: '0x0dD740Db89B9fDA3Baadf7396DdAD702b6E8D6f5',
  }

  it(`get address for mainnet (chainId 1666600000)`, () => {
    process.env.REACT_APP_CHAIN_ID = '1666600000'
    const expected = address[1666600000]
    expect(getAddress(address)).toEqual(expected)
  })
  it(`get address for testnet (chainId 1666600000)`, () => {
    process.env.REACT_APP_CHAIN_ID = '1666600000'
    const expected = address[1666600000]
    expect(getAddress(address)).toEqual(expected)
  })
  it(`get address for any other network (chainId 1666600000)`, () => {
    process.env.REACT_APP_CHAIN_ID = '1666600000'
    const expected = address[1666600000]
    expect(getAddress(address)).toEqual(expected)
  })
})
