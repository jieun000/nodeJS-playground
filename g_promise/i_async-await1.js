async function myName() {
    return "Test";
}
// console.log(myName());

async function showName() {
    const name = await myName();
    console.log(name);
}
console.log(showName());



function awaitOneSecond(msg) {
    return new Promise((resolve, _)=> {
        setTimeout(() => resolve(`${msg}`), 1000);
    });
}

async function countOneToTen() {
    for(let x of [...Array(10).keys()]) {
        let result = await awaitOneSecond(`${x + 1}초 대기 중...`);
        console.log(result);
    }
    console.log("\완료");
}
countOneToTen();