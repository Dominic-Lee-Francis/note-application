class NoteRouter {
    constructor(note, express) {
        this.note = note;
        this.express = express;
    }

    router() {
        const router = this.express.Router();
        router.get("/", this.getAll.bind(this));
        router.post("/", this.post.bind(this));
        router.put("/", this.put.bind(this));
        router.delete("/", this.deleteAll.bind(this));
        return router;
    }

    async getAll(req, res) {
        const user = req.auth.user;
        let routerNotes = await this.note.listNotes(user);
        res.json(routerNotes);
    }

    async post(req, res) {
        const user = req.auth.user;
        const content = req.body.content;
        let routerNotes = await this.note.add(user, content);
        res.json(routerNotes);
    }

    async put(req, res) {
        const user = req.auth.user;
        const content = req.body.content;
        const id = req.body.id;
        let routerNotes = await this.note.update(id, user, content);
        res.json(routerNotes);
    }

    async deleteAll(req, res) {
        const user = req.auth.user;
        let routerNotes = await this.note.deleteAll(user);
        res.json(routerNotes)
    }

}

module.exports = NoteRouter;
