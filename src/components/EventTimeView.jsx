import moment from 'moment'
import React, { Component, PropTypes } from 'react'
import { EventRecord, EVENT_NOW } from '../model'

export default class EventTimeView extends Component {
  static propTypes = {
    start: PropTypes.instanceOf(EventRecord).isRequired,
    end: PropTypes.instanceOf(EventRecord).isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      duration: props.end.time.diff(props.start.time)
    }
  }

  componentWillMount() {
    this.intervals = []
  }

  componentDidMount() {
    // A EventRecord without a name is interpreted as the current time.
    if (!this.props.end.name) {
      this.intervals.push(setInterval(this.updateDuration.bind(this), 1000))
    }
  }

  componentWillReceiveProps(props) {
    if (!!props.end.name) {
      this.intervals.forEach(clearInterval)
    }
  }

  componentWillUnmount() {
    this.intervals.forEach(clearInterval)
  }

  updateDuration() {
    this.setState({duration: moment().diff(this.props.start.time)})
  }

  timeDelta(a, b) {
    const d = new Date(Math.abs(a - b))
    return `${d.getUTCHours()}:${d.getUTCMinutes()}:${d.getUTCSeconds()}`
  }

  render() {
    return (
      <div>
        <span>duration: {moment(this.state.duration).utc().format('HH:mm:ss')}</span>
      </div>
    )
  }
}
