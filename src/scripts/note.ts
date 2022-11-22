import { create } from './tiny'
const fs = require('fs')

class Note {
	static allCount: number = 0
	static nowCount: number = 0
	static allNotes: Array<Note> = []

	public ID: number
	public posX: number
	public posY: number
	public posZ: number //minimum posZ is 0 NOT 1 (represents indexZ)
	public myContent: string
	public myWidth: number
	public myHeight: number
	public instance: HTMLElement

	static saveAllNotes = () => {
		Note.allNotes.forEach((n) => {
			let hreq: XMLHttpRequest = new XMLHttpRequest()
			hreq.open('POST', 'php/update_db.php', true)
			hreq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
			hreq.send(
				`id=${n.ID}&x=${n.posX}&y=${n.posY}&content=${n.myContent}&width=${n.myWidth}&height=${n.myHeight}&totalCount=${Note.allCount}&notesNow=${Note.nowCount}`
			)
			hreq.onreadystatechange = () => {
				if (hreq.readyState == 4 && hreq.status == 200) {
					console.log(hreq.responseText)
				}
			}
		})
	}

	static updateCounters = () => {
		let hreq: XMLHttpRequest = new XMLHttpRequest()
		hreq.open('POST', 'php/update_counters.php', true)
		hreq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
		hreq.send(`totalCount=${Note.allCount}&notesNow=${Note.nowCount}`)
		hreq.onreadystatechange = () => {
			if (hreq.readyState == 4 && hreq.status == 200) {
				console.log(hreq.responseText)
			}
		}
	}

	public saveThisNote = () => {
		let hreq: XMLHttpRequest = new XMLHttpRequest()
		hreq.open('POST', 'php/update_db.php', true)
		hreq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
		hreq.send(
			`id=${this.ID}&x=${this.posX}&y=${this.posY}&content=${this.myContent}&width=${this.myWidth}&height=${this.myHeight}&totalCount=${Note.allCount}&notesNow=${Note.nowCount}`
		)
		hreq.onreadystatechange = () => {
			if (hreq.readyState == 4 && hreq.status == 200) {
				console.log(hreq.responseText)
			}
		}
	}

	private UpdateCountHTML() {
		const allCountP: HTMLElement = document.querySelector('.counter-all-p')
		const nowCountP: HTMLElement = document.querySelector('.counter-now-p')

		allCountP.textContent = `Total count: ${Note.allCount}`
		nowCountP.textContent = `Notes now: ${Note.nowCount}`
	}

	private SortZ = () => {
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

			this.instance.style.left = moveToX + 'px'
			this.instance.style.top = moveToY + 'px'
		}

		const closeDragElement = () => {
			this.DeactivateMe()

			document.onmouseup = null
			document.onmousemove = null

			this.UpdateSize()
			this.saveThisNote()
		}

		element.onmousedown = dragMouseDown
	}

	private UpdateSize = () => {
		this.myWidth = this.instance.clientWidth
		this.myHeight = this.instance.clientHeight

		this.saveThisNote()
	}

	private Instantiate() {
		this.instance = document.createElement('div')
		this.instance.classList.add('note')
		this.instance.style.left = this.posX + 'px'
		this.instance.style.top = this.posY + 'px'
		this.instance.style.width = this.myWidth + 'px'
		this.instance.style.height = this.myHeight + 'px'

		const editBtn: HTMLElement = document.createElement('button')
		const closeBtn: HTMLElement = document.createElement('button')
		const textField: HTMLElement = document.createElement('div')

		editBtn.classList.add('edit-btn')
		editBtn.addEventListener('click', () => {
			const textEditor: HTMLElement = document.createElement('textarea')
			textEditor.id = 'mytextarea'
			document.querySelector('main').append(textEditor)

			create('mytextarea', textField, this)
		})
		this.instance.append(editBtn)

		closeBtn.classList.add('close-btn')
		closeBtn.addEventListener('click', () => {
			this.Destroy()
		})
		this.instance.append(closeBtn)

		textField.classList.add('textfield-p')
		textField.innerHTML = this.myContent
		this.instance.append(textField)

		document.querySelector('main').append(this.instance)
		textField.onclick = this.ActivateMe
		this.MoveMe(textField)

		this.UpdateCountHTML()
	}

	constructor(
		noteID: number = undefined,
		noteX: number = 10,
		noteY: number = 10,
		noteContent: string = 'Note',
		noteWidth: number = 150,
		noteHeight: number = 150,
		noteTotalCount: number = undefined,
		noteNotesNow: number = undefined
	) {
		//if arguments not passed creates just an empty note
		this.ID = noteID || Note.allCount + 1
		this.posX = noteX
		this.posY = noteY
		this.posZ = Note.nowCount

		this.myContent = noteContent
		this.myWidth = noteWidth
		this.myHeight = noteHeight

		if (noteTotalCount) Note.allCount = noteTotalCount
		else Note.allCount++

		if (noteNotesNow) Note.nowCount = noteNotesNow
		else Note.nowCount++

		this.posZ = this.ID

		Note.updateCounters()

		this.Instantiate()
		Note.allNotes.push(this)
	}

	public Destroy() {
		Note.nowCount--
		this.UpdateCountHTML()
		this.instance.remove()

		//removes this specific note from the array to stop keeping track of it
		Note.allNotes.splice(Note.allNotes.indexOf(this), 1)

		let hreq: XMLHttpRequest = new XMLHttpRequest()
		hreq.open('POST', 'php/delete_note.php', true)
		hreq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
		hreq.send(`id=${this.ID}`)
		hreq.onreadystatechange = () => {
			if (hreq.readyState == 4 && hreq.status == 200) {
				console.log(hreq.responseText)
			} else {
				console.log('Error making an XML Request')
			}
		}
	}
}

export default Note
