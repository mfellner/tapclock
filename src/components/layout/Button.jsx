import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { Link, IndexLink } from 'react-router'

import styles from './button-group.scss'

function getStyleName(props) {
  const isLink = props.to || props.href
  let style = `btn btn-${props.bsStyle}`
  if (props.outline) style += `-outline`
  if (props.bsSize) style += ` btn-${props.bsSize}`
  if (props.block) style += ' btn-block'
  if (props.active) style += ' active'
  if (props.disabled && isLink) style += ' disabled'
  if (props.pullRight) style += ` pull-${props.pullRight}-right`
  if (props.margin) style += ` m-a-${props.margin}`
  if (props.marginTop) style += ` m-t-${props.marginTop}`
  if (props.marginRight) style += ` m-r-${props.marginRight}`
  if (props.marginBottom) style += ` m-b-${props.marginBottom}`
  if (props.marginLeft) style += ` m-l-${props.marginLeft}`
  return style
}

class Button extends Component {
  static propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,
    bsStyle: PropTypes.string.isRequired,
    bsSize: PropTypes.oneOf([null, 'sm', 'lg']),
    outline: PropTypes.bool.isRequired,
    block: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    pullRight: PropTypes.oneOf([null, 'xs', 'sm', 'md', 'lg', 'xl']),
    margin: PropTypes.number,
    marginTop: PropTypes.number,
    marginRight: PropTypes.number,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number
  }

  static defaultProps = {
    bsStyle: 'secondary',
    outline: false,
    block: false,
    active: false,
    disabled: false
  }

  constructor(props) {
    super(props)
    this.state = {
      styleName: getStyleName(props)
    }
  }

  renderReactRouterLink() {
    const Class = this.props.to === '/' ? IndexLink : Link
    return (
      <Class role="button"
             to={this.props.to}
             styleName={this.state.styleName}>
        {this.props.children}
      </Class>)
  }

  renderElement() {
    return this.props.href
      ? // Render anchor element
      <a role="button"
         href={this.props.href}
         styleName={this.state.styleName}>
        {this.props.children}
      </a>
      : // Render button element
      <button type="button"
              disabled={this.props.disabled}
              onClick={this.props.onClick}
              styleName={this.state.styleName}>
        {this.props.children}
      </button>
  }

  render() {
    return this.props.to
      ? // Render React-Router Link
      this.renderReactRouterLink()
      :
      this.renderElement()
  }
}

export default CSSModules(Button, styles, {allowMultiple: true})
