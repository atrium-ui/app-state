import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import State from '../app/State';
import StateElement from '../types/StateElement';


// This is a adapter element, that connects scoped dom elements
// to the internal application states using DOM events.

@customElement('app-state')
export default class AppState extends LitElement {

  // Event root scope
  @property({ type: String })
  type: string = 'global';

  // state key comes from the target element attributes
  //  or this app states attributes as fallback
  @property({ type: String })
  scope?: string;


  constructor() {
    super();

    // set value (property) of every element with state key attribute
    State.onState(this.type, (data) => {
      // on external state updates
      //  set "value" attribute of children with a "state-scope" attribute
      for(let key in data) {
        const eles = this.querySelectorAll(`[state-scope="${key}"]`) as NodeListOf<StateElement>;
        for(let ele of eles) {
          ele.value = data[key];
        }
      }
    });
  }

  connectedCallback(): void {
    // handle any change event
    this.addEventListener('change', this.handleEvent as EventListener);
    // handle any input event
    this.addEventListener('input', this.handleEvent as EventListener);
  }

  disconnectedCallback(): void {
    this.removeEventListener('change', this.handleEvent as EventListener);
    this.removeEventListener('input', this.handleEvent as EventListener);
  }

  // Handle input events from elements
  //  Uses "state-scope" and "state-name" of target element.
  //  As fallback use the "state-scope" attribute from this app-state element.
  handleEvent(e: CustomEvent) {
    const target = e.target as HTMLInputElement;

    if(target.hasAttribute('state-scope')) {
      const scope: string = target.getAttribute('state-scope') || this.scope;
      const stateValue = e.detail?.value != null ? e.detail?.value : target.value;

      if(target.hasAttribute('state-key')) {
        const key: string = target.getAttribute('state-key');
      
        // set the value of a named state inside a scope
        const state = State.getState(this.type)[key];
        state[key] = stateValue;
        State.setState(this.type, {
          [scope]: state,
        });
        e.cancelBubble = true;
      } else {

        // set root state value of a scope
        State.setState(this.type, {
          [scope]: stateValue,
        });
        e.cancelBubble = true;
      }
    }
  }

}
