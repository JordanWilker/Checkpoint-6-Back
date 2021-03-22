import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async getNotesByBugId(id) {
    const note = await dbContext.Notes.find(id).populate('bug creator')
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }

  async createNote(noteBody) {
    return await dbContext.Notes.create(noteBody)
  }

  async editNote(id, userId, body) {
    const post = await dbContext.Notes.findOneAndUpdate({ _id: id, creatorId: userId }, body, { new: true })
    if (!post) {
      throw new BadRequest('You are not the CREATOR or BAD ID.')
    }
  }

  async deleteNote(id, userId) {
    const post = await dbContext.Notes.findOneAndRemove({ _id: id, creatorId: userId })
    if (!post) {
      throw new BadRequest('You are not the CREATOR or BAD ID.')
    }
  }
}

export const notesService = new NotesService()
