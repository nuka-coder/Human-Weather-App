//Variables for keys (will env ignore later, these are free so don't waste your time trying to steal them)
const apiKey1 = "5a0d3d8c3daeb2bd5ede54a25170773d";
const apiKey2= "0a21ace2e1d4500f00df05b69be0544c"
const geoKey= "290244149c2047599b1fd37a44996bc2"


//API for header Quotes
$.getJSON("https://type.fit/api/quotes", function(data) {
  //to get a whole number between 0 and 1643
  const quoteNumber = Math.floor(Math.random() * 1644);
  //to pull random quote from api object based on array position
  const quote = data[quoteNumber].text;
  //to append above quote to p tag in html
  $(".quote").append("Quote of the day: " + '"' + quote + '"');
});

// Farenheit degrees button add event listener
document.getElementById("celsius-btn").addEventListener("click", function() {
  alert("Still working on that!");
});

//Default "Current" Weather (Boston, USA) Applied on Page Load
function defaultCurrentWeatherData() {
  $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=Boston&units=imperial&appid=" + apiKey1, function(data) {
    console.log("No location specified. Default city.");
    let defaultCity = "Boston";
    //assigning location details to html element
    $(".location").html(defaultCity + ", USA");
    //Appending weather icon from openweather API to HTML img src
    const weatherIcon = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    $(".current-weather-icon").attr("src", weatherIcon);
    //Appending weather temperature from API to HTML p tag
    const temperature = data.main.temp;
    const tempStr = String(temperature);
    const tempReduced = tempStr.slice(0, 2);
    $(".current-temperature").html(tempReduced + " &#176" + "F");
    //Appending weather description from API to HTML p tag
    const weatherDescription = data.weather[0].description;
    $(".current-weather-description").html(weatherDescription);
  });
}
defaultCurrentWeatherData();
// IMPORTANT. This function is called automatically to generate data in current weather fields.
// Current Weather Fields would be empty on load without this function called

//Default 3 Hour forecast
function threeHourForecastDefault() {
  let defaultCity = "Boston";
  $.getJSON("https://api.openweathermap.org/data/2.5/forecast?q=" + defaultCity + "&units=imperial&appid=" + apiKey2, function(data) {
    $(".city-title").html(defaultCity);

    weatherIconAssingment(data);
    timeOfDayAssignments(data);
    weatherDescriptionThreeHour(data)
    weatherHigh(data);
    weatherLow(data)
  });
}
threeHourForecastDefault();
// IMPORTANT. Function called automatically to generate data in 3 hour weather fields.
// 3 hour Weather Fields would be empty on load without this function called

// City Search Field Scripts

//Adding Click Event Listener to Display City Search Field
$("#open-searchBar-btn").on("click", function() {
  $(".sidepanel-2-hidden").css("display", "inherit");
  $(".sidepanel-2-visible").css("display", "inherit");
  $(".sidepanel-1-section").css("display", "none");
  $(".sidepanel-2-hidden").css("display", "inherit");
});
//Adding event Listener for Search Button (for city search input)
$(".search-submit-btn").on("click", function(event) {
  event.preventDefault();
  citySubmission();
  $(".sidepanel-2-hidden").css("display", "none");
  $(".sidepanel-2-visible").css("display", "inherit");
  $(".sidepanel-1-section").css("display", "inherit");
  $(".sidepanel-2-hidden").css("display", "none");
  // $("#city-search-feature").addClass("sidepanel-2-hidden").removeClass("sidepanel-2-visible");
  // $(".sidepanel-1-section").removeClass("sidepanel-1-hidden");
  // clearing search field after form submission
  document.getElementById("searchInput").value = "";
});

//Exit Button for Search Bar
$(".exit-btn").on("click", function() {
  // makes Search Field hidden
  $("#city-search-feature").removeClass("sidepanel-2-visible").addClass("sidepanel-2-hidden");
  // Makes Current Weather Sidebar Visible
  $(".sidepanel-1-section").removeClass("sidepanel-1-hidden");
});

//City Search Input: Retrieving Data for custom city: Current Weather, 3 Hour Weather, and Weather Highlights.
function citySubmission() {
  //retrieving value of search input field
  var city = document.getElementById("searchInput").value.toUpperCase();
  //Getting Current Weather for city input variable
  $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey1, function(data) {
    //Appending weather icon to img src
    const weatherIcon = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    $(".current-weather-icon").attr("src", weatherIcon);
    //Appending weather temperature to p tag
    const temperature = data.main.temp;
    $(".current-temperature").html(temperature);
    const tempStr = String(temperature);
    const tempReduced = tempStr.slice(0, 2);
    $(".current-temperature").html(tempReduced + " &#176" + "F");
    //Appending weather description to p tag
    const weatherDescription = data.weather[0].description;
    $(".current-weather-description").html(weatherDescription);
  });
  //Getting 3 hour custom city weather data
  $.getJSON("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey2, function(data) {
    $(".location").html(city);
    $(".city-title").html(city);
    console.log("3 Hour forecast, custom searched city.");
    //Getting Highlights data for custom city search
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey2, function(data) {
      const airPressure = data.main.pressure;
      $(".air-pressure").html(airPressure);
      const humidity = data.main.humidity;
      $(".humidity").html(humidity);
      // Assigning percentage number to humidty meter
      $(".humidity-meter-text").html(humidity + "%");
      // Assigning width for humidity bar
      $("#humidity-meter").css("width", humidity + "%");
      const visibility = data.visibility;
      $(".visibility").html(visibility);
      const windSpeed = data.wind.speed;
      $(".wind-speed").html(windSpeed);
    });

    weatherIconAssingment(data);
    timeOfDayAssignments(data);
    weatherDescriptionThreeHour(data)
    weatherHigh(data);
    weatherLow(data)
  });
}

