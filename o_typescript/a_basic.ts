// npm i -g typescript
// tsc --version
// tsc --init
// node .\a_basic.ts
// npm i -g ts-node
// ts-node .\a_basic.ts

var message = "Hello World";
console.log(message);


// 변수 선언
function foo() {
    if(true) var a = 10;
    return a;
}
console.log(foo());

function bar() {
    // if(true) let b = 10;
    return "let은 block 스코프로 동작(const도)";
}
console.log(bar());


// 타입 애너테이션(type annotations)
let username: string = "korea";
let height: number = 123;
let isConditionGood: boolean = true; // 불리언
console.log(username, height, isConditionGood);

let myInfo: { name: string, height: number; isConditionGood: boolean; gender?:string; } = {
    name: "korea", height: 123, isConditionGood: true 
}
console.log("type annotations myInfo:", myInfo);

function printMessage(message: string, isCritical?: boolean): void {
    console.log(message);

    if(isCritical) console.log("isCritical:", message);
}
printMessage("메시지", true);


// 기본 타입
const one: number = 1;
const myName: string = "what your's name~? "
const trueOrFalse: boolean = true;
const unIntended: undefined = undefined; // 의도하지 않은 값의 부재(변수에 값이 할당되지 않은 경우)
const nullable: null = null; // 의도적으로 값이 없음
const bigNumber: bigint = 123456789012345678901234567890n;
const symbolValue: symbol = Symbol("symbol"); // 불변이면서 유일한 값
console.log(one + 1);
console.log(myName + "my name is ~");
console.log(trueOrFalse ? "true" : "false");
console.log(bigNumber / 100000000000n);
console.log(symbolValue === Symbol("symbol"));


// 배열과 튜플
const numbers1: number[] = [1, 2, 3, 4, 5];
const numbers2: number[] = [6, 7, 8, 9, 10];
const stringArray: Array<string> = ["a", "b", "c", "d", "e"];
const oneToTen = [...numbers1, ...numbers2];
console.log(`스프레드 연산자로 합치기 가능: ${oneToTen}`);

const idols: { name: string, birth: number }[] = [ // 객체 배열 타입
    { name: "이름1", birth: 2024 },
    { name: "이름2", birth: 2023 },
    { name: "이름3", birth: 2022 },
];
const gameConsoleArray: Array<{ name: string; launch: number }> = [ // 배열의 원소가 객체인 타입
    { name: "이름4", launch: 2021 },
    { name: "이름5", launch: 2020 },
]
console.log(idols, gameConsoleArray);

const myTuple: [string, number] = ["name", 123];
function printMyInfo(label: string, info: [string, number]): void {
    console.log(`[${label}]`, ...info);
}
printMyInfo("튜플 테스트, 튜플은 함수의 매개변수가 여러 개일 때 유용함", myTuple);
function fetchUser(): [string, number] {
    return ["name", 123];
}
const [fetchName, fetchHeight] = fetchUser(); // 구조 분해 할당
console.log("fetchUser:", fetchName, fetchHeight);


// any, boid, never
// let anyValue = 10;
// anyValue = "컴파일 에러";
let anyValue: any = 10;
anyValue = "타입 추론";
anyValue = true;

function print(value: any): void {
    console.log("void는 함수의 결괏값이 없을 때");
}
function throwError(message: string): never {
    throw new Error("never는 의도적으로 값을 반환하지 않을 때. 예외 발생이나 무한 루프 함수");
}
function infiniteLoop(): never {
    while(true) {}
}


// 유니온 타입과 내로잉
let unionType: number | string | boolean = 10;
printAny(unionType);
unionType = "union type";
printAny(unionType);
unionType = true;
printAny(unionType);
console.log("내로잉, 타입 가드type guard. { typeof, instanceof, in }");
function printAny(value: number | string | boolean): void {
    if(typeof value === "number") console.log(value.toExponential(3));
    else if(typeof value === "string") console.log(value.toUpperCase());
    else if(typeof value === "boolean") console.log(value ? "참" : "거짓");
}


// 타입 별칭
type nsb = number | string | boolean;
type nullableNsb = nsb | null | undefined;
let nsbType: nsb = 10;
let nullType: nullableNsb = null;


// 인터섹션 타입(and)
type cup = { size: string; };
type brand = { brandName: string; };
type brandedCup = cup & brand; // cup이면서 brand가 있는 타입
let starbucksGrandsSizeCup: brandedCup = {
    size: "grande",
    brandName: "Cafe",
}


// 리터럴 타입literal type
type CoffeeSize = "small" | "medium" | "large";
// let myCoffeeSize: CoffeeSize = "tall"; 에러
let myCoffeeSize: CoffeeSize = "small";
 

// 함수 타입
function echo(message: string): string {
    console.log(message);
    return message;
}
const funcEcho1 = echo;
funcEcho1("funcEcho1 함수 타입");
type FuncEcho2 = (message: string) => string;
const funcEcho2: FuncEcho2 = echo;
funcEcho1("funcEcho2 test");
type FuncEcho3 = {
    (message: string): string;
}
const funcEcho3: FuncEcho3 = echo;
funcEcho3("funcEcho3 test"); // 함수의 타입을 자동으로 추론해 실행
// funcEcho3(123456);