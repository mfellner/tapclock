import moment from 'moment'
import React, { Component, PropTypes } from 'react'
import { EventRecord } from '../model'

function roundSeconds(millis) {
  return Math.round(millis / 1000) * 1000
}

export default class EventTimeView extends Component {
  static propTypes = {
    start: PropTypes.instanceOf(EventRecord).isRequired,
    end: PropTypes.instanceOf(EventRecord).isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      duration: roundSeconds(props.end.time.diff(props.start.time))
    }
  }

  componentWillMount() {
    this.intervals = []
  }

  componentDidMount() {
    if (this.props.end.isNow) {
      this.intervals.push(setInterval(this.updateDuration.bind(this), 1000))
    }
  }

  componentWillReceiveProps(props) {
    if (!props.end.isNow) {
      this.intervals.forEach(clearInterval)
    }
  }

  componentWillUnmount() {
    this.intervals.forEach(clearInterval)
  }

  updateDuration() {
    const dt = roundSeconds(moment().diff(this.props.start.time))
    this.setState({duration: dt})
  }

  timeDelta(a, b) {
    const d = new Date(Math.abs(a - b))
    return `${d.getUTCHours()}:${d.getUTCMinutes()}:${d.getUTCSeconds()}`
  }

  render() {
    return (
      <span>time: {moment(this.state.duration).utc().format('HH:mm:ss')}</span>
    )
  }
}
