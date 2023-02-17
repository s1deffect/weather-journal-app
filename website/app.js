/* Global Variables */
let url ="https://api.openweathermap.org/data/2.5/weather?zip="; //adding the url api openweathermap
let apiKey = ",us&appid=57b4c07506dd2c5d50ee2bf7a7ba03c8"; //adding my personal apikey from openweathermap
const zipCode = "99501" ;


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

//creating Async function to fetch data from the weathermap api
const apiData = async (url, Code, Key) => {
    const response = await fetch(url+Code+Key); //requesting data from api
    try {
        const data = await response.json();     //turn the recieved data into js object
        console.log(data);
        return data;
    } catch (error) {        //using catch to detect any erorr
        console.log(error); 
    }
};

