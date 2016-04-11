export const PUNCH_CLOCK = Symbol('punch clock')
export const CLEAR_CLOCK = Symbol('clear clock')

const punchClockAction = (payload = null) => ({
  type: PUNCH_CLOCK,
  payload
})

const clearClockAction = (payload = null) => ({
  type: CLEAR_CLOCK,
  payload
})

export function punchClock(time = new Date()) {
  return (dispatch) => {
    dispatch(punchClockAction(time))
  }
}

export function clearClock(time = new Date()) {
  return (dispatch) => {
    dispatch(clearClockAction(time))
  }
}
