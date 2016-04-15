import React, { Component, PropTypes } from 'react'
import { TimeRecord } from '../model'

export default class TimeView extends Component {
  static propTypes = {
    start: PropTypes.instanceOf(TimeRecord).isRequired,
    end: PropTypes.instanceOf(TimeRecord).isRequired
  };

  constructor(props) {
    super(props)
    this.state = {
      endTime: props.end.time
    }
  }

  componentWillMount() {
    this.intervals = []
  }

  componentDidMount() {
    // A TimeRecord without an event is interpreted as the current time.
    if (!this.props.end.event) {
      this.intervals.push(setInterval(this.updateEndTime.bind(this), 1000))
    }
  }

  componentWillReceiveProps(props) {
    if (!!props.end.event) {
      this.intervals.forEach(clearInterval)
    }
  }

  componentWillUnmount() {
    this.intervals.forEach(clearInterval)
  }

  updateEndTime() {
    this.setState({endTime: new Date()})
  }

  timeDelta(a, b) {
    const d = new Date(Math.abs(a - b))
    return `${d.getUTCHours()}:${d.getUTCMinutes()}:${d.getUTCSeconds()}`
  }

  render() {
    return (
      <div>
        <span>duration: {this.timeDelta(this.props.start.time, this.state.endTime)}</span>
      </div>
    )
  }
}
