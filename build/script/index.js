var Note = /** @class */ (function () {
    function Note() {
        this.posX = 0;
        this.posY = 0;
        this.posZ = Note.nowCount;
        Note.allCount++;
        Note.nowCount++;
        this.posZ = Note.nowCount + 1;
        this.Instantiate();
        Note.allNotes.push(this);
    }
    Note.SortZ = function () {
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
    Note.prototype.UpdateZ = function () {
        Note.allNotes.forEach(function (el, i) { return (el.posZ = i); });
    };
    Note.prototype.ActivateMe = function () {
        Note.allNotes.forEach(function (el) {
            el.instance.classList.remove('active');
        });
        this.instance.classList.add('active');
    };
    Note.prototype.MoveMe = function () {
        var pos1, pos2, pos3, pos4;
        var dragMouseDown = function (e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
        };
        this.instance.onmousedown = dragMouseDown;
    };
    Note.prototype.Instantiate = function () {
        var _this = this;
        this.instance = document.createElement('div');
        this.instance.classList.add('note');
        var textField = document.createElement('p');
        textField.classList.add('textfield-p');
        textField.textContent = 'Note';
        this.instance.append(textField);
        var closeBtn = document.createElement('button');
        closeBtn.classList.add('close-btn');
        closeBtn.addEventListener('click', function () {
            _this.Destroy();
        });
        this.instance.append(closeBtn);
        document.querySelector('main').append(this.instance);
        this.instance.addEventListener('click', function () {
            _this.ActivateMe();
        });
    };
    Note.prototype.Destroy = function () {
        Note.nowCount--;
        this.instance.remove();
        //removes this specific note from the array to stop keeping track of it
        Note.allNotes.splice(Note.allNotes.indexOf(this), 1);
    };
    Note.allCount = 0;
    Note.nowCount = 0;
    Note.allNotes = [];
    return Note;
}());
var addNewNote = function () {
    var newNote = new Note();
};
var newNoteBtn = document.querySelector('.new-note-btn');
var setup = function () {
    newNoteBtn.addEventListener('click', function () {
        addNewNote();
    });
};
setup();
//# sourceMappingURL=index.js.map