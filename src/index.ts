class Note {
	static allCount: number = 0
	static nowCount: number = 0
	static allNotes: Array<Note> = []

	public posX: number
	public posY: number
	public posZ: number //minimum posZ is 0 NOT 1 (represents indexZ)
	public instance: HTMLElement

	private UpdateCountHTML() {
		const allCountP = document.querySelector('.counter-all-p')
		const nowCountP = document.querySelector('.counter-now-p')

		allCountP.textContent = `Przebieg: ${Note.allCount}`
		nowCountP.textContent = `Na lodówce: ${Note.nowCount}`
	}

	public SortZ = () => {
		//sorting does nothing
		if (Note.allNotes.length < 2) return

		//push current note to the back of the array
		Note.allNotes.push(Note.allNotes.splice(Note.allNotes.indexOf(this), 1)[0])

		//update posZ on all Notes and their zIndex
		Note.allNotes.forEach((el, i) => {
			el.posZ = i
			el.instance.style.zIndex = el.posZ.toString()
		})
	}

	private ActivateMe() {
		if (!this.instance) return
		this.instance.classList.add('active')
		this.SortZ()
	}

	private DeactivateMe() {
		if (this.instance.classList.contains('active')) {
			this.instance.classList.remove('active')
		}
	}

	private MoveMe(element: HTMLElement) {
		var pos1, pos2

		const dragMouseDown = (e) => {
			e = e || window.event

			this.posX = e.clientX
			this.posY = e.clientY
			element.onmouseup = closeDragElement
			document.onmousemove = elementDrag
		}

		const elementDrag = (e) => {
			e = e || window.event
			pos1 = this.posX - e.clientX
			pos2 = this.posY - e.clientY
			this.posX = e.clientX
			this.posY = e.clientY
			this.ActivateMe()

			this.instance.style.top = this.instance.offsetTop - pos2 + 'px'
			this.instance.style.left = this.instance.offsetLeft - pos1 + 'px'
		}

		const closeDragElement = () => {
			this.DeactivateMe()
			document.onmouseup = null
			document.onmousemove = null
		}

		element.onmousedown = dragMouseDown
	}

	private Instantiate() {
		this.instance = document.createElement('div')
		this.instance.classList.add('note')

		const titleH3: HTMLElement = document.createElement('h3')
		titleH3.classList.add('title-h3')
		titleH3.textContent = 'Title'
		this.instance.append(titleH3)

		const closeBtn: HTMLElement = document.createElement('button')
		closeBtn.classList.add('close-btn')
		closeBtn.addEventListener('click', () => {
			this.Destroy()
		})
		this.instance.append(closeBtn)

		const textField: HTMLElement = document.createElement('p')
		textField.classList.add('textfield-p')
		textField.textContent = 'Note'
		this.instance.append(textField)

		document.querySelector('main').append(this.instance)
		textField.onclick = this.ActivateMe
		this.MoveMe(textField)

		this.UpdateCountHTML()
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
		this.UpdateCountHTML()
		this.instance.remove()

		//removes this specific note from the array to stop keeping track of it
		Note.allNotes.splice(Note.allNotes.indexOf(this), 1)
	}
}

const addNewNote = () => {
	new Note()
}

const newNoteBtn: HTMLElement = document.querySelector('.new-note-btn')
const setup = () => {
	newNoteBtn.addEventListener('click', () => {
		addNewNote()
	})
}

setup()
