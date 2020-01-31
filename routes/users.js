const express = require("express");
const zomato = require("zomato");
const ejs = require("ejs");
const bodyParser = require("body-parser");
var path = require('path');
const app = express();
var router = express.Router();
require('dotenv').config()


const client = zomato.createClient({userKey:process.env.Zomato_userKey})


/*Get Locations page.*/

router.post("/locations",(req, res)=>{
    let city_name = req.body.search;
    client.getLocations({query:city_name},(err, data)=>{
        if (!err){
            data=JSON.parse(data).location_suggestions
            var lati = JSON.stringify(data[0].latitude)
            var long = JSON.stringify(data[0].longitude)
            client.getGeocode({lat:lati,lon:long},(err, result)=>{
                if(!err){
                    let city_data = JSON.parse(result).nearby_restaurants
                    let Data_list = []
                    for(var information of city_data){
                        var Dict={
                            name: information.restaurant.name,
                            url: information.restaurant.url,
                            address: information.restaurant.location.address,
                            average_cost_for_two: information.restaurant.average_cost_for_two,
                            price_range: information.restaurant.price_range,
                            has_online_delivery: information.restaurant.has_online_delivery,
                            cuisines: information.restaurant.cuisines,
                            featured_image: information.restaurant.featured_image
                        }
                        Data_list.push(Dict)
                    }
                    res.render('zomato.ejs', {data: Data_list})
                }else{
                    console.log(err)
                }
            })
        }else{
            console.log({'Error':err})
        }
    })
})
module.exports = router;