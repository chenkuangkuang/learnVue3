<template>
  <div id="map" ref="map"></div>
  <SearchCom :focusMapCountry="focusMapCountry" ref="searchRef" />
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./leaflet.ChineseTmsProviders"; //引入中国地图，高德等
import SearchCom from "./SearchCom.vue";
import allCountriesGeojson from "./allCountriesGeojson.json";

export default {
  name: "LeafletCom",
  components: {
    SearchCom,
  },
  data() {
    return {};
  },
  methods: {
    initMap() {
      let normalm = L.tileLayer.chinaProvider("GaoDe.Normal.Map", {
          maxZoom: 11,
          minZoom: 3,
          // noWrap: true // 限制左右平移不重复填充瓦片
        }),
        normala = L.tileLayer.chinaProvider("GaoDe.Satellite.Annotion", {
          maxZoom: 11,
          minZoom: 3,
          // noWrap: true
        });

      let normal = L.layerGroup([normalm, normala]);

      this.countriesGroups = L.layerGroup();
      console.log("=this.countriesGroups=", this.countriesGroups);
      this.countryGroups = L.layerGroup();

      var corner1 = L.latLng(-47.694974341862824, 178.59375); //设置左上角经纬度
      var corner2 = L.latLng(83.32895075967836, -179.64843750000003); //设置右下点经纬度
      var bounds = L.latLngBounds(corner1, corner2); //构建视图限制范围
      this.leafletInstanceRef = L.map(this.$refs.map, {
        // center:[lat(上下移动), lng（左右移动）]
        center: [26.9354, 106.79722], //重庆
        // center: [36.77586041118197, -97.03336740654208], //美国
        zoom: 3,
        maxZoom: 11,
        minZoom: 3,
        noWrap: true,
        fullscreenControl: false,
        layers: [normal],
        maxBounds: bounds, // 限制无限左右拖拽
        zoomControl: false,
        drawControl: false,
        doubleClickZoom: false,
        editable: true, //是否可编辑
        attributionControl: false,
        // renderer: L.canvas()
      });
      //   newsMarkerGroups = L.layerGroup();
      //   heatLayerGroups = L.layerGroup();

      L.control.scale().addTo(this.leafletInstanceRef); //比例尺
      L.control
        .zoom({ position: "bottomright" })
        .addTo(this.leafletInstanceRef);
      // L.control.fullscreen({ position: 'bottomright' }).addTo(map);
      // leafletInstanceRef.current.on('contextmenu', function () {
      //   // self.close();
      // });
      // leafletInstanceRef.current.on('click', function (e) {
      //   // console.log('=e.latlng=', e.latlng);
      //   // lineGroups.clearLayers();
      // });

      // leafletInstanceRef.current.on('zoomend', debounce((e) => {
      //   // console.log('=e=zoom', leafletInstanceRef.current.getZoom());
      // }, 500));

      // // leafletInstanceRef.current.on('zoomend', (e) => {
      // //   console.log('11=e=zoom', leafletInstanceRef.current.getZoom());
      // // });

      // leafletInstanceRef.current.on('moveend', debounce(async (e) => {
      //   // console.log('=e=', e);
      // }, 500));

      //   renderCountries(allCountriesGeojson);
      this.renderCountries(allCountriesGeojson);
    },
    renderCountries(areaRanges) {
      var that = this;
      L.geoJson(areaRanges, {
        style: function (feature) {
          return {
            color: "transparent",
            opacity: 1,
            _id: feature.properties.id,
            weight: 1,
            // className: 'lineAnimating'
          };
        },
        pointToLayer: function (feature, yx) {},
        onEachFeature: function (feature, featureLayer) {
          const uniqueId = feature.properties.id;
          featureLayer.on("mouseover", function () {
            // console.log('=name=', name);
            // if (name == '中国' || name.toLowerCase() == 'china') {
            //   return;
            // }
            featureLayer.setStyle({
              fillColor: "red",
              color: "red",
              strokeColor: "red",
              weight: 2,
            });
            featureLayer
              .bindTooltip(
                `<div class="region-tooltip">${feature.properties.cname}</div>`,
                {
                  // permanent: true, //自动全部打开
                  direction: "bottom",
                }
              )
              .openTooltip();
          });
          featureLayer.on("mouseout", function () {
            featureLayer.setStyle({
              fillColor: "transparent",
              color: "transparent",
              weight: 1,
            });
            featureLayer.closeTooltip();
          });
          featureLayer.on("click", function (e) {
            // 点击地图上的国家，选中select中的对应国家
            // if (name == '中国' || name.toLowerCase() == 'china') {
            //   return;
            // }

            // 延迟执行，以便判断是否点击了点位，如果点击了点位，不执行聚焦国家
            setTimeout(() => {
              console.log("=e=Countries=mouseup", e.target.feature);
              //   if (!isClickPointRef.current) {
              const targetCountry = e.target.feature;
              that.countryGroups.clearLayers();
              that.focusMapCountry(targetCountry);
              that.$refs.searchRef.focusSelectCountry(targetCountry);
              //   }
            }, 0);
          });
          //   console.log(
          //     "=this.countriesGroups && =",
          //     that.countriesGroups,
          //     that.leafletInstanceRef
          //   );
          that.countriesGroups && that.countriesGroups.addLayer(featureLayer);
          //   countriesShownIds.push(uniqueId);
        },
      });
      that.countriesGroups &&
        that.countriesGroups.addTo(that.leafletInstanceRef);
    },
    focusMapCountry(matchCountry) {
      console.log("=focusMapCountry=", matchCountry);
      this.countryGroups.clearLayers();
      var that = this;
      L.geoJson(matchCountry, {
        style: function (feature) {
          return {
            fillColor: "red",
            color: "red",
            strokeColor: "red",
            weight: 2,
          };
        },
        pointToLayer: function (feature, yx) {
          const polygon = L.polygon(yx, {
            fillColor: "red",
            color: "red",
            strokeColor: "red",
            weight: 5,
          });
          return polygon;
        },
        onEachFeature: function (feature, featureLayer) {
          featureLayer
            .bindTooltip(
              `<div class="region-tooltip">${
                feature.properties.cname || name
              }</div>`,
              {
                permanent: true, //自动全部打开
                direction: "bottom",
                // offset: [5, -3],
              }
            )
            .openTooltip();
          that.countryGroups && that.countryGroups.addLayer(featureLayer);
        },
      });
      that.countryGroups && that.countryGroups.addTo(that.leafletInstanceRef);
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 100vh;
}
</style>