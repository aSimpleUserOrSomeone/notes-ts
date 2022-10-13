var Note = /** @class */ (function () {
    function Note() {
        var _this = this;
        this.SortZ = function () {
            //sorting does nothing
            if (Note.allNotes.length < 2)
                return;
            //push current note to the back of the array
            Note.allNotes.push(Note.allNotes.splice(Note.allNotes.indexOf(_this), 1)[0]);
            //update posZ on all Notes and their zIndex
            Note.allNotes.forEach(function (el, i) {
                el.posZ = i;
                el.instance.style.zIndex = el.posZ.toString();
            });
        };
        this.posX = 0;
        this.posY = 0;
        this.posZ = Note.nowCount;
        Note.allCount++;
        Note.nowCount++;
        this.posZ = Note.nowCount + 1;
        this.Instantiate();
        Note.allNotes.push(this);
    }
    Note.prototype.UpdateCountHTML = function () {
        var allCountP = document.querySelector('.counter-all-p');
        var nowCountP = document.querySelector('.counter-now-p');
        allCountP.textContent = "Przebieg: ".concat(Note.allCount);
        nowCountP.textContent = "Na lod\u00F3wce: ".concat(Note.nowCount);
    };
    Note.prototype.ActivateMe = function () {
        if (!this.instance)
            return;
        this.instance.classList.add('active');
        this.SortZ();
    };
    Note.prototype.DeactivateMe = function () {
        if (this.instance.classList.contains('active')) {
            this.instance.classList.remove('active');
        }
    };
    Note.prototype.MoveMe = function (element) {
        var _this = this;
        var pos1, pos2;
        var dragMouseDown = function (e) {
            e = e || window.event;
            _this.posX = e.clientX;
            _this.posY = e.clientY;
            element.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        };
        var elementDrag = function (e) {
            e = e || window.event;
            pos1 = _this.posX - e.clientX;
            pos2 = _this.posY - e.clientY;
            _this.posX = e.clientX;
            _this.posY = e.clientY;
            _this.ActivateMe();
            _this.instance.style.top = _this.instance.offsetTop - pos2 + 'px';
            _this.instance.style.left = _this.instance.offsetLeft - pos1 + 'px';
        };
        var closeDragElement = function () {
            _this.DeactivateMe();
            document.onmouseup = null;
            document.onmousemove = null;
        };
        element.onmousedown = dragMouseDown;
    };
    Note.prototype.Instantiate = function () {
        var _this = this;
        this.instance = document.createElement('div');
        this.instance.classList.add('note');
        var titleH3 = document.createElement('h3');
        titleH3.classList.add('title-h3');
        titleH3.textContent = 'Title';
        this.instance.append(titleH3);
        var closeBtn = document.createElement('button');
        closeBtn.classList.add('close-btn');
        closeBtn.addEventListener('click', function () {
            _this.Destroy();
        });
        this.instance.append(closeBtn);
        var textField = document.createElement('p');
        textField.classList.add('textfield-p');
        textField.textContent = 'Note';
        this.instance.append(textField);
        document.querySelector('main').append(this.instance);
        textField.onclick = this.ActivateMe;
        this.MoveMe(textField);
        this.UpdateCountHTML();
    };
    Note.prototype.Destroy = function () {
        Note.nowCount--;
        this.UpdateCountHTML();
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
    new Note();
};
var newNoteBtn = document.querySelector('.new-note-btn');
var setup = function () {
    newNoteBtn.addEventListener('click', function () {
        addNewNote();
    });
};
setup();
//# sourceMappingURL=index.js.map