const mapQuery = require("../resolvers/map/query");

const resolvers = {
    Query: {
        loadBaseMap: mapQuery.loadBaseMap,
        loadVectorLayer: mapQuery.loadVectorLayer
    }
}

module.exports = resolvers;