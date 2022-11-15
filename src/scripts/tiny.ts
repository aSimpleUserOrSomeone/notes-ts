const tinymce = require('tinymce')

const overlay: HTMLElement = document.querySelector('#overlay')

const saveText = () => alert('Save')
const closeEditor = (selector: string) => {
	overlay.classList.remove('overlay-shown')
	overlay.classList.add('overlay-hidden')

	tinymce.remove()
	document.querySelector(`#${selector}`).remove()
}

export const create = (selector: string) => {
	//create the overlay
	overlay.classList.remove('overlay-hidden')
	overlay.classList.add('overlay-shown')

	//create tinymce editor
	tinymce.init({
		resize: false,
		selector: `#${selector}`,
		toolbar: 'saveButton closeButton',
		setup: (editor) => {
			editor.ui.registry.addButton('saveButton', {
				icon: 'save',
				onAction: (_) => saveText(),
			})

			editor.ui.registry.addButton('closeButton', {
				icon: 'close',
				onAction: (_) => closeEditor(selector),
			})
		},
	})
}
