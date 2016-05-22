import moment from 'moment'
import React, { Component, PropTypes } from 'react'
import EventRecord  from '../model/EventRecord'

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
      this.updateDuration(props.end.time)
    }
  }

  componentWillUnmount() {
    this.intervals.forEach(clearInterval)
  }

  updateDuration(end = moment()) {
    // const dt = roundSeconds(moment().diff(this.props.start.time))
    this.setState({
      duration: roundSeconds(end.diff(this.props.start.time))
    })
  }

  timeDelta(a, b) {
    const d = new Date(Math.abs(a - b))
    return `${d.getUTCHours()}:${d.getUTCMinutes()}:${d.getUTCSeconds()}`
  }

  render() {
    return (
      <span>{moment(this.state.duration).utc().format('HH:mm:ss')}</span>
    )
  }
}
