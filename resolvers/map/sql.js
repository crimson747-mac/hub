const roadBaseMap = `
select feature_layers.*, map."TB_SOURCE".ds_access_addr as "address", map."TB_SOURCE".no_access_port as "port", map."TB_NAMESPACE".nm_space as "storage"
from 
    (select 
        map."TB_MAP".id_source,
        map."TB_MAP".nm_map,
        map."TB_LAYER".id_namespace,
        map."TB_LAYER".ty_division,
        map."TB_LAYER".ty_kinds as "mapType",
        map."TB_LAYER".nm_tablename as "layer",
        map."TB_LAYER".nu_bound_min_x as "boundaryMinX",
        map."TB_LAYER".nu_bound_min_y as "boundaryMinY",
        map."TB_LAYER".nu_bound_max_x as "boundaryMaxX",
        map."TB_LAYER".nu_bound_max_y as "boundaryMaxY",
        concat(map."TB_PROJECTION".nm_name, ':', map."TB_PROJECTION".cd_coordinate) as "projection"
    from map."TB_MAP_COMP"
    inner join map."TB_MAP"
        on map."TB_MAP".id = map."TB_MAP_COMP".id_map
    inner join map."TB_LAYER"
        on map."TB_LAYER".id = map."TB_MAP_COMP".id_layer_id
    inner join map."TB_PROJECTION"
        on map."TB_PROJECTION".id = map."TB_MAP_COMP".id_projection
    where map."TB_MAP_COMP".yn_base = '1')
as feature_layers
inner join map."TB_SOURCE"
    on feature_layers.id_source = map."TB_SOURCE".id
inner join map."TB_NAMESPACE"
    on feature_layers.id_namespace = map."TB_NAMESPACE".id`;

const roadVectorFeatures = `
select feature_layers.*, map."TB_SOURCE".ds_access_addr as "address", map."TB_SOURCE".no_access_port as "port", map."TB_NAMESPACE".nm_space as "storage"
from 
    (select 
        map."TB_MAP".id_source,
        map."TB_MAP".nm_map,
        map."TB_LAYER".id_namespace,
        map."TB_LAYER".ty_division,
        map."TB_LAYER".ty_kinds as "mapType",
        map."TB_LAYER".nm_tablename as "layer",
        concat(map."TB_PROJECTION".nm_name, ':', map."TB_PROJECTION".cd_coordinate) as "projection"
    from map."TB_MAP_COMP"
    inner join map."TB_MAP"
        on map."TB_MAP".id = map."TB_MAP_COMP".id_map
    inner join map."TB_LAYER"
        on map."TB_LAYER".id = map."TB_MAP_COMP".id_layer_id
    inner join map."TB_PROJECTION"
        on map."TB_PROJECTION".id = map."TB_MAP_COMP".id_projection
    where map."TB_MAP_COMP".yn_base != '1')
as feature_layers
inner join map."TB_SOURCE"
    on feature_layers.id_source = map."TB_SOURCE".id
inner join map."TB_NAMESPACE"
    on feature_layers.id_namespace = map."TB_NAMESPACE".id
`

module.exports.roadBaseMap = roadBaseMap;
module.exports.roadVectorFeatures = roadVectorFeatures;