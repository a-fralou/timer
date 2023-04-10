import React, { useState, useEffect } from 'react'
import { Timer } from '../Timer'
import { ITimer } from '../../types'

export const Tracking: React.FC = () => {
  const [timers, setTimers] = useState<ITimer[]>([])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const now = Date.now()
      const maxDrift = 10000
      const drift = Math.abs(
        now - timers.reduce((prev, curr) => prev + curr.time, 0)
      )
      if (drift > maxDrift) {
        setTimers([])
        alert('Timer drift too large. All timers have been reset.')
      }
    }, 24 * 60 * 60 * 1000)

    return () => clearTimeout(timeoutId)
  }, [timers])

  const handleAddTimer = () => {
    setTimers((prev) => [
      ...prev,
      { id: timers.length, time: 0, isRunning: false }
    ])
  }

  const handleRemoveTimer = () => {
    setTimers((prev) => prev.slice(0, prev.length - 1))
  }

  const handleResetTimer = (id: number) => {
    setTimers((prev) =>
      prev.map((timer) => {
        if (timer.id === id) {
          return { ...timer, time: 0 }
        } else {
          return timer
        }
      })
    )
  }

  return (
    <div className='tracking'>
      <div className='col actions'>
        <button onClick={handleAddTimer}>Add Timer</button>
        <button onClick={handleRemoveTimer}>Remove</button>
      </div>
      <div className='row'>
        {timers.map((timer) => (
          <div className='col'>
            <Timer
              key={timer.id}
              timer={timer}
              onReset={() => handleResetTimer(timer.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
