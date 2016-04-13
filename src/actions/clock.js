import { Record } from '../model'

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

export function punchClock(event) {
  return (dispatch) => {
    dispatch(punchClockAction(new Record({event, time: new Date()})))
  }
}

export function clearClock() {
  return (dispatch) => {
    dispatch(clearClockAction())
  }
}
