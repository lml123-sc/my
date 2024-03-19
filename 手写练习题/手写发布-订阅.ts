class EventBus {
  handlers = {};
  constructor() {
    this.handlers = {};
  }

  public on(title: string, handler: Function) {
    handler[title].push(handler);
  }

  public off(title: string, handler: Function) {
    
  }

  public removeAll(title: string) {
    this.handlers = {};
  }

  public emit(title: string) {}
}

const events = new EventBus();

const start1Handler = () => {
  console.log("start1");
};

events.on("start", start1Handler);

events.on("start", () => {
  console.log("start2");
});

events.off("start", start1Handler);
events.removeAll("start");

events.emit("start");