// GPS Geolocation Script
//Add Event Listener for GPS Button (Collect GPS Location)
$("#gps-location-btn").on("click", function() {
  navigator.geolocation.getCurrentPosition(successfulLookup);
});

//Current Date
//Current Date displayed in Current Weather Sidebar
const currentDate = new Date();
const currentDateStr = String(currentDate);
const dateDisplayed = document.getElementById("current-date").innerHTML = currentDateStr.slice(0, 10);

//if User allows coordinate sharing (Current Weather Display)
function coordsAllowedWeather({
  latitude,
  longitude
}) {
  $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=" + apiKey1, function(data) {
    console.log("Coords allowed, coordinate city");
    //Appending weather image from API to HTML img src
    const weatherIcon = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    $(".current-weather-icon").attr("src", weatherIcon);
    //Appending weather temperature from API to HTML p tag
    const temperature = data.main.temp;
    $(".current-temperature").html(temperature);
    //adding degree symbol
    const tempStr = String(temperature);
    const tempReduced = tempStr.slice(0, 2);
    $(".current-temperature").html(tempReduced + " &#176" + "F");
    //Appending weather description from API to HTML p tag
    const weatherDescription = data.weather[0].description;
    $(".current-weather-description").html(weatherDescription);
  });
}
//Choosing what function to run based on if coordinates are allowed
function weatherLocationAssigment({
  latitude,
  longitude
}) {
  if (navigator.geolocation) {
    coordsAllowedWeather({
      latitude,
      longitude
    });
  } else {
    //this will run the default city of Boston, USA.
    defaultCurrentWeatherData();
  }
};

//Geolocation API
//Converting latitude and longitude to location using Open Cage api
const successfulLookup = function(position) {
  const {
    latitude,
    longitude
  } = position.coords;
  fetch("https://api.opencagedata.com/geocode/v1/json?q={latitude}+{longitude}&key=" + geoKey)
    .then(res => res.json())
  // .then(data => $(".location").html(data.results[0].components.country));
  weatherLocationAssigment({
    latitude,
    longitude
  });
  threeHourForecast({
    latitude,
    longitude
  });
  highlightsData({
    latitude,
    longitude
  });
};

//Highlights Data Function
function highlightsData({
  latitude,
  longitude
}) {
  $.getJSON("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=daily&appid=" + apiKey2, function(data) {
    console.log(latitude);
    console.log(longitude);
    $(".location").html(data.timezone);
    $(".city-title").html(data.timezone);
    const airPressure = data.current.pressure;
    $(".air-pressure").html(airPressure);
    const humidity = data.current.humidity;
    $(".humidity").html(humidity);
    // Assigning percentage number to humidty meter
    $(".humidity-meter-text").html(humidity + "%");
    // Assigning width for humidity bar
    $("#humidity-meter").css("width", humidity + "%");
    const visibility = data.current.visibility;
    $(".visibility").html(visibility);
    const windSpeed = data.current.wind_speed;
    $(".wind-speed").html(windSpeed);
    // Assigning windspeed icon
    $("#wind-speed-icon").css("display", "inline-block");
  });
};

//3 Hour forecast Function
function threeHourForecast({
  latitude,
  longitude
}) {
  $.getJSON("https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=" + apiKey2, function(data) {
    weatherIconAssingment(data);
    timeOfDayAssignments(data);
    weatherDescriptionThreeHour(data)
    weatherHigh(data);
    weatherLow(data)
  });
}
// Weather Icons Assignment Function (3 Hour Forecast)
function weatherIconAssingment(data) {
  for (let i = 0; i <= 4; i++) {
    const fiveDayIcon = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
    $(".weather-icon-" + i).attr("src", fiveDayIcon);
  }
};
//Weather Time Assignment Function (3 hour Forecast)
function timeOfDayAssignments(data) {
  for (let i = 0; i <= 4; i++) {
    //yeilds date and time in 24hr format
    const date = data.list[i].dt_txt;
    //converts date variable into 12hour format with am/pm
    console.log(date);
    const hour24convert12 = function convertTime() {
      //yields two digit time hour (ie: 03, or 12)
      const timeOfDay = date.slice(11, 13);
      if (timeOfDay <= 9 & timeOfDay != 0) {
        //yields single digit time hour for am values
        return timeOfDay.slice(1, 2) + "am";
      } else if (timeOfDay == 10 || timeOfDay == 11) {
        return timeOfDay + "am";
      } else if (timeOfDay == 12) {
        return "Noon";
      } else if (timeOfDay == 24 || timeOfDay == 0) {
        //00 and 24 hours in 24hour format equivalent to Midnight
        return "Midnight";
      } else {
        return timeOfDay % 12 + "pm";
      }
    };
    //appending above result to forecast time titles in 3 hour forecast
    $(".forecast-times-" + i).html(hour24convert12);
  }
};

