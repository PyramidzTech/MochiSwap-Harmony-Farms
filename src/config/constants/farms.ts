import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'bscBUSD-BUSD',
    lpAddresses: {
      1666600000: '0x4b2343Ccf2F882942514084F29Bd92950752aab3',
    },
    token: tokens.busd,
    quoteToken: tokens.busd,
  },

  {
    pid: 6,
    lpSymbol: 'ONE-USDT',
    lpAddresses: {
      1666600000: '0x1699F115Ee278e4681EF1867113054fF05262ab6',
    },
    token: tokens.usdt,
    quoteToken: tokens.usdt,
  },

  {
    pid: 1,
    lpSymbol: 'bMOCHI-ONE',
    lpAddresses: {
      1666600000: '0xf141245E0aed6F7E456059aa834AF89Ac9339136',
    },
    token: tokens.one,
    quoteToken: tokens.bmochi,
  },

  {
    pid: 13,
    lpSymbol: 'ONE-1USDC',
    lpAddresses: {
      1666600000: '0x0e1521cA9e659ca9d9ff53554e5b8E27f57AD47e',
    },
    token: tokens.usdc,
    quoteToken: tokens.usdc,
  },

  {
    pid: 14,
    lpSymbol: 'BUSD-hMOCHI',
    lpAddresses: {
      1666600000: '0x594eD9DB6Db8E74003a9989523937ce8F4ed271F',
    },
    token: tokens.cake,
    quoteToken: tokens.busd,
  },

  {
    pid: 15,
    lpSymbol: '1ETH-hMOCHI',
    lpAddresses: {
      1666600000: '0xC313Fe99442e3B36793ad4B2B870c7Bed3fCd1de',
    },
    token: tokens.cake,
    quoteToken: tokens.eth,
  },

  {
    pid: 9,
    lpSymbol: 'hMOCHI-SUSHI',
    lpAddresses: {
      1666600000: '0xb60d01e94B7B7F9D4E72dF1638ecF9EbdfcC9b64',
    },
    token: tokens.cake,
    quoteToken: tokens.busd,
  },

  {
    pid: 10,
    lpSymbol: 'bMOCHI-SUSHI',
    lpAddresses: {
      1666600000: '0x52dcF8bC28DD789daEd9C30542a32e57f72cf15D',
    },
    token: tokens.sushi,
    quoteToken: tokens.bmochi,
  },

  {
    pid: 11,
    lpSymbol: 'ONE-SUSHI',
    lpAddresses: {
      1666600000: '0x99704766507B87781b8aF16299E319D1b8324C0D',
    },
    token: tokens.sushi,
    quoteToken: tokens.one,
  },

  {
    pid: 7,
    lpSymbol: 'BNB-bMOCHI',
    lpAddresses: {
      1666600000: '0x2D0Bb96706761A1b13581C9ddD5d471240EF2252',
    },
    token: tokens.bmochi,
    quoteToken: tokens.bmochi,
  },

  {
    pid: 2,
    lpSymbol: 'bscBUSD-bMOCHI',
    lpAddresses: {
      1666600000: '0x77f6998A0eB09a5ba24d3B8c6e747Cc1A0Fc6CA5',
    },
    token: tokens.bmochi,
    quoteToken: tokens.bmochi,
  },

  {
    pid: 3,
    lpSymbol: 'hMOCHI-ONE',
    lpAddresses: {
      1666600000: '0x7f6D31562a8C0368e3A8B092BF29F6c016F270e0',
    },
    token: tokens.bnb,
    quoteToken: tokens.cake,
  },
  // do not touch used to calculate busd
  {
    pid: 4,
    lpSymbol: 'BUSD-ONE',
    lpAddresses: {
      1666600000: '0x46Ac8DdBDf4B16D6312693F8F25798db6f65Bcc1',
    },
    token: tokens.one,
    quoteToken: tokens.busd,
  },

  {
    pid: 5,
    lpSymbol: 'hMOCHI-bMOCHI',
    lpAddresses: {
      1666600000: '0x843011c56A62283c18D7355E2e3851022aD2eC38',
    },
    token: tokens.cake,
    quoteToken: tokens.cake,
  },

  {
    pid: 8,
    lpSymbol: 'HMOCHI-bAPESOX',
    lpAddresses: {
      1666600000: '0x22215262804b55565b2485415A82eD98E06Bbf30',
    },
    token: tokens.apesox,
    quoteToken: tokens.cake,
  },

  {
    pid: 18,
    lpSymbol: 'VIPER-hMOCHI',
    lpAddresses: {
      1666600000: '0xCcc4C08E6b998fF4bDBAB0bBd1F51721Ca9719ae',
    },
    token: tokens.cake,
    quoteToken: tokens.cake,
  },

  {
    pid: 17,
    lpSymbol: 'ROT-hMOCHI',
    lpAddresses: {
      1666600000: '0x137B224eDcF62dF3A79C381f8009DCac03e60E03',
    },
    token: tokens.cake,
    quoteToken: tokens.cake,
  },

  {
    pid: 16,
    lpSymbol: 'DSLA-hMOCHI',
    lpAddresses: {
      1666600000: '0x1B868f8b8490EF64878Baec00b680eb3e89285DA',
    },
    token: tokens.cake,
    quoteToken: tokens.cake,
  },

  {
    pid: 19,
    lpSymbol: 'ONE-WBTC',
    lpAddresses: {
      1666600000: '0x4161A7F652E239e1479B00B593f72B35D909609c',
    },
    token: tokens.one,
    quoteToken: tokens.one,
  },

  {
    pid: 21,
    lpSymbol: 'bMOCHI Solo',
    lpAddresses: {
      1666600000: '0xda73f5C25C0D644Afd20dA5535558956B192b262',
    },
    token: tokens.bmochi,
    quoteToken: tokens.bmochi,
  },

  {
    pid: 20,
    lpSymbol: 'hMOCHI Solo',
    lpAddresses: {
      1666600000: '0x0dD740Db89B9fDA3Baadf7396DdAD702b6E8D6f5',
    },
    token: tokens.cake,
    quoteToken: tokens.cake,
  },

  {
    pid: 23,
    lpSymbol: 'ONE-BNB',
    lpAddresses: {
      1666600000: '0xbDDdc287317999B10728D32cC2E38555C431d5de',
    },
    token: tokens.one,
    quoteToken: tokens.one,
  },

  {
    pid: 22,
    lpSymbol: 'ONEMOON-hMOCHI',
    lpAddresses: {
      1666600000: '0x66609946EAcEc172700D40A39eF60088862a2dce',
    },
    token: tokens.cake,
    quoteToken: tokens.cake,
  },

  {
    pid: 24,
    lpSymbol: '1USDC-hMOCHI',
    lpAddresses: {
      1666600000: '0x4aA4B306bFEcE9025d65d3C88d81349D19f5D67C',
    },
    token: tokens.cake,
    quoteToken: tokens.cake,
  },
  {
    pid: 25,
    lpSymbol: 'ONEMOON',
    lpAddresses: {
      1666600000: '0xCB35e4945c7F463c5CCBE3BF9f0389ab9321248F',
    },
    token: tokens.onemoon,
    quoteToken: tokens.onemoon,
  },
  {
    pid: 26,
    lpSymbol: 'APESOX Solo',
    lpAddresses: {
      1666600000: '0x53051d5545745F600232a885a65479cA832198fb',
    },
    token: tokens.apesox,
    quoteToken: tokens.apesox,
  },
  {
    pid: 27,
    lpSymbol: 'SUSHI Solo',
    lpAddresses: {
      1666600000: '0xBEC775Cb42AbFa4288dE81F387a9b1A3c4Bc552A',
    },
    token: tokens.sushi,
    quoteToken: tokens.sushi,
  },

  {
    pid: 28,
    lpSymbol: 'BUSD-USDC',
    lpAddresses: {
      1666600000: '0x17D45ED0260337eb937D0Cf66A67e2367f52ADF1',
    },
    token: tokens.busd,
    quoteToken: tokens.busd,
  },
  {
    pid: 29,
    lpSymbol: 'USDC-ONEMOON',
    lpAddresses: {
      1666600000: '0x59Fc00Cde1dbF32263c0Fd632Aae4D24d3b84A85',
    },
    token: tokens.usdc,
    quoteToken: tokens.usdc,
  },
  {
    pid: 30,
    lpSymbol: 'bscBUSD-USDC',
    lpAddresses: {
      1666600000: '0xf583A7529829F9359E66696F3F54bC55aE086b47',
    },
    token: tokens.usdc,
    quoteToken: tokens.usdc,
  },
  {
    pid: 31,
    lpSymbol: 'USDC-USDT',
    lpAddresses: {
      1666600000: '0xb3072c553D4f93AE4fF4dCc3342ea723a305bfEF',
    },
    token: tokens.usdc,
    quoteToken: tokens.usdt,
  },
  {
    pid: 32,
    lpSymbol: 'bscSUSHI-1SUSHI',
    lpAddresses: {
      1666600000: '0x8310D078684efE5B91728AdD034Fcde73Ca0E6eE',
    },
    token: tokens.sushi,
    quoteToken: tokens.sushi,
  },
  // doge pools
  {
    pid: 33,
    lpSymbol: 'bscDOGE-ONE',
    lpAddresses: {
      1666600000: '0x15D93C5d7a535f64FAD62405510B2995E13d50d1',
    },
    token: tokens.doge,
    quoteToken: tokens.doge,
  },
  {
    pid: 34,
    lpSymbol: 'bscDOGE-hMOCHI',
    lpAddresses: {
      1666600000: '0xed37DC73A76336A74686504B7Ac9A820c76A8221',
    },
    token: tokens.cake,
    quoteToken: tokens.cake,
  },
  {
    pid: 35,
    lpSymbol: 'bscDOGE-ONEMOON',
    lpAddresses: {
      1666600000: '0x28ECE7402fC32d0D629e0116DbA6cB7cfDcfF5e4',
    },
    token: tokens.doge,
    quoteToken: tokens.doge,
  },
  {
    pid: 36,
    lpSymbol: 'bscDOGE-1BTC',
    lpAddresses: {
      1666600000: '0x927352ed0531D2e39311b5cf5715f1AeAba45E03',
    },
    token: tokens.doge,
    quoteToken: tokens.doge,
  },

  {
    pid: 37,
    lpSymbol: 'SAFEMOON-ONEMOON',
    lpAddresses: {
      1666600000: '0x430AF8e366d4b2795196B736Ba701D131D51E692',
    },
    token: tokens.safemoon,
    quoteToken: tokens.safemoon,
  },
  {
    pid: 38,
    lpSymbol: 'SAFEMOON-hMOCHI',
    lpAddresses: {
      1666600000: '0x2195b394fCC105C89BfEAA75D8A5267E82D3d76A',
    },
    token: tokens.cake,
    quoteToken: tokens.cake,
  },
  {
    pid: 39,
    lpSymbol: 'XYA-hMOCHI',
    lpAddresses: {
      1666600000: '0x603Fe676AD4C279c04511C98FBef103f582c0883',
    },
    token: tokens.cake,
    quoteToken: tokens.cake,
  },
]

export default farms
