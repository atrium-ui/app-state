# The app-state Element


## Event Capturing
The app-state Element catches all Events dispatched by its children. But for that to work the Events need to have ```bubble: true``` set. This causes the event to bubble up to the closest app-state Element.

Once the Event reaches the first app-state Element, it will cancel the bubbling of the Event.

```HTML
<main>

  <h1>Test app-state</h1>

  <app-state scope="some_scope">
    <input state-key="input_value"/>
  </app-state>

</main>
```

The app-state Element assumes state data will be available through the ```value``` property of the target Element.

For example. When an ```<input/>``` dispatches a change event. The parent ```<app-state/>``` will catch the event and set the state value, defined in the ```type``` attribute of the target element (```<input/>```) to the value of the ```value``` property of the target element.

```JSON
{
  "some_scope": {
    "input_value": "<input string>"
  }
}
```

Additionally a ```key``` property can be defined by the target element OR the app-state element. Which will set the value inside the scope to the target element value.

```JSON
{
  [scope]: {
    [key]: <target-element "value">
  }
}
```

## Reacting to state change

Every ```<app-state/>``` element listens on its on type by default. When a state change occurs from an external source, it will react with setting the ```value``` property of each child defining a ```state-key``` property.


## app-state properties


### type
This describes the root scope of the state data


### key
This defines another key inside the scope.
Useful for lists and other uniquely identifiable items.




## Target Element properties


### state-type
This describes the root scope of the state data


### state-key
This defines another key inside the scope.
Useful for lists and other uniquely identifiable items.


