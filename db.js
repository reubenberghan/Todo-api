const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const prodSeqInit = [ process.env.DATABASE_URL, { 'dialect': 'postgres' } ]
const devSeqInit = [ null, null, null, { 'dialect': 'sqlite', 'storage': __dirname + '/data/dev-todo-api.sqlite' } ]
const seqInitArr = env === 'production' ? prodSeqInit : devSeqInit;
const sequelize = new Sequelize(...seqInitArr);
const db = {};

db.todo = sequelize.import(__dirname + '/models/todo.js');
db.user = sequelize.import(__dirname + '/models/user.js');
db.token = sequelize.import(__dirname + '/models/token.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.todo.belongsTo(db.user);
db.user.hasMany(db.todo);

module.exports = db;
