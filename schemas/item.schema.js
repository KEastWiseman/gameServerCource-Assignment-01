import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
    item_code : {
      type : Number,
      require : true,
      unique : true
    },
    item_name : {
      type:String,
      require : true,
      unique : true
    },
    item_stat : {
      type : Object,
      require : true
    }
  })

  export default mongoose.model("items", itemSchema);