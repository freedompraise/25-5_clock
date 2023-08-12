import React from "react";

class Break extends React.Component {
  constructor(props) {
    super(props);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
  }

  incrementBreak() {
    if (
      this.props.breakLength < 10 &&
      this.props.breakLength < this.props.sessionLength
    ) {
      // add condition to prevent breakLength from going above 10 minutes or sessionLength
      this.props.setBreakLength(this.props.breakLength + 1);
    }
  }
  decrementBreak() {
    if (this.props.breakLength > 1) {
      // add condition to prevent breakLength from going below 1 minute
      this.props.setBreakLength(this.props.breakLength - 1);
    }
  }

  render() {
    return (
      <div className="p-4 rounded-md shadow-md text-center">
        <p className="text-lg font-semibold">Break Length</p>
        <div className="flex justify-center items-center mt-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-l"
            onClick={this.decrementBreak}
          >
            -
          </button>
          <p className="text-xl mx-4">{this.props.breakLength}</p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r"
            onClick={this.incrementBreak}
          >
            +
          </button>
        </div>
      </div>
    );
  }
}
export default Break;
