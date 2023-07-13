// acceptance criteria:
// GIVEN a weather dashboard with form imputs
// when i search for a city
// THEN i am presented with current and future conditions for that city and that city is added to the search bar
// Display current and current conditions, and then the city is added to the search history

// When i view a current weather conditions for that city
// THEN i am presented with the city name, the date, an icon representation of weather conditions

//when i view future weather conditions for that city
//THEN i am presented with a 5 day forecast that displays the date, and icon,

// WHEN i click on a city in the search history
// THEN i am again presented with current and future conditions for that city

//HTML
    //Header
    //aside
        //form
            //title
            // imput field
            //search button
        //div/section etc.
            //append search info from imput field above
        //div/container (can add classes for spacing)
            //create multiple divs to allow for content to be appended

//CSS
    //can use framework/bootstrap

//JS (most acceptance criteria done here)
    // variable that saves the list of cities
        //ex: var cities = []

    // variable that stores an api key (this is not a standard practice)
        // ex: var apikey = ""

    // query selectors to append return information
        // ex: var currentDay
        // ex: var searchHistory
        // ex: var imput(for text field in the form)
        // ex: var form (for the form itself)
        // ex: var5DayForcast (where the forecast will be appeneded)

    // function:
        // gets the info from local storage and saves it to the array
            // check for data saved in the local storage (not null)
                // localStorage.getItem
                    // conditional statement to check for null
                        //if null, do nothing (as there is nothing to create)
                        // if data is stored. set global variable of searchHistory to include saved data
                            // call generate button function

        // generate button with the city from the array (searchHistory)
            // clear current buttons (target parent div and clear information)(innerHTML)
            // loop over cities, and generate elements onto the page

        // needs event listener that calls the function to display weather data
            // target the "search button"
            // create a variable that holds the imput
            // preventDefault()
            // validate the text field has information
                // conditiomal statement
                    // if text is entered, pull and display weather data
                    // if no text is entered, alert saying 'please enter a city'
            // Save imput data to the array
                // save to array defined earlier
                    // arrayname.push (sends to the array)
                    // save to local storage so that the information persists upon refresh
                    // generateButton to re render the buttons on the aside
                    // call fetch data function, pass the city searched to the fetch data function
                    //

    // fetch call to pull city weather information and display
        // create variable with API we are searching for
            // fetch call with that API var to retrieve weather data
        // create var long, var lat, var city
            // create new URL using the above variables
            // fetch call with API to retrieve the weather data
            // call render data function (passing)

        // render data 
            // create variable for temp, wind speed, humidity
            // fetch call to retrieve icons
            // append current conditions to the current div
            // append future forecast

    // function call to start the app
