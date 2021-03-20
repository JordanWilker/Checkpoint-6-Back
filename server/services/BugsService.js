import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async getAllBugs() {
    const bugs = await dbContext.Bugs.find().populate('creator')
    return bugs
  }

  async getBugsById(id) {
    const bug = await dbContext.Bugs.findById(id).populate('creator')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async createBug(bugBody) {
    return await dbContext.Bugs.create(bugBody)
  }

  async editBug(id, userId, body) {
    const post = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorId: userId, closed: false }, body, { new: true })
    if (!post) {
      throw new BadRequest('You are not the CREATOR or BAD ID or Already Closed.')
    }
  }

  async deleteBug(id) {
    const closedUpdate = { closed: true, closedDate: new Date() }
    return await dbContext.Bugs.findOneAndUpdate({ _id: id, closed: false }, closedUpdate, { new: true })
  }
}

export const bugsService = new BugsService()
