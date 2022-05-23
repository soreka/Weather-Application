class WeatherDisplay{
    constructor(){
        let htmlSource = $("#weather-template").html()
        this.weatherTemplate = Handlebars.compile(htmlSource)
    }
    renderData(cities){
        $(".city").remove()
        for(let city of cities){
            let newCities =this.weatherTemplate(city)
            $(".cities").append(newCities) 
        }
    }

}