//Weather Descriptions Function (3 Hour Forecast)
function weatherDescriptionThreeHour(data) {
  for (let i = 0; i <= 4; i++) {
    const descriptionOfWeather = data.list[i].weather[0].description;
    $(".3-hour-weather-description-" + i).html(descriptionOfWeather);
  }
};

//Weather High Function (3 Hour Forecast)
function weatherHigh(data) {
  for (let i = 0; i <= 4; i++) {
    const degreeC = " &#176" + "C";
    const degreeF = " &#176" + "F";
    const weatherHigh = data.list[i].main.temp_max;
    const weatherHighStr = String(weatherHigh);
    const weatherHighReduced = weatherHighStr.slice(0, 2);
    $(".high-temp-" + i).html(weatherHighReduced + degreeF + " / ");
  }
};
//Weather Low Function (3 Hour Forecast)
function weatherLow(data) {
  for (let i = 0; i <= 4; i++) {
    const degreeC = " &#176" + "C";
    const degreeF = " &#176" + "F";
    const weatherLow = data.list[i].main.temp_min;
    const weatherLowStr = String(weatherLow);
    const weatherLowReduced = weatherLowStr.slice(0, 2);
    $(".min-temp-" + i).html(weatherLowReduced + degreeF);
  }
};

//Search Field Script for Autocompletion
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
    var a, b, i, val = this.value;

    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;

    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");

    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function(e) {
    closeAllLists(e.target);
  });
}

//Send search field value to API onSubmit
const searchForm = document.getElementById("searchForm");
const searchValue = document.getElementById("searchInput").value.toUpperCase();

//Background Image Assignments
//assigns a random background image from imgs folder to body element on refresh
function backgroundImageAssignment() {
  //create random number from 0-3
  let randomNumber = Math.floor(Math.random() * 4);
  //target css element to change image url with randomNumber
  $("body").css("backgroundImage", "url(assets/imgs/background-image-" + randomNumber + ".jpg)");
};

//Degrees button (Celsius/Farenheit)
function celsiusClick() {
  const cDegreeBtn = document.getElementById("celsius-button");
  cDegreeBtn.on("click", function() {
    if ($(".location")) {

    }
  })
};



//Add event listener for page load/refresh to call backgroundImageAssignment Function
// window.addEventListener("load", function(){
//   backgroundImageAssignment();
// });




//Array of Cities for Autocomplete Search Field
//Consider using a npm city list module to reduce amount of code here
var cities = ["Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amarillo", "Anaheim", "Anchorage", "Ann Arbor", "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada", "Asheville", "Athens", "Atlanta", "Atlantic City", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge", "Beaumont", "Bel Air", "Bellevue", "Berkeley", "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise", "Boise City", "Bonita Springs", "Boston", "Boulder", "Bradenton", "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral", "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign", "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake", "Chicago", "Chula Vista", "Cincinnati", "Clarke County", "Clarksville", "Clearwater", "Cleveland", "College Station", "Colorado Springs", "Columbia", "Columbus", "Concord", "Coral Springs", "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Davenport", "Davidson County", "Dayton", "Daytona Beach", "Deltona", "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham", "El Monte", "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido", "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Fitchburg", "Flint", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach", "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville", "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", "Grand Prairie", "Grand Rapids", "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi", "Hagerstown", "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace", "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", "High Point", "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach", "Huntsville", "Independence", "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson", "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", "Kalamazoo", "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey", "Lafayette", "Lake Charles", "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces", "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", "Little Rock", "Long Beach", "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina", "Marysville", "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite", "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", "Mobile", "Modesto", "Monroe", "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach", "Naperville", "Naples", "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans", "New York", "New York City", "Newark", "Newburgh", "Newport News", "Norfolk", "Normal", "Norman", "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", "Panama City", "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh", "Plano", "Pomona", "Pompano Beach", "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda", "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland", "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford", "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul", "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio", "San Bernardino", "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Maria", "Santa Rosa", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport", "Simi Valley", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma", "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo", "Topeka", "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"];

//initiate the autocomplete function on the "searchInput" element, and pass along the cities array as possible autocomplete values://
autocomplete(document.getElementById("searchInput"), cities);
