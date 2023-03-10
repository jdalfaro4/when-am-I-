// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var time = dayjs().format('H:mm:ss');
$('#currentDay').text(`Current Time : ${time}`);

function keepTime() {
  let localStoragedata = JSON.parse(localStorage.getItem('schedule'))
  if(localStoragedata !== null){
    for(let i = 0; i < localStoragedata.length; i++) {
      let target_textarea = document.getElementById(`hour-${localStoragedata[i].time}`).childNodes[3]
      target_textarea.value = localStoragedata[i].message
    }
  }

}
keepTime()

function save () {
    let timeHours = [9, 10, 11, 12, 13, 14, 15, 16, 17]
    let currentHour = dayjs().format('H')

    for(i = 0; i < timeHours.length; i++) {
      let currenttimeBlock = $(`#hour-${timeHours[i]}`)

      if(timeHours[i] > currentHour) {
        currenttimeBlock.attr('class', 'row time-block future')
      } else if (timeHours[i] < currentHour){
        currenttimeBlock.attr('class', 'row time-block past')
      } else if (timeHours[i] === currentHour){
        currenttimeBlock.attr('class', 'row time-block present')
      }
      // console.log(currenttimeBlock.find('button'))

      let currentBtn = currenttimeBlock.find('button')

      currentBtn.click(function(event) {
        event.preventDefault();
        let currenttimeblockText = currenttimeBlock.find('textarea')[0].value
        let currentIndex = currenttimeBlock.attr('id').split('-')[1]

        let userData = {
          time : currentIndex,
          message : currenttimeblockText
      }
      let data = JSON.parse(localStorage.getItem('schedule'))
      if(data === null){
        data = []
        data.push(userData)
      } else{
        data.push(userData)
      }

      localStorage.setItem('schedule', JSON.stringify(data));

      })

    }

    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.

  };
  save()
//  saveBtn.eventListener('click', save)