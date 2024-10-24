var app;
window.onload = function () {
  app = new Vue({
    el: "#weatherApp",
    data: {
      loaded: false,
      formCityName: "",
      message: "WebApp Loaded.",
      messageForm: "",
      cityList: [{ name: "Paris" }],
      cityWeather: null,
      cityWeatherLoading: false,
    },
    mounted: function () {
      this.loaded = true;
      this.readData();
    },
    methods: {
      readData: function () {
        console.log("Liste des villes: ", JSON.stringify(this.cityList));
      },
      addCity: function (event) {
        event.preventDefault();
        if (this.isCityExist(this.formCityName)) {
          this.messageForm = "existe déjà";
        } else {
          this.cityList.push({ name: this.formCityName });
          this.formCityName = "";
          this.messageForm = "";
        }
      },
      remove: function (_city) {
        this.cityList = this.cityList.filter(item => item.name !== _city.name);
      },
      meteo: function (_city) {
        this.cityWeatherLoading = true;
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${_city.name}&units=metric&lang=fr&appid=c35f20c2151a5182ce0be3f425e3607e`
        )
          .then(response => response.json())
          .then(json => {
            this.cityWeatherLoading = false;
            if (json.cod === 200) {
              this.cityWeather = json;
              this.message = null;
            } else {
              this.cityWeather = null;
              this.message = `Météo introuvable pour ${_city.name} (${json.message})`;
            }
          });
      },
      isCityExist: function (_cityName) {
        return this.cityList.filter(
          item => item.name.toUpperCase() === _cityName.toUpperCase()
        ).length > 0;
      },
    },
  });
};
