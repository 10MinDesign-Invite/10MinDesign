"use client"
import CountUp from 'react-countup'

export const CountUpCustome = ({value,duration,decimals}:{value:number,duration?:number,decimals?:number}) => {
  return (
    <CountUp end={value} duration={duration ?? 2} separator=',' decimals={decimals} decimal="." />
  )
}
