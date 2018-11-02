$(document).ready(function(){

var buttons = '<button class="delete-btn"><i class="fas fa-times"></i></button><button class="edit-btn"><i class="fas fa-pencil-alt"></i></button>';

// READ ITEMS
var getData = function() {
  return JSON.parse(localStorage.getItem('todo-items'));
}

// DELETE INDIVIDUAL ITEM
var handleDeleteClick = function() {
  var $item = $(this).parent();
  var id = $item.data("todoid");
  var data = getData();
  data.splice(data.findIndex(function(element) {
    return element.id == id;
  }), 1);
  localStorage.setItem('todo-items', JSON.stringify(data));
  if ($('#list-container').is(':empty')) {
    localStorage.clear();
  }
  $item.remove();
}

// EDIT ITEM
var handleEditClick = function() {
  var $li = $(this).parent();
  var $span = $li.children(':first-child');
  if ($(this).html() === '<i class="fas fa-pencil-alt"></i>') {
    $(this).html('<i class="far fa-save"></i>');
    $span.attr('contenteditable', 'true');
    $span.focus();
  } else {
    $(this).html('<i class="fas fa-pencil-alt"></i>');
    $span.attr('contenteditable', 'false');
    var $text = $span.text(); // get contents of current list item span
    var data = getData();
    var id = $li.attr("data-todoid");

    data.map(obj => {
      if (obj["id"] == id) {
        obj["name"] = $text;
      }
    })
    localStorage.setItem('todo-items', JSON.stringify(data));

  }
}

// READ ON PAGE LOAD
var readItems = function() {
  if (localStorage.getItem('todo-items') && $('#list-container').is(':empty')) {
    var data = getData();
    data.forEach(function (el) {
      var li = `<li id="item-${el.id}" data-todoid="${el.id}"><span>${el.name}</span>${buttons}</li>`;
      $('#list-container').append(li);
    });
    $('.delete-btn').on("click", handleDeleteClick);
    $('.edit-btn').on("click", handleEditClick);
  }
}

readItems();

// CREATE ITEM
  var addItem = function(e){
    e.preventDefault();
    var curTextValue = $('#list-input').val(); // reading from <input>
    if (!curTextValue) { return }; // if <input> is empty, do nothing

    if (!localStorage.getItem('todo-items')) {
      localStorage.setItem('todo-items', '[{"id": 1, "name": "' + curTextValue + '", "completed" : false}]');
      var nextID = 1;

    } else {

      // Take the array out of localStorage & JSON.parse it
      var data = getData();
      var length = data.length;
      if (length > 0) {
        var nextID = data[length - 1].id + 1;
      } else {
        var nextID = 1;
      }

      // Append new item to the array
      data.push({"id": nextID, "name": curTextValue, "completed" : false});

      // JSON.stringify it & save it back in
      localStorage.setItem('todo-items', JSON.stringify(data));
    }

    var li = `<li id="item-${nextID}" data-todoid="${nextID}"><span>${curTextValue}</span>${buttons}</li>`;
    $('#list-container').append(li);

    $('#item-' + nextID + ' .delete-btn').on("click", handleDeleteClick);
    $('#item-' + nextID + ' .edit-btn').on("click", handleEditClick);
    
    $('#list-input').val("");
  };

  // event listener: if button clicked, add item
  $("#add-text-btn").on("click", addItem);

// DELETE ALL ITEMS AT ONCE
  $("#clear-cache-btn").on("click", function(){
    localStorage.clear()
  });


});