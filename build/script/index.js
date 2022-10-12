var Note = /** @class */ (function () {
    function Note() {
        this.posX = 0;
        this.posY = 0;
        this.posZ = Note.currentCount;
        Note.totalCount++;
        Note.currentCount++;
        this.posZ = Note.currentCount + 1;
        this.instantiate();
        Note.allNotes.push(this);
    }
    Note.prototype.updateZ = function () {
        Note.allNotes.forEach(function (el, i) { return (el.posZ = i); });
    };
    Note.sortZ = function () {
        //sorting does nothing
        if (Note.allNotes.length < 2)
            return;
        //biggest posZ (the most in front) is sorted to the back of the array
        Note.allNotes.sort(function (a, b) {
            if (a.posZ > b.posZ)
                return 1;
            else
                return 0;
        });
    };
    Note.prototype.instantiate = function () {
        var myNote = document.createElement('div');
        return myNote;
    };
    Note.prototype.destroy = function () {
        Note.currentCount--;
        this.instance.remove();
        //removes this specific note from the array to stop keeping track of it
        Note.allNotes.splice(Note.allNotes.indexOf(this), 1);
    };
    Note.totalCount = 0;
    Note.currentCount = 0;
    Note.allNotes = [];
    return Note;
}());
//# sourceMappingURL=index.js.map