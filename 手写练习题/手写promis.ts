class MyPromise {
  private status: 'pending' | 'fulfilled' | 'rejected'

  constructor(executor) {
    const resolve = () => {}
    const reject = () => {}
    executor(resolve, reject)
  }

  public then() {
    return this
  }

  public catch() {
    return this
  }

  public finally() {
    return this
  }
}

const fn = async () => {
  const p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve('hello')
      } else {
        reject('hello')
      }
    }, 1000)
  })
  p.then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}