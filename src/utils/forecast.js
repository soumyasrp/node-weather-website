const request=require("request")

const forecast=(lat,long,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=6bdc8835fa847bc6021526822bad5527&query=" + lat + "," + long +"&units=m"
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect weather service!",undefined)

        }
        else if(body.error){
            callback("Unable TO Find Location..",undefined)

        }
        else{
          
            callback(undefined,body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" degrees out."+" It feels like "+body.current.feelslike+" degrees out. Its Humidity is about "+body.current.humidity+"% .");


        }

    })

}

module.exports=forecast