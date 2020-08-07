// 1.Part: Requirement & URL Definition:

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

newDB = 'mongodb+srv://alper:Q1w2e3r4@myfirstclustor.r7mci.mongodb.net/MyFirstClustor?retryWrites=true&w=majority';

// 2.Part: Database Connection:

mongoose.connect(
    newDB, { useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true}
)
.then(()=>console.log('MongoDB Connected!'))
.catch(err => console.log((err)));

// 3.Part: Schema Creation:

var TaskSchema = new Schema({

    title: String,
    description: String,
    status:{
        type:Boolean,
        default:false
    }

});

module.exports = mongoose.model('tasks', TaskSchema);





























