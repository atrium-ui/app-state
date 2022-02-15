# app-state

### A Simple Stupid State Manager.

This State Management system is based on how Events work in HTML5. It uses the bubble and capture mechanics of Events to propegate state updates to every element that wants to use state. All state is global, but each component is bound to a specific scope of the state. But every element *can* access any state.
  
  
The basis of that concept relies on a Custom Element "app-state", which captures and propegates new state of any element contained in its children.
Every page can have multiple app-state elements, app-state nesting it not supported at the moment.
  
  
### TODOs:

Update code documentation to JS Doc syntax
