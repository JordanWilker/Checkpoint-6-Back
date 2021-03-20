import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/bugsService.js'
import { notesService } from '../services/notesService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAllBugs)
      .get('/:id', this.getBugById)
      .get('/:id/notes', this.getNotesByBugId)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .put('/:id', this.editBug)
      .delete('/:id', this.deleteBug)
  }

  async getAllBugs(req, res, next) {
    try {
      return res.send(await bugsService.getAllBugs())
    } catch (error) {
      next(error)
    }
  }

  async getBugById(req, res, next) {
    try {
      return res.send(await bugsService.getBugsById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async getNotesByBugId(req, res, next) {
    try {
      return res.send(await notesService.getNotesByBugId({ bug: req.params.id }))
    } catch (error) {
      next(error)
    }
  }

  async createBug(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      return res.send(await bugsService.createBug(req.body))
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const bug = await bugsService.editBug(req.params.id, req.userInfo.id, req.body)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async deleteBug(req, res, next) {
    try {
      res.send(bugsService.deleteBug(req.params.id))
    } catch (error) {
      next(error)
    }
  }
}
