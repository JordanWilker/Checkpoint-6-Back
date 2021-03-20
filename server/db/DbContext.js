import mongoose from 'mongoose'
import AccountSchema from '../models/Account'
import bugSchema from '../models/Bug'
import noteSchema from '../models/Note'

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Bugs = mongoose.model('Bug', bugSchema)
  Notes = mongoose.model('Note', noteSchema)
}

export const dbContext = new DbContext()
