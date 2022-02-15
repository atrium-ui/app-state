import DefaultState from './DefaultState';

type StateObject = {
  [key: string]: any
}

// NEXT: replace JSON with "deepcopy" at some point
let state: StateObject = JSON.parse(JSON.stringify(DefaultState));

export default class State {

  // update state key in scope
  static setState(stateId: string, newState: any) {
    // deep copy new state and save to global state
    state[stateId] = Object.assign(state[stateId] || {}, JSON.parse(JSON.stringify(newState)));

    this.emitChange(stateId);
  }

  // delete state key in scope
  static deleteState(stateId: string, stateKey: string) {
    delete state[stateId][stateKey];

    this.emitChange(stateId);
  }

  // send change to all listeners in scope
  static emitChange(stateId: string) {
    const ev = new Event('state:update:' + stateId);
    window.dispatchEvent(ev);
    localStorage.setItem('app-state', JSON.stringify(state));
  }

  // listen to state changes
  static onState(stateId = 'global', callback: (s: StateObject) => void) {
    window.addEventListener('state:update:' + stateId, () => {
      callback(State.getState(stateId));
    });
  }

  // Get scoped state
  static getState(scope = 'global') {
    return state[scope] || {};
  }

  // Reset state to "DefaultState"
  static reset() {
    state = JSON.parse(JSON.stringify(DefaultState));
    const ev = new Event('state:update');
    window.dispatchEvent(ev);
    localStorage.setItem('app-state', JSON.stringify(state));
    console.log(state);
  }
}

// Global State var for development
declare global {
  interface Window { State: State; }
}
window.State = State;
