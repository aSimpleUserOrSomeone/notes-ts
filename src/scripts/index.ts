import { Note } from './note'
import '../styles/styles.css'

const addNewNote = () => {
	new Note()
}

const newNoteBtn: HTMLElement = document.querySelector('.new-note-btn') as HTMLElement
const setup = () => {
	newNoteBtn.addEventListener('click', () => {
		addNewNote()
	})
}

setup()
