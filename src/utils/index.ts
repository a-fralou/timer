export const tickTimer = (fn: Function, delay: number) => {
  const start = new Date().getTime()
  let timeoutId: ReturnType<typeof setTimeout>
  let time = 0

  const loop = () => {
    time += 100

    const diff = new Date().getTime() - start - time

    timeoutId = setTimeout(() => {
      fn()
      loop()
    }, delay - diff)
  }

  const clearTickTimer = () => {
    clearTimeout(timeoutId)
  }

  loop()

  return { clearTickTimer }
}

export type TickTimerType = ReturnType<typeof tickTimer>
