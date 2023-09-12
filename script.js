// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// var saveButton = $("#save-button");
// var currentDate = $("#currentDay");
// const colorCode = $("input[name='color-time']");


// saveButton.on("click", function() { 

//   console.log("clicked", saveButton);

// });

// // This section: Adds the current date in the header 
// var time = new Date();
// var dateGenerator= (time.getMonth()+1) + "/" + time.getDate();
// currentDate.append(dateGenerator);
// console.log(time);


$(function () {
  const currentDay = dayjs();

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
  $('.time-block').each(function (index, timeBlock) {
    const schedules = JSON.parse(localStorage.getItem('schedules'));
    const scheduleHour = timeBlock.getAttribute('data-hour');
    const currentHour = dayjs().hour();
   
    if (scheduleHour > currentHour) {
      timeBlock.classList.add('future') 
    } else if (scheduleHour < currentHour) {
      timeBlock.classList.add('past') 
    } else {
      timeBlock.classList.add('present')
    }

  
    schedules.forEach(function (schedule) {
      if ( timeBlock.getAttribute("data-hour") === schedule.hour) {
        timeBlock.querySelector("textarea").value = schedule.text;
      }
    });

    

   timeBlock.addEventListener("click", function (event) {
      if (event.target.matches('button')) {
        console.log("clicked button");
        console.log(event.target)
        saveSchedule(event);
    
      }
    });
  });

function saveSchedule(event) {
  const hour = event.target.parentElement.getAttribute("data-hour");
  const text = event.target.parentElement.querySelector("textarea").value;
  const newSchedule = {
    hour: hour, 
    text: text
  };
  console.log("hour", hour);
  console.log("text", text);

  if (localStorage.getItem('schedules')) {

    const schedules = JSON.parse(localStorage.getItem('schedules'));
    
    const indexRmv = schedules.findIndex(function (schedule) {
      console.log(schedule);
     if (newSchedule.hour === schedule.hour) {
      return true;
     }
    });
    if (indexRmv !== 1) {
      schedules.splice(indexRmv, 1);
    }

    schedules.push(newSchedule);
    localStorage.setItem('schedules', JSON.stringify(schedules));
  } else {
    const schedules = [];
    schedules.push(newSchedule);
    localStorage.setItem('schedules', JSON.stringify(schedules));
  }
}


// function loadSchedules() {
//   const schedules = JSON.parse(localStorage.getItem('schedules'));
// }

$('#currentDay').text(currentDay.format('dddd, MMMM D'))
});

