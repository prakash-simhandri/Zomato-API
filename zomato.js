const express = require("express");
const zomato = require("zomato");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + "/views"));

const client = zomato.createClient({userKey:'86b8fbef1c254b252fb1745046396303'}) //as obtained from [Zomato API](https://developers.zomato.com/apis)
app.set('views engine', 'ejs')

app.get("/search_data", (req, res)=>{
    res.sendFile(__dirname + '/views/search.html')
})

//  GetLocations

app.post("/locations",(req, res)=>{
    let city_name = req.body.search;
    client.getLocations({query:city_name},(err, data)=>{
        if (!err){
            // console.log(data);
            data=JSON.parse(data).location_suggestions
            // return res.send(data)
            var lati = JSON.stringify(data[0].latitude)
            var long = JSON.stringify(data[0].longitude)
            client.getGeocode({lat:lati,lon:long},(err, result)=>{
                if(!err){
                    let city_data = JSON.parse(result).nearby_restaurants
                    // return res.send(city_data)
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
                        // console.log(Dict);
                    }
                    // res.send(Data_list)
                    res.render('zomato.ejs', {data: Data_list})
                }else{
                    console.log(err)
                    // return res.send(err)
                }
            })
            // return res.send([lati,long])
        }else{
            console.log('err')
        }
    })
})

console.log("app listening..... :)")

let servar = app.listen(8000,()=>{
})
