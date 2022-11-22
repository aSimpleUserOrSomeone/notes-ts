import Note from './note'
const tinymce = require('tinymce')

const overlay: HTMLElement = document.querySelector('#overlay')

const saveText = (textElement: HTMLElement, currentNote: Note) => {
	const content = tinymce.activeEditor.getContent()
	textElement.innerHTML = content
	currentNote.myContent = content
	currentNote.saveThisNote()
}
const closeEditor = (selector: string) => {
	overlay.classList.remove('overlay-shown')
	overlay.classList.add('overlay-hidden')

	tinymce.remove()
	document.querySelector(`#${selector}`).remove()
}

export const create = (selector: string, textElement: HTMLElement, currentNote: Note) => {
	//create the overlay
	overlay.classList.remove('overlay-hidden')
	overlay.classList.add('overlay-shown')
	const setInner = () => {
		console.log(textElement.textContent)
		tinymce.activeEditor.setContent(textElement.innerHTML)
	}

	//create tinymce editor
	tinymce.init({
		resize: false,
		selector: `#${selector}`,
		toolbar: 'saveButton closeButton',
		setup: (editor) => {
			editor.ui.registry.addButton('saveButton', {
				icon: 'save',
				onAction: (_) => saveText(textElement, currentNote),
			})

			editor.ui.registry.addButton('closeButton', {
				icon: 'close',
				onAction: (_) => closeEditor(selector),
			})
		},
		init_instance_callback: setInner,
	})
}
