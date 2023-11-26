/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'
import { useTheme } from '@mui/material'
import FlexBetween from '@/components/FlexBetween'

type Props = {}
const Navbar = (props: Props) => {
  const { palette } = useTheme()

  return (
    <FlexBetween
      mb="0.25rem"
      p="0.5rem 0rem"
      color={palette.grey[300]}
    >
      HI
    </FlexBetween>
  )
}

export default Navbar
