const {MongoClient} = require ("mongodb");

const client = new MongoClient(process.env.MONGODB_URL);

module.exports = {
    db : null ,
    mentors : null,
    students : null,
    async connect (){
        await client.connect();
        console.log("connected to -" , process.env.MONGODB_URL)
        
        this.db = client.db(process.env.MONGODB_NAME);
        console.log("selected database-" , process.env.MONGODB_NAME)

        this.mentors = this.db.collection("mentors")
        this.students = this.db.collection("students")
    }
}