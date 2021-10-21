const request=require("request")

const geocode=(address,callback) => {
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoic291bXlhc3JwIiwiYSI6ImNrdXR4bWJwcDFsa3AydXM3NDkxdWxqZ2oifQ.qi-BrmHWCspLC7_2qc_beg&limit=1"

        request({url,json:true},(error,{body})=>{
            if(error){
                callback("Unable to connect To location services!",undefined)
            }
            else if(body.features.length===0){
                callback("Unable To Find Location..Try Another search.",undefined)
            }
            else{
                
                data={
                    latitude:body.features[0].center[1],
                    longitude:body.features[0].center[0],
                    location:body.features[0].place_name
                }
              
                callback(undefined,data)
                   

            }

        })


}

module.exports=geocode