const mongoose = require('mongoose')

if(process.argv.length < 3){
  console.log('Usage: node mongo.js password [name, number]')
  process.exit(1)
}

const password = process.argv[2]
const databaseUrl = 
  `mongodb+srv://puhelinuser:${password}@fullstackpuhelin-kukzh.mongodb.net/puhelinluettelo-app?retryWrites=true&w=majority`

mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })


const contactSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Contact = mongoose.model('Contact', contactSchema)


const printAll = () => {
  Contact.find({}).then(result => {
    console.log('Contacts:')
    result.forEach(contact => {
      console.log(`${contact.name} ${contact.number}`)
    })
    mongoose.connection.close()
  })
}

const addNew = (name, number) => {
  const contact = new Contact({ name, number })
  contact.save().then(result => {
    console.log(`Added ${name} ${number} to contacts`)
    mongoose.connection.close()
  })
}

if (process.argv.length == 3) {
  printAll()
} else if (process.argv.length < 5) {
  console.log('You must give both a name and a number')
} else {
  const name = process.argv[3]
  const number = process.argv[4]
  addNew(name, number)
}

