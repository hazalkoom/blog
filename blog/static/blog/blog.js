class Greeter {
  constructor (name) {
    this.name = name
  }
  getGreeting() {
    if (this.name === undefined) {
      return 'hello, no name'
    }
    return 'hello, ' + this.name
  }

  showGreeting(greetingMessage) {
    console.log(greetingMessage)
  }

  greet () {
    this.showGreeting(this.getGreeting())
  }
}

class DelayGreeter extends Greeter {
  constructor(name, delay) {
    super(name)
    if(delay !== undefined) {
      this.delay = delay
    }
  }

  greet() {
    setTimeout(
      () => {
      this.showGreeting(this.getGreeting())
    }, this.delay
    )
    
  }
}


const dg2 = new DelayedGreeter('Patchy 2 Seconds')
dg2.greet()

const dg1 = new DelayedGreeter('Patchy 1 Second', 1000)
dg1.greet()