import logger from '../debug'

const log = logger('actions:store')

export const CLEAR_STORE = Symbol('clear store')

const clearStoreAction = () => ({
  type: CLEAR_STORE,
  payload: null
})

export function clearStore() {
  log('clear store')
  return (dispatch) => {
    dispatch(clearStoreAction())
    localStorage.removeItem(STORAGE_KEY)
  }
}
