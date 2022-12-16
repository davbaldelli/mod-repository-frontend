export const tracksFilters = {
  filterByTag,
  filterByLayoutCategory,
  filterByNation,
  filterByName,
  filterByAuthor,
  filterByOfficial
}

function filterByNation (nation) {
  return tracks => tracks.filter(track => track.nation.name.toLowerCase() === nation.toLowerCase())
}

function filterByLayoutCategory (category) {
  return tracks => tracks.filter(track => track.layouts.some(e => e.category === category))
}

function filterByTag (tag) {
  return tracks => tracks.filter(track => track.tags && track.tags.some(e => e === tag))
}

function filterByName (name) {
  return tracks => tracks.filter(track => track.name.toLowerCase().includes(name.toLowerCase()))
}

function filterByAuthor (name) {
  return tracks => tracks.filter(track => track.author.name === name)
}

function filterByOfficial(official, admin){
  return tracks => tracks.filter(t => t.official === official || admin)
}
