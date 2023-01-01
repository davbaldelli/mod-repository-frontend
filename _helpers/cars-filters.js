export const carsFilters = {
  filterByName,
  filterByCategory,
  filterByBrand,
  filterByAuthor,
  filterOfficial
}

function filterOfficial(official, admin){
  return cars => cars.filter(car => car.official === official || admin)
}

function filterByAuthor (author) {
  return cars => cars.filter(car => car.author.name === author)
}

function filterByBrand (brand) {
  return cars => cars.filter(car => car.brand.name.toLowerCase() === brand.toLowerCase())
}

function filterByCategory (category) {
  return cars => cars.filter(car => car.categories && car.categories.some(e => e.name === category))
}

function filterByName (name) {
  return cars => cars.filter(car => `${car.brand.name} ${car.modelName}`.toLowerCase().includes(name.toLowerCase()))
}




