export interface Observer<T> {
	update(data: T): void;
}

export class Observable<T> {
	private observers: Observer<T>[] = [];
	constructor() {
		this.observers = [];
	}

	subscribe(observer: Observer<T>) {
		this.observers.push(observer);
	}

	notify(data: T) {
		for (const observer of this.observers) {
			observer.update(data);
		}
	}
}
