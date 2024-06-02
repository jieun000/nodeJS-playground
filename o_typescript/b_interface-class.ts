// type
// 기존 타입 또는 새 타입을 생성하는 데 사용
// 다른 타입 또는 인터페이스를 상속하거나 구현 불가
// 리터럴 타입, 유니온 타입, 인터섹션 타입 사용 가능
// 간단한 타입 별칭을 생성할 때 적합
type BookType = { // BookType 타입
    title: string;
    price: number;
    author: string;
}
interface Book { // Book 인터페이스
    title: string;
    price: number;
    author: string;
}
// interface
// 객체 타입의 구조를 정의하는 데 사용
// 다른 인터페이스를 상속하거나 구현 가능
// extends 키워드로 인터페이스 확장 가능
// 잘 정의된 구조의 객체 타입을 정의할 때 적합
let bookType: BookType = { // BookType 타입 객체 할당
    title: "백엔드 개발자 되기",
    price: 10000,
    author: "박승규",
}
let book: Book = { // Book 인터페이스 객체 할당
    title: "백엔드 개발자 되기",
    price: 10000,
    author: "박승규",
}


// 인터페이스의 선택적 속성 & 읽기 전용 속성
interface Car {
    name: string; price: number; brand: string;
    options?: string[] // 선택적 속성
}
let avante: Car = {
    name: "아반떼",
    price: 1500,
    brand: "현대",
    options: ["에어컨", "내비게이션"]
}
let morning: Car = {
    name: "모닝",
    price: 2000,
    brand: "기아"
}

interface Citizen {
    id: string; name: string; region: string;
    readonly age: number;
}
let cimin: Citizen = {
    id: "123456",
    name: "박승규",
    region: "경기",
    age: 40,
}
// cimin.age = 39; 읽기 속성이라 에러


// 인터페이스 확장
interface WebtoonCommon {
    // 공통으로 사용할 인터페이스
    title: string;
    createdDate: Date;
    updatedDate: Date;
}
interface Episode extends WebtoonCommon {
    episodeNumber: number;
    seriesNumber: number;
}
interface Series extends WebtoonCommon {
    sereisNumber: number;
    author: string;
}
const episode: Episode = {
    title: "에피소드 객체",
    createdDate: new Date(),
    updatedDate: new Date(),
    episodeNumber: 1,
    seriesNumber: 123,
}
const series: Series = {
    title: "시리즈 객체",
    createdDate: new Date(),
    updatedDate: new Date(),
    sereisNumber: 123,
    author: "작가",
}


// 인터페이스 병합
interface Clock {
    time: Date;
}
interface Clock {
    brand: string;
}
interface Clock {
    price: number;
}
// brand, price 속성 부재로 에러
// const wrongClock: Clock = {
//     time: new Date()
// }
const clock: Clock = { // Clock 인터페이스 병합
    time: new Date(),
    brand: "놀렉스",
    price: 10000,
}


// 클래스의 메서드와 속성
class Hello { // 클래스 선언부
    // 생성자 메서드
    constructor() {
        this.sayHello("생성자에서 실행");
    }
    sayHello(message: string) {
        console.log(message);
    }
}
const hello = new Hello();
hello.sayHello("안녕하세요!");


// 인터페이스를 구현한 클래스
interface IClicker {
    count: number;
    click(): number;
}
class Clicker implements IClicker {
    // 인터페이스를 상속하면서 인터페이스 미구현이면 에러 발생
    count: number = 0;
    click(): number {
        this.count += 1;
        console.log(`Click! [count] : ${this.count}`);
        return this.count;
    }
}
const clicker = new Clicker();
clicker.click();
clicker.click();
clicker.click();


// 추상 클래스
abstract class Logger {
    prepare() {
        console.log("====================");
        console.log("로그를 남기기 위한 준비");
    };
    log(message: string) {
        // 로그를 남기는 절차를 정의한 메서드
        this.prepare();
        this.execute(message);
        this.complete();
    };

    abstract execute(message: string): void;
    complete() {
        console.log("작업 완료");
        console.log("");
    }
}
class FileLogger extends Logger {
    filename: string;
    constructor(filename: string) {
        super();
        this.filename = filename;
    }
    execute(message: string): void {
        console.log(`[${this.filename}] > `, message);
    }
}
class ConsoleLogger extends Logger {
    execute(message: string): void {
        console.log(message);
    }
}
const fileLogger = new FileLogger("test.log");
fileLogger.log("파일에 로그 남기기 테스트");
const consoleLogger = new ConsoleLogger();
consoleLogger.log("로그 남기기");



// 클래스의 접근 제어자
// public: 모든 곳에서 접근 가능(기본값)
// protected: 클래스 내부 혹은 자녀 클래스에서만 접근 가능
// pricate: 클래스 내부에서만 접근 가능
class Parent {
    // 부모 클래스
    openInfo = "공개 정보";
    protected lagacy = "유산";
    private parentSecret = "부모의 비밀 정보";

    checkMySecret() {
        // private에 접근 가능
        console.log(this.parentSecret);
    }
}
class Child extends Parent {
    // 자녀 클래스, 부모 상속
    private secret = "자녀의 비밀 정보";

    checkLagacy() {
        // 부모클래스의 메서드 호출시는 super, 프로터피 호출시는 this
        console.log(this.lagacy);
    }
    // checkParentSecret() {
    //     부모의 private 변수에는 접근 불가능
    //     console.log(super.parentSecret);
    // }
}
class Someone {
    checkPublicInfo() {
        const p = new Parent();
        console.log(p.openInfo);
        // protected와 private 접근 불가
        // console.log(p.lagacy);
        // console.log(p.parentSecret)
    }
}