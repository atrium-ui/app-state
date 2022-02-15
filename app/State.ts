import DefaultState from './DefaultState';


/**
 * Stores the application state
 */
let state: StateObject = JSON.parse(JSON.stringify(DefaultState));


export default class State {

  /**
   * This getter returns the current global state
   *
   * @return {StateObject} State Object
   */
  static get currentState(): StateObject {
    return state;
  }

  /**
   * Updates state in scope
   *
   * @param {string} scope - State scope
   * @param {object} data - State data
   */
  static setState(scope: string, newState: any) {
    // deep copy new state and save to global state
    // NEXT: replace JSON with "deepcopy" at some point
    state[scope] = Object.assign(state[scope] || {}, JSON.parse(JSON.stringify(newState)));

    this.emitChange(scope);
  }

  /**
   * delete state in scope
   *
   * @param {string} scope - State scope
   */
  static deleteState(scope: string, stateKey: string) {
    delete state[scope][stateKey];
    this.emitChange(scope);
  }

  /**
   * send change to all listeners in scope
   *
   * @param {string} scope - State scope
   */
  static emitChange(scope: string) {
    const ev = new Event('state:update:' + scope);
    window.dispatchEvent(ev);
    localStorage.setItem('app-state', JSON.stringify(state));
  }

  /**
   * listen to state changes of scope
   *
   * @param {string} scope - State scope
   * @param {function} callback - Callback function
   */
  static onState(scope = 'global', callback: (s: StateObject) => void) {
    window.addEventListener('state:update:' + scope, () => {
      callback(State.getState(scope));
    });
  }

  /**
   * get state of scope
   *
   * @param {string} scope - State scope
   */
  static getState(scope = 'global') {
    return state[scope] || {};
  }

}

// Global State var for development
declare global {
  interface Window { State: State; }
}
window.State = State;
