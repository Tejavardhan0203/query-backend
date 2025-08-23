const mongoose=require("mongoose")
 
const QuerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  question: { type: String, required: true },
  status: { type: String, enum: ['OPEN','IN_PROGRESS','RESOLVED'], default: 'OPEN' }
}, { timestamps: true })

module.exports=mongoose.model('Query', QuerySchema)
