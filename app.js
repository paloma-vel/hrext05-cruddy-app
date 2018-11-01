$(document).ready(function(){

var getData = function() {
  return JSON.parse(localStorage.getItem('key'));
}

var buttons = '<button class="delete-btn"><i class="fas fa-times"></i></button><button class="edit-btn"><i class="fas fa-pencil-alt"></i></button>'

// READ

var readItems = function() {
  if (localStorage.getItem('key') && $('#list-container').is(':empty')) {
    var data = getData();
    for (var index in data) {
      var li = `<li id="item-${index}"><span>${data[index].name}</span>${buttons}</li>`;
      $('#list-container').append(li);
    }
  }
}

readItems();

// CREATE ITEM

  var addItem = function(e){
    e.preventDefault();
    var curTextValue = $('#list-input').val(); // reading from <input>
    if (!curTextValue) { return }; // if <input> is empty, do nothing

    if (!localStorage.getItem('key')) {
      localStorage.setItem('key', '{"1": {"name": "' + curTextValue + '", "completed" : false}}');
      var newIndex = 1;

    } else {

      // Take the object out of localStorage & JSON.parse it
      var data = getData();
      var allIndexes = Object.keys(data).map(x => parseInt(x)).sort();
      var newIndex = allIndexes[allIndexes.length-1]+1;

      // Append new item to the object
      data[newIndex] = {"name": curTextValue, "completed" : false};

      // JSON.stringify it & save it back in
      localStorage.setItem('key', JSON.stringify(data));
      // localStorage.setItem('key', '{"1": {"name": "Walk dog", "completed" : false}, "2": {"name": "Wash dishes", "completed" : false}}')
    }

    var li = `<li id="item-${newIndex}"><span>${curTextValue}</span>${buttons}</li>`;
    $('#list-container').append(li);
    
    //window.location.reload(true);
    $('#list-input').val("");
  };

  // event listener: if button clicked, add item
  $("#add-text-btn").on("click", addItem);

// DELETE INDIVIDUAL ITEM

  $('.delete-btn').on("click", function() {
    console.log("clicked")
    $(this).parent().remove();
    var $id = $(this).parent().attr("id").slice(5);
    var data = getData();
    delete data[$id];
    localStorage.setItem('key', JSON.stringify(data));
    if ($('#list-container').is(':empty')) {
      localStorage.clear()
    }
  });

// DELETE ALL ITEMS AT ONCE

  // event listener
  $("#clear-cache-btn").on("click", function(){
    localStorage.clear()
  });

// EDIT ITEM

  $('.edit-btn').on("click", function() {

    if ($(this).html() === '<i class="far fa-save"></i>') {
      $(this).html('<i class="fas fa-pencil-alt"></i>');

      // make span un-editable again
      // save text info to appropriate part of object in localStorage
    }

    if ($(this).html() === '<i class="fas fa-pencil-alt"></i>') {
      $(this).html('<i class="far fa-save"></i>');
      $(this).parent().children(':first-child').attr('contenteditable', 'true');
    }

  })

});