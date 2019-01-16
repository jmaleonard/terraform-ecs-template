const express = require('express');
const app = express();
var bodyParser = require('body-parser')
var cors = require('cors')
// const bunyan = require('bunyan');
// var log = bunyan.createLogger({ name: "name-and-faces-dev-test" });
const { Employee } = require('./postgres/models');
const { syncTables } = require('./startup');


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;

app.get('/api/employees', (req, res) => {
  Employee.findAll().then(employees => res.json(employees))
});

app.get('/api/search/employee:name?', (req, res) => {
  if (req.params.name) {
    Employee.findAll({ where: { firstName: name, surname: name } }).then(employees => res.json(employees))
  }
  Employee.findAll().then(employees => res.json(employees))
});

app.get('*', (req, res) => {
  res.status(200).send('Welcome!.... the routes to use are /api/employees or /api/search/employee:name?');
});

syncTables(false);
app.listen(port);


