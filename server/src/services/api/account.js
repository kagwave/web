const User = require('../../shared/models/user');
const fs = require('file-system');



module.exports = function(app) {

  //save profile edits
  app.post('/account/save', (req, res, next) => {
    const kagwaveId = req.body.userId;
    const edits = req.body.edits;

    const filter = { kagwaveId: kagwaveId };
    const options = { new: true, useFindAndModify: false };

    //save pro
    Object.keys(edits).forEach(key => {
      if (key === 'email') {
        User.findOne({email: edits[key]}, function (err, user) {
          if (user) {
            console.log('User already exists.'); 
          } else {
            const doc = { $set: {[`${key}`]: edits[key] } };
            console.log({key: edits[key]})
            User.findOneAndUpdate(filter, doc, options, (err, doc) => {
                if (err) console.log("Something wrong when updating data!");
            });
          }
        });
      } else if (key === 'profilePhoto') {
        /*fs.readFile(edits[key], function(err, buffer){
          return buffer;
          console.log(buffer)
        })
        
        console.log(edits["profilePhoto"]);
        //const { name, src } = edits[key];
        const publicUrl = `https://storage.googleapis.com/kagwave/${name}`
        async function uploadFile() {
          await storage.bucket('kagwave').upload(buffer, {
            destination: publicUrl,
          });
          console.log(`${src} uploaded to kagwave`);
        }
        uploadFile().catch(console.error);*/

        var imgString = edits["profilePhoto"];

        var stream = require('stream');
        var bufferStream = new stream.PassThrough();
        bufferStream.end(Buffer.from(imgString, 'base64'));

        const bucket = storage.bucket('kagwave');

        var file = bucket.file('my-file.jpg');
        //Pipe the 'bufferStream' into a 'file.createWriteStream' method.
        bufferStream.pipe(file.createWriteStream({
            metadata: {
              contentType: 'image/jpeg',
              metadata: {
                custom: 'metadata'
              }
            },
            public: true,
            validation: "md5"
          }))
          .on('error', function(err) {
            console.log(err);
          })
          .on('finish', function() {
            // The file upload is complete.
            console.log('complete');
          });
      } else if (typeof key === 'object'){
        Object.keys(edits[key]).forEach(subKey => {
          const doc = { $set: {[`${key[subKey]}`]: edits[key][subKey] } };
          User.findOneAndUpdate(filter, doc, options, (err, doc) => {
            if (err) console.log("Something wrong when updating data!");
          });
        });
      } else {
        const doc = { $set: {[`${key}`]: edits[key] } };
        console.log({key: edits[key]})
        User.findOneAndUpdate(filter, doc, options, (err, doc) => {
            if (err) console.log("Something wrong when updating data!");
        });
      }

      //update display_name if name was changed
      if (edits.hasOwnProperty('name')){
        var newDisplayName = edits.name.first_name + " " + edits.name.last_name;
        User.findOneAndUpdate(filter, 
          { $set: {display_name: newDisplayName} }, options, (err, doc) => {
          if (err) console.log("Something wrong when updating data!");
        });
      }   
    });
  });

  app.post('/account/header', (req, res) => { 

    console.log(req.body)
    let kagwaveId = req.body.id;

    User.findOne({kagwaveId: kagwaveId}, function (err, user){
      res.send({
        display_name: user.display_name,
        profile_photo: user.profile_photo,
        email: user.email
      });
    });

  });

  app.post('/account/info', (req, res) => { 

    let kagwaveId = req.body.id;

    User.findOne({kagwaveId: kagwaveId}, function (err, user) {
      const providers = {};
      if (user.externalProviderInfo) {
        Object.keys(user.externalProviderInfo).forEach(key => {
          providers[key] = true
        });
      }
      res.send({
        name: user.name,
        gender: user.gender,
        birthday: user.birthday,
        profile_photo: user.profile_photo,
        email: user.email,
        externalProviderInfo: providers ? providers : null,
        date_joined: user.date_joined
      });
    });

  });

}