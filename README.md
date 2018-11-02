# hrext05-cruddy-app
#CRUD #javascript

### Ticket #HREXT05

Requirements: 
- [ ] Create a basic CRUD framework for future development. 
- [ ] Needs to be able to read and write to local storage in a generic fashion so that the development team can extend the functionality as needed.
- [ ] Basic Form GUI with interactivity attached to the storage events.


### CRUD App: To Do

#### Basic Requirements

- [x] create individual items
- [x] delete individual items
- [x] edit individual items

##### Notes
- [ ] Keep DOM and localStorage matching 
- [ ] Remember event delegation when adding new items
- [ ] Make sure we do not duplicate data
- [ ] Add different values to the item

  ex.
```javascript
 item =  {
  id: "thing used for key",
  text-value: "some text",
  categories: [ 'cat1', 'cat2' ],
  isComplete: boolean,
  dateCreated: dateCreated,
  dateCompleted: dateCompleted
  ...
  etc
  }
```

#### Potential Libraries
- [ ] lodash/underscore
- [ ] jquery ui
- [ ] bootstrap/material (css library)

#### My Spin
- CSS preprocessing with SASS
- Icons from FontAwesome
