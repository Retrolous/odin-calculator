function add(...addArgs){
    return addArgs.reduce((a, b) => a + b, 0)
}

console.log(add(1, 2, 3))