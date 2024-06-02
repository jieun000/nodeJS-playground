function echo(message: any): any {
    console.log("in echo: ", message);
    return message;
}
type phone = { name: string, price: number, brand: string };
const myPhone = { name: "name", price: 1000, brand: "brand" };
echo(1);
echo("string");
echo(myPhone);

// 제네릭 함수: 함수의 매개변수와 결괏값의 타입을 
// 함수를 호출하는 시점(함수 선언 시점 X)에 정하는 기법
function genericEcho<T>(message: T): T {
    console.log(message);
    return message;
}
genericEcho(1); // 타입 미명시로 컴파일러가 타입 추론
genericEcho<string>("타입을 명시적으로 지정");
genericEcho<any>(myPhone); // any 타입은 제네릭을 쓸 이유가 없음
// genericEcho<string>(myPhone); // 타입이 달라서 에러


// 제네릭 인터페이스
interface ILabel<Type> {
    label: Type;
}
const stringLabel: ILabel<string> = {
    label: "Hello"
}
const numberLabel: ILabel<number> = {
    label: 100
}
const booleanLabel: ILabel<boolean> = {
    // label: 3.14 컴파일 에러
    label: false
}


// 제네릭 제약 조건
interface ICheckLength {
    length: number;
}                       // extends: 제약 조건 키워드
function echoWithLength<T extends ICheckLength>(message: T) {
    console.log(message);
    console.log(message.length);
}
echoWithLength("string");
echoWithLength([1, 2, 3]);
echoWithLength({length: 10});
// echoWithLength(10);


// @데코레이터: 클래스, 메서드 속성, 매개변수, 접근자(get, set)에 추가하는 특수 문법
// 메타-프로그래밍: 정보를 읽어서 동작을 변경 가능
// 여러 클래스 혹은 메서드에 같은 패턴의 코드가 나오는 경우 사용 시 유용함

// function HelloDecorator(constructor: Function) {
//     // 데코레이터 정의
//     console.log("Hello");
// }
// @HelloDecorator
// class DecoratorTest {
//     constructor() {
//         console.log("인스턴스 생성됨");
//     }
// }
// const decorator = new DecoratorTest();

type Constructor = new(...args: any[]) => {}; // 생성자 메서드 타입
function HelloDecorator(constructor: Constructor) {
    return class extends constructor { // 익명 클래스 반환
        constructor() { // 생성자 재정의
            console.log("Hello");
            super(); // DecoratorTest의 생성자 실행
        }
    }
}
@HelloDecorator
class DecoratorTest {
    constructor() {
        console.log("인스턴스 생성됨");
    }
}
const decoratorTest = new DecoratorTest();

// console.time("실행 시간"); // 실행 시간 측정 시간
// execute(); // 오래 걸리는 함수 실행
// function execute() {
//     setTimeout(() => {
//         console.log("실행");
//         console.timeEnd("실행 시간"); // 시간 측정 끝
//     }, 500);
// }

function Timer() { // 데코레이터 팩토리 함수
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        // 데코레이터
        const originalMethod = descriptor.value; // 메서드
        descriptor.value = function(...args: any[]) { // 메서드의 동작을 변경함
            console.time('Elapsed time');
            const result = originalMethod.apply(this, args); // 메서드 실행
            console.timeEnd('Elapsed time');
            return result;
        }
    }
}
class ElapsedTime {
    @Timer()
    hello() {
        console.log('Hello ElapsedTime');
    }
}
const elapsedTime = new ElapsedTime().hello();


// 맵드 타입mapped type: 기존의 타입으로 새로운 타입을 만들어내는 ts문법
// 기존 타입의 속성들을 배열처럼 사용해서 새로운 타입을 만드는 데 사용함
// { [key in <기존타입>] : <새로운 타입 속성의 타입> }
type Feature = { event: string; coupon: string; }; // 기능을 표현한 타입
// type FeaturePermission = { event?: boolean; coupon?: boolean; }; // 해당 기능에 대한 권한을 표현한 타입
type FeaturePermission = { [key in keyof Feature]?: boolean };

// 유틸리티 타입: Partial<> 선택 속성, Readonly<> 읽기 전용
type PartialFeature = Partial<Feature>; // 선택 가능 속성으로 모두 변경
type ReadonlyFeature = Readonly<Feature>;  // 읽기 전용 변경