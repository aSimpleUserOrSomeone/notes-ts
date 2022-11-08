import tinymce from '../../node_modules/tinymce/tinymce'

export const create = (selector: string) => {
	tinymce.init({
		selector: `#${selector}`,
		plugins: 'autoresize',
		max_width: 850,
		max_height: 500,
		resize: false,

		// display: block,
		// position: absolute,
		// left: 50%,
		// top: 50%,
		// translate: (-50%, -50%),

		// max-width: 850px
	})
}
