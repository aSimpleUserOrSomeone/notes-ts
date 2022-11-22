import Note from './note'
import '../styles/styles.css'
import '../res/fridge.svg'
import './getNotes'
import getNotes from './getNotes'

const newNoteBtn: HTMLElement = document.querySelector('.new-note-btn') as HTMLElement
const setup = () => {
	if (!newNoteBtn) return
	newNoteBtn.addEventListener('click', () => {
		new Note()
	})

	const notesJSON = getNotes()
	notesJSON.forEach((el) => {
		new Note(el.id, el.x, el.y, el.content, el.width, el.height, el.totalCount, el.notesNow)
	})
}

setup()
