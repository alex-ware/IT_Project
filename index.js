//runs the app 

// Import express 
const express = require('express') 
// Set your app up as an express app 
const app = express() 

// Tells the app to listen on port 3000 and logs that information to the console. 
app.listen(3000, () => { 
    console.log('works') 
}); 