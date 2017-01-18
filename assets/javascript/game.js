var buttons = ['Kim Kardashian', 'Donald Trump', 'Hillary Clinton', 'Snoop Dogg','Vodka', 'Dogs', 'Cats', 'Bacon'];

// Calls AJAX on button click

function grabGIF(event) {
  var search = event.target.getAttribute('data-name');
  search = search.replace(' ', '+');
  search = search.toLowerCase();
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?',
            method: 'GET',
            dataType: 'json',
            data: { 
            api_key: 'dc6zaTOxFJmzC',
            q: search,
            limit: 100 
            },
        })
        .done(function(searchData) {
          var results = searchData['data'];
          console.log(results);
          results = shuffleGiphys(results);

          $('#giphy-display').empty();

          // Loops through the results - adds GIFs to page
            for(var i = 0; i < 10; i++){
              var newGif = $('<img>');
              newGif.attr('data-still', results[i].images.original_still.url);
              newGif.attr('data-active', results[i].images.original.url);
              newGif.attr('src', newGif.attr('data-active'));

              // Adds a click event to each GIF
              newGif.on('click', function(){
                
                if($(this).attr('src') === $(this).attr('data-still')){
                  console.log('active');
                  $(this).attr('src', $(this).attr('data-active'));

                } else {
                  $(this).attr('src', $(this).attr('data-still'));
                }
              });
              
              newGif.addClass('img-fluid thumbnail');
              $('#giphy-display').append(newGif);
            }
        });
}

// Shuffles through 100 GIFS and pulls 10 random ones
function shuffleGiphys(arr){
  var temp = [];

  for(var i = 0; i < 10; i++){
    var position = Math.floor(Math.random() * arr.length);
    var arrPlace = arr.splice(position,1);
    temp.push(arrPlace[0]);
  }
  console.log(temp);
  return temp;
}

// Adds new button to page
function renderButtons(){
  var buttonArea = $('#button-display');
  buttonArea.empty();
  var buttonCounter = 0;
  buttons.forEach(button => {
    var newButton = $('<button>');
    newButton.attr('data-name',button);
    newButton.text(button);
    newButton.on('click',grabGIF);
    newButton.addClass('btn btn-primary button');
    buttonArea.append(newButton); 
  });
}

// Pulls info from input box to create a new button
function createButton(e){
  if (!$('#create-a-button').val().trim()){
    $('#giphy-display').empty();
    dn.addClass('img-responsive thumbnail');
    $('#giphy-display').append(dn);
    setTimeout(function(){$('#giphy-display').empty();}, 3000);
    return;
  }
  buttons.push($('#create-a-button').val().trim());
  renderButtons();
  $('#create-a-button').val('');
  return false;
}

// Starts the program
$(document).ready(function(){
  renderButtons();
  $('#create-button').on('click', createButton);
  $(document).on('keydown', function(e){
    console.log(e.keyCode);
    if(e.keyCode === 13){
      createButton();
    }
    return;
  });
});