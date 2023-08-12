import React from "react";
import Sound from "./Sound";
import alarmSound from "../assets/sounds/sound.mp3";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: this.props.sessionLength * 60, // in seconds
      pomodorosCompleted: 0,
      isSession: true, // track whether the timer is in session or break mode
      isPlayingAlarm: false, // track whether the alarm is playing
    };
    this.timer = null;
    this.startStopTimer = this.startStopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Update timer when the sessionLength prop changes
    if (this.props.sessionLength !== prevProps.sessionLength) {
      this.resetTimer();
    }
  }

  startStopTimer = () => {
    this.setState({
      isPlayingAlarm: false,
    });
    if (this.props.isTimerRunning) {
      clearInterval(this.timer); // stop the timer
      this.props.setIsTimerRunning(false);
    } else {
      this.timer = setInterval(this.tick, 1000); // start the timer
      this.props.setIsTimerRunning(true);
    }
  };

  resetTimer = () => {
    clearInterval(this.timer); // stop the timer
    this.setState({
      timeLeft: this.props.sessionLength * 60,
      isSession: true,
      isPlayingAlarm: false,
    });
    this.props.setIsTimerRunning(false);
  };

  tick = () => {
    if (this.state.timeLeft > 0) {
      this.setState({
        timeLeft: this.state.timeLeft - 1,
        // play the alarm if the timer is at :10
        isPlayingAlarm:
          this.state.timeLeft === 11 && !this.state.isPlayingAlarm
            ? true
            : false,
      });
    } else {
      clearInterval(this.timer); // stop the timer

      this.setState({
        timeLeft: this.state.isSession // specify the time left based on the mode, ie. session or break
          ? this.pomodorosCompleted % 3 === 0 // specify the break length based on the number of pomodoros completed
            ? this.props.setBreakLength(3 * this.props.breakLength)
            : this.props.breakLength * 60
          : this.props.sessionLength * 60,
        pomodorosCompleted: !this.state.isSession
          ? this.state.pomodorosCompleted + 1 // increase the number of pomodoros completed if the timer was in break mode
          : this.state.pomodorosCompleted,
        isSession: !this.state.isSession, // switch to break mode if the timer was in session mode, or vice versa
      });
      // restart the timer if the auto switch is enabled
      if (this.props.isTimerRunning) {
        this.timer = setInterval(this.tick, 1000);
      }
    }
  };

  formatTime = (timeInseconds) => {
    const minutes = Math.floor(timeInseconds / 60);
    const remainingSeconds = Math.floor(timeInseconds % 60);
    return `${minutes < 10 ? 0 : ""}${minutes}:${
      remainingSeconds < 10 ? 0 : ""
    }${remainingSeconds}`;
  };

  render() {
    return (
      <div className="rounded-lg border bg-blue-800 p-4 text-center">
        <p className="text-lg font-semibold mb-2" id="timer-label">
          Session
        </p>
        <p className="text-4xl mb-4" id="time-left">
          {this.formatTime(this.state.timeLeft)}
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mb-2"
          id="start_stop"
          onClick={this.startStopTimer}
        >
          Start/Stop
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full"
          id="reset"
          onClick={this.resetTimer}
        >
          Reset
        </button>
        {/* Play the alarm sound when isPlayingAlarm is true */}
        {this.state.isPlayingAlarm && (
          <Sound src={alarmSound} autoplay={true} />
        )}
      </div>
    );
  }
}

export default Timer;
