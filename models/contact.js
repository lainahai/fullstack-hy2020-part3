
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const databaseUrl = process.env.MONGO_URI

console.log('Connecting to database')
mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('Connected to database')
  })
  .catch(error => {
    console.log('Error connecting to database:', error.message)
  })


const contactSchema = new mongoose.Schema({
  name: { type: String, 
          unique: true, 
          required: true,  
          minlength: 3 },
          
  number: { type: String, 
            required: true, 
            minlength: 8 }
})
contactSchema.plugin(uniqueValidator)

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', contactSchema)



