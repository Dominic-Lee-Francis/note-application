const NoteServices = require("../server/NoteServices");
const noteServices = new NoteServices();

test("at first it should list empty notes", () => {
    return expect(noteServices.list()).resolves.toEqual({});
});