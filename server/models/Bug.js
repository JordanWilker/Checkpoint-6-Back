import { Schema } from 'mongoose'

const bug = new Schema({
  closed: { type: Boolean, required: true, default: false },
  description: { type: String, required: true },
  title: { type: String, required: true },
  closedDate: { type: Date },
  creatorId: { type: String, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })
bug.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default bug
