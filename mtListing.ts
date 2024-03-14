class EventBus {
  constructor() {

  }

  public on() {

  }

  public off() {

  }

  public removeAll(name: string) {

  }

  public emit() {

  }
}

const events = new EventBus();

const start1Handler = () => {
  console.log('start1')
}

events.on('start', start1Handler)

events.on('start', () => {
  console.log('start2')
})

events.off('start', start1Handler)
events.removeAll('start')

events.emit('start')

