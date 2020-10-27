require("dotenv").config({path: "../../.env"});
const {roadBaseMap, roadVectorFeatures}  = require("./sql");
const DB = require("../../DB/db");

/**
 * loadBaseMap: DB 로부터 베이스맵의 정보가 담긴 정보를 가져와 내보내는 함수
 */
const loadBaseMap = async () => {
    const statement = {
        text: roadBaseMap,
        values: []
    }
    const data = await DB.query(statement);
    const map = {layers: [], view: null};

    data.forEach((item, index) => {
        // view 작업
        const projection = {
            code: item.projection,
            extent: [-200000.0,-28024123.6,31824123.6,4000000.0]
        }
        const view = {
            projection,
            extent: [item.boundaryMinX, item.boundaryMinY, item.boundaryMaxX, item.boundaryMaxY],
        }

        map.view === null ? map.view = view : null;
        
        // layers 작업
        if (item.mapType === 'wmts') {
            const WMTSTileGrid = {
                extent: [-200000.0,-28024123.6,31824123.6,4000000.0],
            }

            const WMTS = {
                __typename: 'WMTS',
                url: { 
                    address: item.address,
                    port: item.port,
                    storage: item.storage,
                    mapType: item.mapType,
                    layer: item.layer
                },
                layer: item.layer,
                matrixSet: item.projection,
                tileGrid: WMTSTileGrid,
                projection: projection
            }
    
            const TileLayer = {
                extent: [item.boundaryMinX, item.boundaryMinY, item.boundaryMaxX, item.boundaryMaxY],
                source: WMTS
            }
            map.layers.push(TileLayer);
        } else if (item.mapType === 'wms') {
            const TileWMS = {
                __typename: 'TileWMS',
                url: {
                    address: item.address,
                    port: item.port,
                    storage: item.storage,
                    mapType: item.mapType,
                    layer: item.layer
                }, 
                params: {
                    LAYERS: `${item.storage}:${item.layer}`,
                    TILED: true
                }
            }

            const TileLayer = {
                extent: [item.boundaryMinX, item.boundaryMinY, item.boundaryMinX, item.boundaryMaxY],
                source: TileWMS
            }
            map.layers.push(TileLayer);
        }
        
    })
    return map;
};

/**
 * loadVectorLayer: DB 로부터 벡터 레이어의 정보가 담긴 정보를 가져와 내보내는 함수
 */
const loadVectorLayer = async (_, {}) => {

    const statement = {
        text: roadVectorFeatures,
        values: []
    }
    const data = await DB.query(statement);

    const result = [];

    data.forEach((item, index) => {
        const vectorLayer = {
            source: {
                url: {
                        address: item.address,
                        port: item.port,
                        storage: item.storage,
                        mapType: item.mapType,
                        layer: item.layer,
                        projection: {
                            code: item.projection,
                            extent: []
                        }
                    }
                }, 
            minZoom: 8
        };
        result.push(vectorLayer);
    })
    return result;
};

module.exports.loadBaseMap = loadBaseMap;
module.exports.loadVectorLayer = loadVectorLayer;