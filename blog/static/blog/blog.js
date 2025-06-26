function resolvedCallback(data) {
  console.log('resolved with data' + data)
}

function rejectedCallback(message) {
  console.log('rejected data' + message)
}

const lazyAdd = function (a, b) {
  const doAdd = (resolve, reject) => {
    if (typeof a !== "number" || typeof b !== "number") {
      reject(" A and B must both be numbers")
    } else {
      const sum = a + b
      resolve(sum)
    }
  }
  return new Promise(doAdd)
}

const p = lazyAdd(3, 4)
p.then(resolvedCallback, rejectedCallback)
lazyAdd("nan", "zenga").then(rejectedCallback, rejectedCallback)