/* Global Variables */
let url ="https://api.openweathermap.org/data/2.5/weather?zip="; //adding the url api openweathermap
let apiKey = ",us&appid=57b4c07506dd2c5d50ee2bf7a7ba03c8"; //adding my personal apikey from openweathermap



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();



//creating Async function to fetch data from the weathermap api
const apiData = async (url, Code, Key) => {
    const response = await fetch(url+Code+Key); //requesting data from api
    try {
        const data = await response.json();     //turn the recieved data into js object
        return data;
    } catch (error) {        //using catch to handle any erorr
        console.log(error); 
    }
};



//creating Async function to send data from the Client Side to server side
const sendData = async (url = "", data = {}) => {  //url to fetch to and an object contains data will be sent to server
    const response = await fetch(url, {   
        method: 'POST',     // setting the method of fetch to POST
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),     //convert json to string
    });
    try {
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);        //using catch to handle any erorr
    } 
};


//creating function to update ui 
const updateUi = async () => {
    const response = await fetch('/all')   //fetching data from the server
    try {
        const data = await response.json();    // converting data to js object
        document.getElementById('date').innerHTML = `today: ${data['date']}`;    //selecting the date div and updating its value
        document.getElementById('temp').innerHTML = `Temperature is: ${data['temperature']}`;   //selecting the temperature div and updating its value
        document.getElementById('content').innerHTML = ` Feelings: ${data['userResponse']}`;   //selecting the content div and updating its value
    } catch(error) {
        console.log(error);    //using ctach to handle any error
    }
}



//selecting the generate button and adding event with callback function
document.querySelector('#generate').addEventListener('click', (e) => {     
    const zipCode = document.querySelector('#zip').value;   //getting the zipcode from the user
    const feelings = document.querySelector('#feelings').value;   //getting the feelings from the user
    apiData(url, zipCode, apiKey).then((result) => {              //fetching data from weathmap api 
        //sending data to the server
        sendData('/add',{                
        temp: Math.round(result['main']['temp']),     //convert temp from float to int
        date: newDate,                                // send the date
        feelings: feelings})                          //send the feelings
    }).then(updateUi)
});














