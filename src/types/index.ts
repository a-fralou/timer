export interface ITimer {
  id: number
  time: number
  isRunning: boolean
}

export type TimerType = {
  timer: ITimer
  onReset: () => void
}
