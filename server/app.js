// claming my caonst

const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
app.use(morgan('dev'));

// my var mockData is my array
var mockData = [
  {
    // key : value
    todoItemId: 0,
    name: 'an item',
    priority: 3,
    completed: false
  },
  {
    todoItemId: 1,
    name: 'another item',
    priority: 2,
    completed: false
  },
  {
    todoItemId: 2,
    name: 'a done item',
    priority: 1,
    completed: true
  }
];

// sending out a reponse of  200 "OK"
app.get('/', function (req, res) {
  res.json("ok");
});

// sending out the api todoitems as an array on to the web page all the parts of the array
app.get("/api/TodoItems/", function (req, res) {
  res.send(mockData);
});


// sending out a spacificly orderd part of the array
app.get("/api/TodoItems/:number", function (req, res) {
  // running a for loop to loop through the array to get the spacifice one that is need for user reqest
  for (var i = 0; i < mockData.length; i++) {
    // if the array index (key) is equal to the requested paramiters of number then send back the matching one in the array
    if (mockData[i].todoItemId == req.params.number) {
      res.send(mockData[i]);
    }
  }

});

// use bodyParser to req.body for each one  of the users input that will change
 app.use(bodyParser.json());

// this is where the user will post to change data in that array
app.post("/api/TodoItems", (req, res) => {
  //  new var to indicate the requst valuses of the user input
  var newA = {
    'todoItemId': req.body.todoItemId,
    'name': req.body.name,
    'priority': req.body.priority,
    'completed': req.body.completed
  };
  // var replace will be the new replacement made with the new data form user
var replace = false;
// for loop to loop threw all parts of the array and replace the one that is matching to users input
  for (var i = 0; i < mockData.length; i++) {
    if(mockData[i].todoItemId == newA.todoItemId) {
      // splice replaces in first place and  second deletes exp. (2,1) replaces in second place of array and deletes 1 after it
      mockData.splice(i,1,newA);
      replace = true;
    }
  }
  if (!replace) {
    mockData.push(newA)
  }
  res.status(201).json(newA);
});


// deleting a selected part  in the array
app.delete("/api/TodoItems/:number", function (req, res) {
  var gh = null;
  // for loop, loops through array looking for the matching  part that it will match to delete 
  for (var i = 0; i < mockData.length; i++) {
    if (mockData[i].todoItemId == req.params.number) {
      gh = mockData[i]
      // splice replaces in first place and  second deletes exp. (2,1) replaces in second place of array and deletes 1 after it
     mockData.splice(i,1);
    }
  }
  // sending a status of 200 back as "ok" and a jason with var gh that is null
  res.status(200).json(gh)
})


module.exports = app;


