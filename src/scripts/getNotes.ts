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
	const parser = new DOMParser()
	dataJSON.forEach((el) => {
		//decodes html entities
		let txtA = document.createElement('textarea')
		txtA.innerHTML = el.content
		el.content = txtA.value
	})

	return dataJSON
}
