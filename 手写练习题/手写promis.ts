class MyPromise {
  // private PromiseResult: null
  constructor(executor) {
    // 初始化this
    this.initBind();
    // 初始化值
    this.initValue();
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }
  initBind() {
    // 初始化this
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }
  initValue() {
    this.PromiseResult = null;
    this.PromiseState = "pending";
    this.onFulfilledCallbacks = []; // 保存成功回调
    this.onRejectedCallbacks = []; // 保存失败回调
  }
  resolve(value) {
    if (this.PromiseState !== "pending") return;
    // 如果执行resolve，状态变为fulfilled
    this.PromiseState = "fulfilled";
    // 终值变为value
    this.PromiseResult = value;
    // 执行保存的成功回调
    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()(this.PromiseResult);
    }
  }

  reject(reason) {
    if (this.PromiseState !== "pending") return;
    // 如果执行resolve，状态变为fulfilled
    this.PromiseState = "rejected";
    // 终值变为value
    this.PromiseResult = reason;
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(this.PromiseResult);
    }
  }

  then(onFulfilled, onRejected) {
    // 接收两个回调 onFulfilled, onRejected

    // 参数校验，确保一定是函数
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    let thenPromise = new MyPromise((resolve, reject) => {
      const resolvePromise = (cb) => {
        try {
          const x = cb(this.PromiseResult);
          if (this.PromiseResult === x) {
            throw new Error("不能返回自身");
          }
          if (x instanceof MyPromise) {
            // 如果返回值是Promise
            // 如果返回值是promise对象，返回值为成功，新promise就是成功
            // 如果返回值是promise对象，返回值为失败，新promise就是失败
            // 谁知道返回的promise是失败成功？只有then知道
            x.then(resolve, reject);
          } else {
            resolve(x);
          }
        } catch (error) {
          // 处理报错
          reject(error);
          throw new Error(error);
        }
      };
    });

    if (this.PromiseState === "fulfilled") {
      // 如果当前为成功状态，执行第一个回调
      onFulfilled(this.PromiseResult);
    } else if (this.PromiseState === "rejected") {
      // 如果当前为失败状态，执行第二哥回调
      onRejected(this.PromiseResult);
    } else if (this.PromiseState === "pending") {
      // 如果状态为待定状态，暂时保存两个回调
      this.onFulfilledCallbacks.push(onFulfilled.bind(this));
      this.onRejectedCallbacks.push(onRejected.bind(this));
    }

    // 返回这个包装的Promise
    return thenPromise;
  }

  // public catch() {
  //   return this
  // }

  // public finally() {
  //   return this
  // }
}

// const fn = async () => {
//   const p = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//       if (Math.random() > 0.5) {
//         resolve('hello')
//       } else {
//         reject('hello')
//       }
//     }, 1000)
//   })
//   p.then((res) => {
//     console.log(res)
//   }).catch((err) => {
//     console.log(err)
//   })
// }
// const test3 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("成功");
//   }, 1000);
// }).then(
//   (res) => console.log(res),
//   (err) => console.log(err)
// );


const test3 = new Promise((resolve, reject) => {
  resolve(100) // 输出 状态：成功 值： 200
  // reject(100) // 输出 状态：成功 值：300
}).then(res => 2 * res, err => 3 * err)
  .then(res => console.log('成功', res), err => console.log('失败', err))
