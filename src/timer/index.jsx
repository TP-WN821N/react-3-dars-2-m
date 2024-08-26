import React, { Component } from 'react'

export default class index extends Component {
  state = {
    timer: [0, 0, 0],
    disabled: false,
    toggleTimer: null,
    time: [],
  }
  increasCount = (i) => {
    const { timer } = this.state
    if (timer[i] < 59 && timer[0] < 23) {
      timer[i]++
    } else {
      timer[i] = 0
    }
    this.setState({
      timer: timer
    })
  }
  decreasCount = (i) => {
    const { timer } = this.state
    if (timer[i] > 0) {
      timer[i] -= 1
    } else if (i == 0) {
      timer[i] = 23
    } else {
      timer[i] = 59
    }
    this.setState({
      timer: timer
    })
  }
  startTimer = () => {
    const { timer, disabled, toggleTimer } = this.state
    if (timer[0] > 0 || timer[1] > 0 || timer[2] > 0) {
      let a = setInterval(() => {
        const { timer } = this.state
        if (timer[2] > 0) {
          timer[2] -= 1
        } else {
          if (timer[1] > 0) {
            timer[1] -= 1
            timer[2] = 59
          } else {
            if (timer[0] > 0) {
              timer[0] -= 1
              timer[1] = 59
              timer[2] = 59
            } else {
              timer[0] = 0
              timer[1] = 0
              timer[2] = 0
            }
          }
        }
        this.setState({
          timer: timer,
        })
      }, 1000);
      this.setState({
        disabled: true,
        toggleTimer: a,
      })
    }
  }
  stopTimer = () => {
    const { toggleTimer, disabled } = this.state
    clearInterval(toggleTimer)
    this.setState({
      disabled: false
    })
  }
  clearTimer = () => {
    const { timer, toggleTimer, disabled } = this.state
    timer[0] = 0
    timer[1] = 0
    timer[2] = 0
    this.setState({
      timer: timer,
      disabled: false
    })
    clearInterval(toggleTimer)
  }
  intervalTimer = () => {
    const { timer, time } = this.state
    time.push([...timer])
    this.setState({
      time: time
    })
  }
  deleteTime = (i) => {
    const { time } = this.state
    time.splice(i, 1)
    this.setState({
      time: time
    })
  }
  render() {
    const { timer, disabled, time } = this.state
    return (
      <div className='flex justify-center mt-8'>
        <div className='w-[35%] bg-[#f6efef] p-5'>
          <div>
            <h1 className='text-3xl font-bold'>Timer</h1>
          </div>
          <div className='py-10 flex items-center gap-3 justify-center'>
            {
              timer.map((item, i) => {
                return <div className='flex flex-col items-center' key={i}>
                  <button onClick={() => this.increasCount(i)} className='flex text-xl w-6 h-6 border justify-center items-center'>+</button>
                  <p className='text-2xl'>{item}</p>
                  <button onClick={() => this.decreasCount(i)} className='flex text-xl w-6 h-6 border justify-center items-center'>-</button>
                </div>
              })
            }
          </div>
          <div className='flex gap-2'>
            <button disabled={disabled} onClick={this.startTimer} className='bg-green-600 text-white px-4 text-xl'>Start</button>
            <button onClick={this.stopTimer} className='bg-red-600 text-white px-4 text-xl'>Stop</button>
            <button onClick={this.clearTimer} className='bg-orange-400 text-white px-4 text-xl'>Clear</button>
            <button onClick={this.intervalTimer} className='bg-blue-600 text-white px-4 text-xl'>Interval</button>
          </div>
          <div className='flex flex-col gap-1'>
            {
              time.map((item, i) => {
                return <div className='flex justify-between items-center' key={i}>
                  <p className='text-xl'>{item.join(" : ")}</p>
                  <button onClick={() => this.deleteTime(i)} className='w-8 h-8 bg-red-600 flex justify-center items-center rounded'>
                    <i class="fa-solid fa-xmark text-white"></i>
                  </button>
                </div>
              })
            }
          </div>
        </div>
      </div>
    )
  }
}
