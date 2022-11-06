import Note from './note'
import { editor } from './tiny'
import '../styles/styles.css'

const addNewNote = () => {
	new Note()
}

const newNoteBtn: HTMLElement = document.querySelector('.new-note-btn') as HTMLElement
const setup = () => {
	newNoteBtn.addEventListener('click', () => {
		addNewNote()
	})
	editor()
}
setup()
