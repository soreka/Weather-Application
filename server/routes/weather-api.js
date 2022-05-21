const express = require('express')
const router = express.Router()
const urllib = require('urllib')
const bodyParser = require('body-parser')
const City = require(`../models/City`)

const ICONURL = "http://openweathermap.org/img/wn/"

// async function loadFromAPI(apiURL) {

//     urllib.request(apiURL, function(error, response, body) {
  
//     let result = JSON.parse(body)
  
//     if ( result.data &&!error && response.statusCode == 200) {
//         let resCity = JSON.parse(body)
  
//         let city = new City({
//             name:resCity.name,
//             temperature:resCity.main.temp,
//             condition:resCity.weather.main,
//             conditionPic:resCity.weather.description
//         })
  
//         //Only save if the city doesn't exist yet
//         City.findOne({ name: city.name }, function(err, foundCity) {
//           if (!foundCity) {
//             city.save()
//           }
//         })
//       }
//     })
//   }

const loadFromAPI =  function (apiURL) {// should use it later!!!
    urllib.request(apiURL,function (err,response) {
        let result = JSON.parse(response.body)
        if ( result.data &&!error && response.statusCode == 200) {
            let resCity = JSON.parse(body)
            return resCity
        }
    })
  }
  
router.post('/city',async function (req,res) {
    let resCity = req.body
    let checkIfExist = await City.findOne({ name: resCity.name })
    if (checkIfExist) {
        res.status(403).send("city already exists")
        res.end()
    }else{
        let city = new City({
            name: resCity.name,
            temperature: resCity.temperature,
            condition: resCity.condition,
            conditionPic:resCity.conditionPic
        })
        let savedCity = await city.save()
        res.end()
    }
})

router.get('/cities', async function (req,res) {
    
    let Allcities = await City.find({})
    
    if(Allcities){
        res.status(201).send(Allcities)
        res.end()
    }else{
        res.status(401).send("could not find the element in Db")
        res.end()
    }

})

router.get('/city/:cityName', async function (req,response) {
    let cityName = req.params.cityName
    
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=bc1bc4db2a588a2748d284c2774b5278`
    
    urllib.request(url,function (err,res) {
        if (!err) {
            let resCity = JSON.parse(res.toString())
            
            let resobject= {
                name:resCity.name,
                temperature:resCity.main.temp,
                condition:resCity.weather[0].description,
                conditionPic: ICONURL + `${resCity.weather[0].icon}.png`
             }
            response.status(200).send(resobject)
            response.end()
        }else{
            response.status(400).send("something wrong went with the request to the api")
            response.end()
        }

    
    })
    
})

router.delete('/city/:cityName',async function (req,res) {
    let cityName = req.params.cityName
    let deletedCity = await City.findOneAndRemove({name:cityName})
    if(deletedCity){
        res.status(204).send(deletedCity)
        res.end()
    }else{
        res.status(404).send("couldn't find the city needed")
        res.end()
    }
})

module.exports = router







// questions:-
//     does the get for the api need to save the object to the database as well? 
// does post data need to make a request to the api ?
// 
