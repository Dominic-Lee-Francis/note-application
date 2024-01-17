test("at first it should list empty notes", () => {
    expect(NoteServices.list()).toEqual({});
});