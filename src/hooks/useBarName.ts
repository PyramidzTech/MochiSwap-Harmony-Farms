import { useEffect, useState, useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useBar } from './useContract'

export const useBarName = () => {
  const contract = useBar()
  // let [name] = useState()
  useEffect(() => {
    const getFees = async () => {
      const name = await contract.methods.symbol().call()
      return name
    }
    getFees()
  }, [contract])
}

export default useBarName
