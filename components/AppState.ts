import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import State from '../app/State';

// This is a adapter element, that connects scoped dom elements
// to the internal application states using DOM events.

interface StateElement extends HTMLElement {
  value: any
}

@customElement('app-state')
export default class AppState extends LitElement {

  // Event root scope
  get stateType() {
    return this.getAttribute('type') || 'global';
  }

  // state key comes from the target element attributes
  //  or this app states attributes as fallback
  get stateKey() {
    return this.getAttribute('key');
  }

  handler = ((e: CustomEvent) => {
    this.handleEvent(e);
  }) as EventListener;

  constructor() {
    super();

    // set value (property) of every element with state key attribute
    State.onState(this.stateType, (data) => {
      // on external state updates
      //  set "value" attribute of children with a "state-key" attribute
      for(let key in data) {
        const eles = this.querySelectorAll(`[state-key="${key}"]`) as NodeListOf<StateElement>;
        for(let ele of eles) {
          ele.value = data[key];
        }
      }
    });
  }

  connectedCallback(): void {
    // handle any change event
    this.addEventListener('change', this.handler);

    // handle any input event
    this.addEventListener('input', this.handler);
  }

  disconnectedCallback(): void {
    this.removeEventListener('change', this.handler);
    this.removeEventListener('input', this.handler);
  }

  // Handle input events from elements
  //  Uses "state-key" and "state-name" of target element.
  //  As fallback use the "state-key" attribute from this app-state element.
  handleEvent(e: CustomEvent) {
    const target = e.target as HTMLInputElement;
    const key = target.getAttribute('state-key') || this.stateKey;
    const name = target.getAttribute('state-name');
    const stateValue = e.detail?.value != null ? e.detail?.value : target.value;

    if (name != null && key != null) {

      // set the value of a named state inside a scope
      const state = State.getState(this.stateType)[key];
      state[name] = stateValue;
      State.setState(this.stateType, {
        [key]: state,
      });
      e.cancelBubble = true;

    } else if (key != null) {

      // set root state value of a scope
      State.setState(this.stateType, {
        [key]: stateValue,
      });
      e.cancelBubble = true;
    }
  }

}
