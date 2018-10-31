$(document).ready(function(){

  if (localStorage.getItem('key') && $('#list-container').is(':empty')) {
    console.log(localStorage);
    var data = JSON.parse(localStorage.getItem('key'));
    for (var index in data) {
      $('#list-container').append(`<li id="item-${index}">${data[index].name}<button class="delete-btn">x</button></li>`)
    }
  }

// CREATE ITEM

  var addItem = function(e){
    e.preventDefault();
    var curTextValue = $('#list-input').val(); // reading from <input>
    if (!curTextValue) { return }; // if <input> is empty, do nothing

    if (!localStorage.getItem('key')) {
      localStorage.setItem('key', '{"1": {"name": "' + curTextValue + '", "crossed" : false}}');
      var newIndex = 1;
    } else {
      // take the object out of localStorage
      // JSON.parse it & append new item to the object
      // JSON.stringify it & save it back in
      var data = JSON.parse(localStorage.getItem('key'));
      var allIndexes = Object.keys(data).map(x => parseInt(x)).sort();
      var newIndex = allIndexes[allIndexes.length-1]+1;
      data[newIndex] = {"name": curTextValue, "crossed" : false};
      localStorage.setItem('key', JSON.stringify(data));
      // localStorage.setItem('key', '{"1": {"name": "Walk dog", "crossed" : false}, "2": {"name": "Wash dishes", "crossed" : false}}')
    }

    $('#list-container').append(`<li id="item-${newIndex}">${curTextValue}<button class="delete-btn">x</button></li>`)

    $('#list-input').val("");
  };

  // event listener: if button clicked, add item
  $("#add-text-btn").on("click", addItem);

// DELETE INDIVIDUAL ITEM

  $('.delete-btn').on("click", function() {
    $(this).parent().remove();
    var $id = $(this).parent().attr("id").slice(5);
    var data = JSON.parse(localStorage.getItem('key'));
    console.log(data[$id])
    delete data[$id];
    localStorage.setItem('key', JSON.stringify(data));
    if ($('#list-container').is(':empty')) {
      localStorage.clear()
    }
  });

// REMOVE ALL ITEMS

  // event listener
  $("#clear-cache-btn").on("click", function(){
    localStorage.clear()
  });

});