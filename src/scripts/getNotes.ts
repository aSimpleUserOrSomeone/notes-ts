export default function getNotes() {
	let stringData: string = ''
	function readTextFile(filePath: string) {
		var rawFile = new XMLHttpRequest()
		rawFile.open('GET', filePath, false)
		rawFile.onreadystatechange = () => {
			if (rawFile.readyState === 4) {
				if (rawFile.status === 200 || rawFile.status == 0) {
					stringData = rawFile.responseText
				}
			}
		}
		rawFile.send(null)
	}
	readTextFile('notesData.json')
	const dataJSON = JSON.parse(stringData)

	return dataJSON
}
