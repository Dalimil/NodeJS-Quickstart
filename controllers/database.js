//var MongoClient = require('mongodb').MongoClient;
//var url = config.MONGODB_URI;

function query(method, callback) {
	MongoClient.connect(url, function(err, db) {
		if(err) console.log('Unable to connect to the mongoDB server. Error:', err);
	    console.log('Connection established to', url);
	    console.log(method);

	    method(db, function(res) { 
	    	if(callback != null) {
	    		callback(res); 
	    	}
	    	db.close(); 
	   	});
	});
}

/* Function to be used in main.js */
exports.list = function(req, res){
	query(findDocuments, function(result) {
		res.json({ result });
	});
};

function findDocuments(db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Find all documents
	collection.find({}).toArray(function(err, docs) { // or find({name: 'John'}) etc.
		if(err) throw err;
		// console.dir(docs);
		callback(docs);
	});
}

function insertDocuments(db, callback) {
	// Get the documents collection - automatically created if doesn't exist
	var collection = db.collection('documents');
	// Insert some documents
	collection.insertOne({name: 'John', age: 22, roles: ['admin']}); // callback is always optional

	collection.insertMany([	{a : 1}, {a : 2}, {a : 3} ], function(err, result) {
		if(err) throw err;
		console.log("Inserted 3 documents into the document collection");
		callback(result);
	});
}

function updateDocument(db, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Update document where a is 2, set b equal to 1
	collection.updateOne({ a : 2 }, { $set: { b : 1 } }, function(err, result) {
		if(err) throw err;
		console.log("Updated the document with the field a equal to 2");
		callback(result);
	});  
	// or collection.updateMany(filter, update, [options], [callback])
}

function deleteDocument(db, callback) {
	var collection = db.collection('documents');

	collection.deleteOne({ a : 3 }, function(err, result) {
		if(err) throw err;
		console.log("Removed the document with the field a equal to 3");
		callback(result);
	});
	// or collection.deleteMany(filter, [options], [callback])
}
