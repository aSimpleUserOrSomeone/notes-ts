import Note from './note'
import '../styles/styles.css'
import '../res/fridge.svg'

const newNoteBtn: HTMLElement = document.querySelector('.new-note-btn') as HTMLElement
const setup = () => {
	if (!newNoteBtn) return
	newNoteBtn.addEventListener('click', () => {
		new Note()
	})
}
setup()
