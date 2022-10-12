class Note {
	static allCount: number = 0
	static nowCount: number = 0
	static allNotes: Array<Note> = []

	public posX: number
	public posY: number
	private posZ: number //minimum posZ is 0 NOT 1 (represents indexZ)
	public instance: HTMLElement

	static SortZ() {
		//sorting does nothing
		if (Note.allNotes.length < 2) return

		//biggest posZ (the most in front) is sorted to the back of the array
		Note.allNotes.sort((a, b) => {
			if (a.posZ > b.posZ) return 1
			else return 0
		})
	}

	public UpdateZ() {
		Note.allNotes.forEach((el, i) => (el.posZ = i))
	}

	private ActivateMe() {
		Note.allNotes.forEach((el) => {
			el.instance.classList.remove('active')
		})
		this.instance.classList.add('active')
	}

	private MoveMe() {
		var pos1, pos2, pos3, pos4

		const dragMouseDown = (e) => {
			e = e || window.event
			e.preventDefault()

			pos3 = e.clientX
			pos4 = e.clientY
		}

		this.instance.onmousedown = dragMouseDown
	}

	private Instantiate() {
		this.instance = document.createElement('div')
		this.instance.classList.add('note')

		const textField: HTMLElement = document.createElement('p')
		textField.classList.add('textfield-p')
		textField.textContent = 'Note'
		this.instance.append(textField)

		const closeBtn: HTMLElement = document.createElement('button')
		closeBtn.classList.add('close-btn')
		closeBtn.addEventListener('click', () => {
			this.Destroy()
		})
		this.instance.append(closeBtn)

		document.querySelector('main').append(this.instance)

		this.instance.click = this.ActivateMe
		this.MoveMe()
	}

	constructor() {
		this.posX = 0
		this.posY = 0
		this.posZ = Note.nowCount

		Note.allCount++
		Note.nowCount++
		this.posZ = Note.nowCount + 1

		this.Instantiate()
		Note.allNotes.push(this)
	}

	public Destroy() {
		Note.nowCount--
		this.instance.remove()

		//removes this specific note from the array to stop keeping track of it
		Note.allNotes.splice(Note.allNotes.indexOf(this), 1)
	}
}

const addNewNote = () => {
	const newNote: Note = new Note()
}

const newNoteBtn: HTMLElement = document.querySelector('.new-note-btn')
const setup = () => {
	newNoteBtn.addEventListener('click', () => {
		addNewNote()
	})
}

setup()
