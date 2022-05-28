import { StateScope, StateScopeObject } from './../State';
import { State, StateUpdateHandle } from '../State';

// This is a adapter element, that connects scoped dom elements
// to the internal application states using DOM events.

interface StateElement extends HTMLElement {
	value: any;
}

export const triggerEvents = [
	// handle any input event
	'input',
	// handle any change event
	'change'
];

export default class AppState extends HTMLElement {
	/**
	 * state key comes from the target element state-key attribute
	 *  or this app states attributes as fallback
	 */
	public get key(): string | null {
		return this.getAttribute('key');
	}

	/**
	 * State scope
	 */
	public get scope(): StateScope {
		return this.getAttribute('scope') || 'global';
	}

	private _stateUpdateHandle?: StateUpdateHandle;

	public connectedCallback(): void {
		for (let event of triggerEvents) {
			this.addEventListener(event, this.handleEvent as EventListener);
		}

		// initially emit data to children
		const scopeState = State.scope(this.scope);
		if (scopeState) {
			this.handleStateUpdate(scopeState);
		}

		// on state updates
		//  set "value" of children prop with a "state-key" attribute
		this._stateUpdateHandle = State.on(this.scope, (data) => {
			this.handleStateUpdate(data);
		});
	}

	private handleStateUpdate(data: StateScopeObject): void {
		for (const key in data) {
			const eles = this.querySelectorAll(`[state-key*=":${key}"]`) as NodeListOf<StateElement>;

			for (const ele of eles) {
				const attributeValue = ele.getAttribute('state-key');

				if (attributeValue) {
					const args = attributeValue.split(':');

					if (args.length > 1) {
						ele[args[0]] = data[key];
					} else {
						ele.value = data[key];
					}
				}
			}
		}
	}

	public disconnectedCallback(): void {
		for (let event of triggerEvents) {
			this.removeEventListener(event, this.handleEvent as EventListener);
		}

		if (this._stateUpdateHandle) {
			this._stateUpdateHandle.remove();
		}
	}

	/**
	 * Handle trigger events from elements
	 *  Uses "state-key" of target element.
	 *  As fallback use the "state-key" attribute from this app-state element.
	 */
	private handleEvent(e: CustomEvent): void {
		const target = e.target as StateElement;

		if (!this.scope) return;

		if (target.hasAttribute('state-key')) {
			const keyArguments: string = target.getAttribute('state-key') as string;
			const args = keyArguments.split(':');
			const targetKey = args[0];
			const stateKey = args[1] || this.key;

			if (targetKey && stateKey) {
				const stateValue = e.detail != null && e.detail[targetKey] != null ? e.detail[targetKey] : target[targetKey];

				// set root state value of a scope
				State.scope(this.scope, {
					[stateKey]: stateValue
				});
				e.cancelBubble = true;
			}
		}
	}
}

customElements.define('app-state', AppState);
