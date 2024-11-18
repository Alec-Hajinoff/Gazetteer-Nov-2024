let d = new Date();
document.getElementById("one").innerHTML = d;
var two = document.getElementById("CountryName");
navigator.geolocation.getCurrentPosition(success, fail);
var map;
function success(pos) {
    //Leaflet on page load start:
    map = L.map('map').setView([pos.coords.latitude, pos.coords.longitude], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 6,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    //Leaflet on page load end!
    //Call to getDataOpenCage.php to fetch Country name, and add Wiki link start:
    $.ajax({
        url: "libs/php/getDataOpenCage.php",
        type: 'GET',
        dataType: 'json',
        data: {
            'latitude': pos.coords.latitude,
            'longitude': pos.coords.longitude
        },
        success: function (result) {
            console.log(JSON.stringify(result.data[0].components.country));
            if (result.status.name == "ok") {
                $('#CountryName').html(JSON.stringify(result.data[0].components.country).slice(1, -1));
                $('#Wikipedia').html("<a href='https://en.wikipedia.org/wiki/" + result.data[0].components.country + "'>Wikipedia</a>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("This enquiry did not produce results:-(");
        }
    });
    //Call to getDataOpenCage.php to fetch Country name, and add Wiki link end!
    //Call to getDataOpenCage.php to fetch Name of currency, start:
    $.ajax({
        url: "libs/php/getDataOpenCage.php",
        type: 'GET',
        dataType: 'json',
        data: {
            'latitude': pos.coords.latitude,
            'longitude': pos.coords.longitude
        },
        success: function (result) {
            console.log(JSON.stringify(result.data[0].annotations.currency.iso_code));
            if (result.status.name == "ok") {
                $('#NameOfCurrency').html(JSON.stringify(result.data[0].annotations.currency.iso_code).slice(1, -1));
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("This enquiry did not produce results:-(");
        }
    });
    //Call to getDataOpenCage.php to fetch Name of currency, end!
    //Call to getDataOpenCage.php to fetch country_code, and to getDataGeonames.php to fetch capital & population start:
    var countryCode;
    $.ajax({
        url: "libs/php/getDataOpenCage.php",
        type: 'GET',
        dataType: 'json',
        data: {
            'latitude': pos.coords.latitude,
            'longitude': pos.coords.longitude
        },
        success: function (result) {
            countryCode = result.data[0].components.country_code;
            $.ajax({
                url: "libs/php/getDataGeonames.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    'country': countryCode
                },
                success: function (result) {
                    if (result.status.name == "ok") {
                        $('#CapitalCity').html(JSON.stringify(result.data[0].capital).slice(1, -1));
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("This enquiry did not produce results:-(");
                }
            });
            $.ajax({
                url: "libs/php/getDataGeonames.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    'country': countryCode
                },
                success: function (result) {
                    if (result.status.name == "ok") {
                        $('#Population').html(JSON.stringify(result.data[0].population).slice(1, -1));
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("This enquiry did not produce results:-(");
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("This enquiry did not produce results:-(");
        }
    });
    //Call to getDataOpenCage.php to fetch country_code, and to getDataGeonames.php to fetch capital & population end!
    //Call to getDataOpenCage.php to fetch name of currency, and to OpenExchangeRates to get exchange rates start:
    var currencyCode;
    $.ajax({
        url: "libs/php/getDataOpenCage.php",
        type: 'GET',
        dataType: 'json',
        data: {
            'latitude': pos.coords.latitude,
            'longitude': pos.coords.longitude
        },
        success: function (result) {
            currencyCode = result.data[0].annotations.currency.iso_code;
            $.ajax({
                url: "libs/php/getDataOpenExchangeRates.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    'app_id': '35f03936ea364ffda3993a17310787cb'
                },
                success: function (result) {
                    if (result.status.name == "ok") {
                        $('#CurrencyExchangeRate').html(JSON.stringify(result.data[currencyCode]));
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("This enquiry did not produce results:-(");
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("This enquiry did not produce results:-(");
        }
    });
    //Call to getDataOpenCage.php to fetch name of currency, and to OpenExchangeRates to get exchange rates end!
    //Call to getDataOpenWeather.php to fetch current weather start:
    $.ajax({
        url: "libs/php/getDataOpenWeather.php",
        type: 'GET',
        dataType: 'json',
        data: {
            'latitude': pos.coords.latitude,
            'longitude': pos.coords.longitude
        },
        success: function (result) {
            console.log(JSON.stringify(result.data[0].description));
            if (result.status.name == "ok") {
                $('#CurrentWeather').html(JSON.stringify(result.data[0].description).charAt(1).toUpperCase() + JSON.stringify(result.data[0].description).slice(2, -1));
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("This enquiry did not produce results:-(");
        }
    });
    //Call to getDataOpenWeather.php to fetch current weather end!
    //Call to getDataOpenWeatherForecast.php to fetch weather forecast start:
    $.ajax({
        url: "libs/php/getDataOpenWeatherForecast.php",
        type: 'GET',
        dataType: 'json',
        data: {
            'latitude': pos.coords.latitude,
            'longitude': pos.coords.longitude
        },
        success: function (result) {
            console.log(JSON.stringify(result.data[8].weather[0].description));
            if (result.status.name == "ok") {
                $('#WeatherForecast').html(JSON.stringify(result.data[8].weather[0].description).charAt(1).toUpperCase() + JSON.stringify(result.data[8].weather[0].description).slice(2, -1));
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("This enquiry did not produce results:-(");
        }
    });
    //Call to getDataOpenWeatherForecast.php to fetch weather forecast end!
    //Call to getDataRestCountries.php to fetch country names for the dropdown, start:
    $.ajax({
        url: "libs/php/getDataRestCountries.php",
        type: 'GET',
        dataType: 'json',
        data: {
        },
        success: function (result) {
            if (result.status.name == "ok") {
                result.data.forEach(function (country) {
                    console.log(country);
                    const option = document.createElement("option");
                    option.value = country;
                    option.textContent = country;
                    document.getElementById("countrySelect").appendChild(option);
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("This enquiry did not produce results:-(");
        }
    });
    //Call to getDataRestCountries.php to fetch country names for the dropdown, end.
};
function fail() {
    var msg = "Sorry, we couldn't get your location!";
    two.innerHTML = msg;
};
//Listening for a user to select a country from the dropdown, start:
document.getElementById("countrySelect").addEventListener('change', function dropdownListener() {
    $.ajax({
        url: "libs/php/getDataRestCountriesLatLng.php",
        type: 'GET',
        dataType: 'json',
        data: {
        },
        success: function (result) {
            const countryValue = document.getElementById("countrySelect").value;
            var returningData = JSON.parse(result.data);
            for (let i = 0; i < returningData.length; i++) {
                if (returningData[i].name.common === countryValue) {
                    console.log("Latitude= " + returningData[i].latlng[0]);
                    console.log("Longitude= " + returningData[i].latlng[1]);
                    //Leaflet on dropdown select start:
                    map.eachLayer(function (layer) {
                        map.removeLayer(layer);
                        map.setView([returningData[i].latlng[0], returningData[i].latlng[1]], 13);;
                        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            maxZoom: 6,
                            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        }).addTo(map);
                    });
                    //Leaflet on dropdown select end!
                    //Call to getDataOpenCage.php to fetch Country name, and add Wiki link start:
                    $.ajax({
                        url: "libs/php/getDataOpenCage.php",
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            'latitude': returningData[i].latlng[0],
                            'longitude': returningData[i].latlng[1]
                        },
                        success: function (result) {
                            console.log(JSON.stringify(result.data[0].components.country));
                            if (result.status.name == "ok") {
                                $('#CountryName').html(JSON.stringify(result.data[0].components.country).slice(1, -1));
                                $('#Wikipedia').html("<a href='https://en.wikipedia.org/wiki/" + result.data[0].components.country + "'>Wikipedia</a>");
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log("This enquiry did not produce results:-(");
                        }
                    });
                    //Call to getDataOpenCage.php to fetch Country name, and add Wiki link end!
                    //Call to getDataOpenCage.php to fetch Name of currency, start:
                    $.ajax({
                        url: "libs/php/getDataOpenCage.php",
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            'latitude': returningData[i].latlng[0],
                            'longitude': returningData[i].latlng[1]
                        },
                        success: function (result) {
                            console.log(JSON.stringify(result.data[0].annotations.currency.iso_code));
                            if (result.status.name == "ok") {
                                $('#NameOfCurrency').html(JSON.stringify(result.data[0].annotations.currency.iso_code).slice(1, -1));
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log("This enquiry did not produce results:-(");
                        }
                    });
                    //Call to getDataOpenCage.php to fetch Name of currency, end!
                    //Call to getDataOpenCage.php to fetch country_code, and to getDataGeonames.php to fetch capital & population start:
                    $.ajax({
                        url: "libs/php/getDataOpenCage.php",
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            'latitude': returningData[i].latlng[0],
                            'longitude': returningData[i].latlng[1]
                        },
                        success: function (result) {
                            countryCode = result.data[0].components.country_code;
                            $.ajax({
                                url: "libs/php/getDataGeonames.php",
                                type: 'POST',
                                dataType: 'json',
                                data: {
                                    'country': countryCode
                                },
                                success: function (result) {
                                    if (result.status.name == "ok") {
                                        $('#CapitalCity').html(JSON.stringify(result.data[0].capital).slice(1, -1));
                                    }
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    console.log("This enquiry did not produce results:-(");
                                }
                            });
                            $.ajax({
                                url: "libs/php/getDataGeonames.php",
                                type: 'POST',
                                dataType: 'json',
                                data: {
                                    'country': countryCode
                                },
                                success: function (result) {
                                    if (result.status.name == "ok") {
                                        $('#Population').html(JSON.stringify(result.data[0].population).slice(1, -1));
                                    }
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    console.log("This enquiry did not produce results:-(");
                                }
                            });
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log("This enquiry did not produce results:-(");
                        }
                    });
                    //Call to getDataOpenCage.php to fetch country_code, and to getDataGeonames.php to fetch capital & population end!
                    //Call to getDataOpenCage.php to fetch name of currency, and to OpenExchangeRates to get exchange rates start:
                    $.ajax({
                        url: "libs/php/getDataOpenCage.php",
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            'latitude': returningData[i].latlng[0],
                            'longitude': returningData[i].latlng[1]
                        },
                        success: function (result) {
                            currencyCode = result.data[0].annotations.currency.iso_code;
                            $.ajax({
                                url: "libs/php/getDataOpenExchangeRates.php",
                                type: 'POST',
                                dataType: 'json',
                                data: {
                                    'app_id': '35f03936ea364ffda3993a17310787cb'
                                },
                                success: function (result) {
                                    if (result.status.name == "ok") {
                                        $('#CurrencyExchangeRate').html(JSON.stringify(result.data[currencyCode]));
                                    }
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    console.log("This enquiry did not produce results:-(");
                                }
                            });
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log("This enquiry did not produce results:-(");
                        }
                    });
                    //Call to getDataOpenCage.php to fetch name of currency, and to OpenExchangeRates to get exchange rates end!
                    //Call to getDataOpenWeather.php to fetch current weather start:
                    $.ajax({
                        url: "libs/php/getDataOpenWeather.php",
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            'latitude': returningData[i].latlng[0],
                            'longitude': returningData[i].latlng[1]
                        },
                        success: function (result) {
                            console.log(JSON.stringify(result.data[0].description));
                            if (result.status.name == "ok") {
                                $('#CurrentWeather').html(JSON.stringify(result.data[0].description).charAt(1).toUpperCase() + JSON.stringify(result.data[0].description).slice(2, -1));
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log("This enquiry did not produce results:-(");
                        }
                    });
                    //Call to getDataOpenWeather.php to fetch current weather end!
                    //Call to getDataOpenWeatherForecast.php to fetch weather forecast start:
                    $.ajax({
                        url: "libs/php/getDataOpenWeatherForecast.php",
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            'latitude': returningData[i].latlng[0],
                            'longitude': returningData[i].latlng[1]
                        },
                        success: function (result) {
                            console.log(JSON.stringify(result.data[8].weather[0].description));
                            if (result.status.name == "ok") {
                                $('#WeatherForecast').html(JSON.stringify(result.data[8].weather[0].description).charAt(1).toUpperCase() + JSON.stringify(result.data[8].weather[0].description).slice(2, -1));
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log("This enquiry did not produce results:-(");
                        }
                    });
                    //Call to getDataOpenWeatherForecast.php to fetch weather forecast end!
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("This enquiry did not produce results:-(");
        }
    });
});
//Listening for a user to select a country from the dropdown, end.