require('dotenv').config();
const axios = require('axios').default;
const { City, Department, Region } = require('./app/models');

// CREATE ALL REGIONS

const createRegion = async (name, code) => {
  try {
  await Region.create({
    region_name: name,
    code,
  });
} catch(error) {
  console.trace(error);
}
}
const optionsRegions = {
  method: 'GET',
  url: 'https://geo.api.gouv.fr/regions',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
};
const createDepartment = async (name, code, region_code) => {
  try {
  await Department.create({
    department_name: name,
    code,
    region_code,
  });
} catch(error) {
  console.trace(error);
}
};
const optionsDepartments = {
  method: 'GET',
  url: 'https://geo.api.gouv.fr/departements',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
};
const createCity = async (name, code, department) => {
  try {
  await City.create({
    city_name: name,
    code: code,
    department_code: department,
  })
} catch(error) {
  console.trace(error);
}
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
      const filteredCities = cities.data.filter((c) => c.population > 4000);
      console.log(filteredCities.length);
      filteredCities.map(async(city) => createCity(city.nom.toUpperCase(), city.code, city.codeDepartement))
    }).catch(function (error) {
      console.error(error);
    }).then(console.log('Installation complete'));
  });
});



