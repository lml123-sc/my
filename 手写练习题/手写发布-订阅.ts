class EventBus {
  constructor() {
    this.handlers = {};
  }

  on(title, handler) {
    if (!this.handlers[title]) {
      this.handlers[title] = [];
    }
    this.handlers[title].push(handler);
  }

  off(title, handler) {
    if (!this.handlers[title]) {
      return;
    }
    const index = this.handlers[title].indexOf(handler);
    if (index !== -1) {
      this.handlers[title].splice(index, 1);
    }
  }

  removeAll(title) {
    // this.handlers = {};
    if(!this.handlers[title]) {
      return;
    }
    this.handlers[title] = []
  }

  emit(title, ...args) {
    this.handlers[title]?.forEach((item) => {
      // console.log('==item==', item)
      item({...args});
    });
  }
}

const events = new EventBus();

const start1Handler = (e) => {
  console.log("start1",e[1]);
};
const start2Handler = (e) => {
  console.log("start2",e);
};

events.on("start", start1Handler);
events.on("start", start2Handler);
events.on("start1", start1Handler);
events.on("start3", start2Handler);

// events.on("start", () => {
//   console.log("start2");
// });

// events.off("start", start1Handler);
// events.removeAll("start");

events.emit("start",1,2);
// events.emit("start1");
