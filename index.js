function filterRange(arr, a, b){
    return arr.filter((input) => input >= a && input <= b);
}

function filterRangeInPlace(arr, a, b){
    arr.foreach((item) => {if(a < item || b > item){arr.splice(1, 1)}})
}

function sort(arr){
    arr.sort((a, b) => b - a)
}

function sorter(arr){
    arr.slice().sort();
}

function namer(arr){
    arr.map((item) => item.name)
}

function sortByAge(users){
    users.sort((a, b) => a.age - b.age)
}

function shuffleArray(arr){
    arr.sort((a, b) => Math.random() - 0.5)
}

function avgAge(arr){
    sum = arr.reduce((prev, current) => prev + current.age, 0);
    sum /= arr.length;
}

function unique(arr){
    let uniqueArr = [];
    for(let i = 0; i < arr.length; i++){
        if(!uniqueArr.includes(arr[i])){
            uniqueArr.push(arr[i])
        }
    }
    return uniqueArr;
}