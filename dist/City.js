class City{
    constructor(){
        this.citiesData = []
        this.setOfCities = new Set()
        
    }
    async getDataFromDB(){
        let cities = await $.get('cities').promise()
        for(let city of cities){
            this.citiesData.push(city)
            this.setOfCities.add(city.name.toLowerCase())
        }
    }
    async getCityData(cityName){
        if(!this.setOfCities.has(cityName.toLowerCase())){           
            let recivedCityData = await $.get(`city/${cityName}`)
            this.citiesData.push(recivedCityData)
            this.setOfCities.add(recivedCityData.name.toLowerCase())
        }

    }

    saveCity(cityName){
        let city =this.citiesData.find(city =>city.name.toLowerCase() === cityName.toLowerCase())
        console.log(city);
        $.ajax({
            type: "POST",
            url: `city`,
            data: city,
          });
        this.citiesData =[]
    }
    
    removeCity(cityName){
        console.log(cityName);
        $.ajax({
            url: `city/${cityName}`,
            type: "DELETE",
            success: (result)=>{
                alert(result);
                let index = this.citiesData.findIndex(city=>city.name === cityName)
                this.citiesData.splice(index,1)
            }
        });
        this.citiesData =[]
    }

    
}