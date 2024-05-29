
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<아이디>:<패스워드>@<클러스터정보>";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);



// const client = new MongoClient(uri);

// async function run() {
//     await client.connect();
//     const adminDB = client.db('test').admin();
//     const listDatabases = await adminDB.listDatabases();
//     console.log(listDatabases);
//     return "OK";
// }
// run().then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());



const client = new MongoClient(uri, { useNewUrlParser: true });

async function main() {
    try {
        await client.connect();
        console.log("MongoDB 접속 성공");
        // test 데이터베이스의 person 컬렉션 가져오기
        const collection = client.db('test').collection('person');

        // 문서 하나 추가
        await collection.insertOne({ name: 'testName', age: 28 });
        console.log("문서 추가 완료");

        // 문서 찾기
        const documents = await collection.find({ name: 'testName' }).toArray();
        console.log("찾은 문서: ", documents);

        // 문서 갱신
        await collection.updateOne({ name: 'testName' }, { $set: { age: 48} });
        console.log("문서 업데이트");

        // 갱신된 문서 확인
        const updatedDocuments = await collection.find({ name: 'testName' }).toArray();
        console.log("갱신된 문서: ", updatedDocuments);

        // 문서 삭제하기
        // await collection.deleteOne({ name: 'testName' });
        // console.log("문서 삭제");

        await client.close();
    } catch(err) {
        console.error(err);
    }
}

main();