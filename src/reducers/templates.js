import Template from '../model/Template'
import { CREATE_TEMPLATE, DELETE_TEMPLATE } from '../actions/templates'
import { CLEAR_STORE } from '../actions/store'

export default function templates(state = Template.defaults(), action) {
  switch (action.type) {
    case CREATE_TEMPLATE:
      return state.set(action.payload.get('_id'), action.payload)
    case DELETE_TEMPLATE:
      return state.delete(action.payload)
    case CLEAR_STORE:
      return Template.defaults()
    default:
      return state
  }
}
