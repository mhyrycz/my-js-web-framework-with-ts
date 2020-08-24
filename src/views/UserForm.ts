export class UserForm {
	constructor(public parent: Element) {}

	onButtonClick(): void {
		console.log('dupa');
	}

	template(): string {
		return `
            <div>
                <h1> User Form</h1>
                <button>Click me</button>
            </div>
        `;
	}

	bindEvents(templateElement: HTMLTemplateElement): void {
		const button = templateElement.content.querySelectorAll("button")[0]
		button.addEventListener('click',this.onButtonClick);
	}

	render(): void {
		const templateElement = document.createElement('template');
		templateElement.innerHTML = this.template();
		this.bindEvents(templateElement);
		this.parent.append(templateElement.content);
	}
}
