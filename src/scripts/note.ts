import { create } from './tiny'

class Note {
	static allCount: number = 0
	static nowCount: number = 0
	static allNotes: Array<Note> = []
	static editorOpen: boolean = false

	public posX: number
	public posY: number
	public posZ: number //minimum posZ is 0 NOT 1 (represents indexZ)
	public instance: HTMLElement

	private UpdateCountHTML() {
		const allCountP: HTMLElement = document.querySelector('.counter-all-p')
		const nowCountP: HTMLElement = document.querySelector('.counter-now-p')

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
		if (!this.instance) return
		if (this.instance.classList.contains('active')) {
			this.instance.classList.remove('active')
		}
	}

	private MoveMe(element: HTMLElement) {
		var pos1: number, pos2: number
		var minX: number = 8
		var minY: number = 8
		var maxX: number = this.instance.parentElement.clientWidth - this.instance.clientWidth - 8
		var maxY: number = this.instance.parentElement.clientHeight - this.instance.clientHeight - 8

		const dragMouseDown = (e) => {
			maxX = this.instance.parentElement.clientWidth - this.instance.clientWidth - 8
			maxY = this.instance.parentElement.clientHeight - this.instance.clientHeight - 8

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

			var moveToY = this.instance.offsetTop - pos2
			var moveToX = this.instance.offsetLeft - pos1

			//check if outside border
			if (moveToX <= minX) {
				moveToX = 9
				closeDragElement()
			} else if (moveToX >= maxX) {
				moveToX = this.instance.parentElement.clientWidth - this.instance.clientWidth - 9
				closeDragElement()
			}

			if (moveToY <= minY) {
				moveToY = 9
				closeDragElement()
			} else if (moveToY >= maxY) {
				moveToY = this.instance.parentElement.clientHeight - this.instance.clientHeight - 9
				closeDragElement()
			}

			this.instance.style.top = moveToY + 'px'
			this.instance.style.left = moveToX + 'px'
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

		const editBtn: HTMLElement = document.createElement('button')
		editBtn.classList.add('edit-btn')
		editBtn.addEventListener('click', () => {
			const textEditor: HTMLElement = document.createElement('textarea')
			textEditor.id = 'mytextarea'
			document.querySelector('main').append(textEditor)

			create('mytextarea')
		})
		this.instance.append(editBtn)

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
		this.posX = 10
		this.posY = 10
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

export default Note
