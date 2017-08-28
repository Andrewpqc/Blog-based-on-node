var crypto=require('crypto');

var mongodb='mongodb://localhost/nodedb';

var makeHash=(data)=>{
	hash=crypto.createHash('sha1');
	hash.update(data);
  	return hash.digest("hex")
};
module.exports={mongodb:mongodb,makeHash:makeHash}


