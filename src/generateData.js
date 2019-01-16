'use strict';

const faker = require('faker');
const { Employee, Region } = require('./postgres/models');


const generateEmployees = async () => {
  for (let index = 0; index < 20; index++) {
    await Employee.create({
      email: faker.internet.email(),
      userId: faker.internet.userName(),
      firstName: faker.name.firstName(),
      surname:faker.name.lastName(),
      regionId: '584bd07b-2c0f-4f6f-ab7b-e6920ca4a88a'
    })  
  }
  for (let index = 0; index < 20; index++) {
    await Employee.create({
      email: faker.internet.email(),
      userId: faker.internet.userName(),
      firstName: faker.name.firstName(),
      surname:faker.name.lastName(),
      regionId: 'ddee92f3-10e7-4d46-ac91-233cb6dde01e'
    })  
  }
  process.exit();
}

const generateRegions = async () => {
  await Region.create({
    name: faker.address.city(),
    regionId: '584bd07b-2c0f-4f6f-ab7b-e6920ca4a88a' 
  })
  await Region.create({
    name: faker.address.city(),
    regionId: 'ddee92f3-10e7-4d46-ac91-233cb6dde01e'
  })
}

//generateRegions();
generateEmployees();