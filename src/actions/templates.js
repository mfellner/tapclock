import logger from '../debug'
import { Template } from '../model'

const log = logger('actions:templates')

export const CREATE_TEMPLATE = Symbol('create template')
export const DELETE_TEMPLATE = Symbol('delete template')

const createTemplateAction = (payload = null) => ({
  type: CREATE_TEMPLATE,
  payload
})

const deleteTemplateAction = (payload = null) => ({
  type: DELETE_TEMPLATE,
  payload
})

export function createTemplate(custom_type) {
  log('create template "%s"', custom_type)
  return (dispatch) => {
    dispatch(createTemplateAction(new Template({custom_type})))
  }
}

export function deleteTemplate(template_id) {
  log('delete template %s', template_id)
  return (dispatch) => {
    dispatch(deleteTemplateAction(template_id))
  }
}
