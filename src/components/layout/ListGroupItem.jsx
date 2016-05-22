import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { Link, IndexLink } from 'react-router'

import styles from './list-group.scss'

function getStyleName(props) {
  let style = 'list-group-item'
  if (props.active) style += ' active'
  return style
}

class ListGroupItem extends Component {
  static propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    active: PropTypes.bool.isRequired,
    lineHeight: PropTypes.string
  }

  static defaultProps = {
    to: null,
    href: null,
    active: false,
    lineHeight: null
  }

  constructor(props) {
    super(props)
    this.state = {
      styleName: getStyleName(props)
    }
  }

  get style() {
    if (this.props.lineHeight) {
      return {lineHeight: this.props.lineHeight}
    }
  }

  renderReactRouterLink() {
    const Class = this.props.to === '/' ? IndexLink : Link
    return (
      <Class to={this.props.to}
             style={this.style}
             styleName={this.state.styleName}>
        {this.props.children}
      </Class>)
  }

  renderElement() {
    return this.props.href
      ? // Render anchor element
      <a href={this.props.href}
         style={this.style}
         styleName={this.state.styleName}>
        {this.props.children}
      </a>
      : // Render list element
      <li style={this.style}
          styleName={this.state.styleName}>
        {this.props.children}
      </li>
  }

  render() {
    return this.props.to
      ? // Render React-Router Link
      this.renderReactRouterLink()
      :
      this.renderElement()
  }
}

export default CSSModules(ListGroupItem, styles)
