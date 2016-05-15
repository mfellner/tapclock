import { DEFAULT_TEMPLATES } from '../model'
import { CREATE_TEMPLATE, DELETE_TEMPLATE } from '../actions/templates'

export default function templates(state = DEFAULT_TEMPLATES, action) {
  switch (action.type) {
    case CREATE_TEMPLATE:
      return state.set(action.payload.get('_id'), action.payload)
    case DELETE_TEMPLATE:
      return state.delete(action.payload)
    default:
      return state
  }
}
