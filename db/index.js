const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let db = mongoose.connection;

db.on('error', (err) => {
	console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
db.on('disconnected', () => {
	console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
	db.close( () => {
		console.log('Mongoose default connection disconnected through app termination');
		process.exit(0);
	});
});

function connectDB( dbURI ) {

	// When the connection to DB is done
	db.on('connected', () => {
		console.log('Mongoose default connection open to ' + dbURI);
	});

	db.open(dbURI);

};

module.exports = connectDB;