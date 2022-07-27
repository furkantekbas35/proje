import Map from 'ol/Map';
import View from 'ol/View';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {Draw, Modify, Snap} from 'ol/interaction';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {fromLonLat, get} from 'ol/proj';
/*
const raster = new TileLayer({
  source: new OSM(),
});

const source = new VectorSource();
const vector = new VectorLayer({
  source: source,
  style: new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)',
    }),
    stroke: new Stroke({
      color: '#ffcc33',
      width: 2,
    }),
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({
        color: '#ffcc33',
      }),
    }),
  }),
});
*/
var raster = new ol.layer.Tile({ // TileLayer({
  source: new ol.source.OSM(),
});

var source = new ol.source.Vector({ // VectorSource({
  wrapX: false
});


var vector = new ol.layer.Vector({ // VectorLayer({
  source: source,
});



var map = new ol.Map({
  layers: [raster, vector],
  target: 'map',
  view: new ol.View({
    center: [-11000000, 4600000],
    zoom: 0,
  }),
});

var typeSelect = document.getElementById('type');

var draw;
function addInteraction(element) {
  var value = element.value;
  if (value !== 'None') {
    draw = new ol.interaction.Draw({
      source: source,
      type: value,
    });
    map.addInteraction(draw);
  }
}

function handleBtnClick() {
  var element = this;
  map.removeInteraction(draw);
  addInteraction(element);
 
};
document.getElementById("Point").addEventListener('click', handleBtnClick);
document.getElementById("Polygon").addEventListener('click', handleBtnClick);
document.getElementById("LineString").addEventListener('click', handleBtnClick);
document.getElementById("None").addEventListener('click', handleBtnClick);

addInteraction(document.getElementById('None'));