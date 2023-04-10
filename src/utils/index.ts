export const tickTimer = (fn: Function, delay: number) => {
  const start = Date.now()
  let timeoutId: ReturnType<typeof setTimeout>
  let time = 0

  const loop = () => {
    time += 100

    const diff = Date.now() - start - time

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
