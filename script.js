require('dotenv').config();
const axios = require('axios').default;
const { City, Department, Region } = require('./app/models');

// CREATE ALL REGIONS

const createRegion = async (name, code) => {
  await Region.create({
    region_name: name,
    code,
  });
}
const optionsRegions = {
  method: 'GET',
  url: 'https://geo.api.gouv.fr/regions',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
};
const createDepartment = async (name, code, region_code) => {
  await Department.create({
    department_name: name,
    code,
    region_code,
  });
};
const optionsDepartments = {
  method: 'GET',
  url: 'https://geo.api.gouv.fr/departements',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
};
const createCity = async (name, code, department) => {
  await City.create({
    city_name: name,
    zipcode: code,
    department_code: department
  })
}
const optionsCities = {
  method: 'GET',
  url: 'https://geo.api.gouv.fr/communes',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
};

axios.request(optionsRegions).then(function (regions) {
  regions.data.map(async (region) => createRegion(region.nom.toUpperCase(), Number(region.code)));
}).catch(function (error) {
  console.error(error);
}).then(() => {
  // CREATE ALL DEPARTMENTS
  axios.request(optionsDepartments).then(function (departments) {
    departments.data.map(async (dpt) => createDepartment(dpt.nom.toUpperCase(), dpt.code, Number(dpt.codeRegion)));
  }).catch(function (error) {
    console.error(error);
  }).then(() => {
    // CREATE ALL CITIES
    axios.request(optionsCities).then(function (cities) {
      cities.data.map(async(city) => createCity(city.nom.toUpperCase(), city.code, city.codeDepartement))
    }).catch(function (error) {
      console.error(error);
    }).then(console.log('Installation complete'));
  });
});



