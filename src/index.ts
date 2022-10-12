class Note {
	static allCount: number = 0
	static nowCount: number = 0
	static allNotes: Array<Note> = []

	public posX: number
	public posY: number
	private posZ: number //minimum posZ is 0 NOT 1 (represents indexZ)
	public instance: HTMLElement

	public updateZ() {
		Note.allNotes.forEach((el, i) => (el.posZ = i))
	}

	static sortZ() {
		//sorting does nothing
		if (Note.allNotes.length < 2) return

		//biggest posZ (the most in front) is sorted to the back of the array
		Note.allNotes.sort((a, b) => {
			if (a.posZ > b.posZ) return 1
			else return 0
		})
	}

	private instantiate() {
		var myNote = document.createElement('div')

		return myNote
	}

	constructor() {
		this.posX = 0
		this.posY = 0
		this.posZ = Note.nowCount

		Note.allCount++
		Note.nowCount++
		this.posZ = Note.nowCount + 1

		this.instantiate()
		Note.allNotes.push(this)
	}

	public destroy() {
		Note.nowCount--
		this.instance.remove()

		//removes this specific note from the array to stop keeping track of it
		Note.allNotes.splice(Note.allNotes.indexOf(this), 1)
	}
}
