class Controller{
    constructor(){
        this.weatherRender = new WeatherDisplay()
        this.cityData = new City()
    }
    async loadPage(){
        await this.cityData.getDataFromDB()
        this.weatherRender.renderData(this.cityData.citiesData)
    }
    async handleSearch(cityName){
        await this.cityData.getCityData(cityName)
        this.weatherRender.renderData(this.cityData.citiesData)
    }
    initialaizeButtons(controller){
        $("body").onload = this.loadPage()

        $(".search").on("click",()=>{
            $(".city").remove()
            let cityName = $("#chooseCity").val()
            this.handleSearch(cityName)
        })

        $(".container").on("click",".addCity", async function() {
            let cityName = $(this).closest(".city").find(".name").html()
            await controller.cityData.saveCity(cityName)
            $(".city").remove()
            controller.loadPage()
            alert("data Saved!")
        })
        $(".container").on("click",".removeCity", async function() {
            let cityName = $(this).closest("div").find(".name").html()
            await controller.cityData.removeCity(cityName)
            $(".city").remove()
            controller.loadPage()
            alert("data removed!")
        })

    }

}

const controller = new Controller()
controller.initialaizeButtons(controller)
