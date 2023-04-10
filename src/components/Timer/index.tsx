import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { TickTimerType, tickTimer } from '../../utils'
import { TimerType } from '../../types'

export const Timer: React.FC<TimerType> = ({ timer, onReset }) => {
  const [time, setTime] = useState(timer.time)
  const [isRunning, setIsRunning] = useState(timer.isRunning)

  const getState = isRunning ? 'Pause' : 'Start'
  const getFormat = format(time, 'mm:ss.SSS')

  useEffect(() => {
    let tick: TickTimerType

    if (isRunning) {
      tick = tickTimer(() => {
        setTime((prevTime) => prevTime + 100)
      }, 100)
    }

    return () => {
      if (tick) {
        return tick.clearTickTimer()
      }
    }
  }, [isRunning])

  const handleStartPause = () => setIsRunning(!isRunning)
  const handleReset = () => {
    setTime(0)
    onReset()
  }

  return (
    <div className='timer'>
      <div>{getFormat}</div>
      <button onClick={handleStartPause}>{getState}</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}
