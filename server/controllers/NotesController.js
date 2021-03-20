import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/notesService.js'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNote)
      .put('/:id', this.editNote)
      .delete('/:id', this.deleteNote)
  }

  async createNote(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      return res.send(await notesService.createNote(req.body))
    } catch (error) {
      next(error)
    }
  }

  async editNote(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(notesService.editNote(req.params.id, req.userInfo.id, req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req, res, next) {
    try {
      return res.send(await notesService.deleteNote(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }
}
