const weatherform=document.querySelector("form")
const search=document.querySelector("input")
const messageOne=document.querySelector("#message-1")
const messagetwo=document.querySelector("#message-2")

// messageOne.textContent="From Javascript"

messagetwo.textContent=""


weatherform.addEventListener("submit",(e)=>{
    e.preventDefault()
    const location=search.value
    
    messageOne.textContent="Loading..."
    messagetwo.textContent=""

    fetch("http://localhost:3000/weather?address="+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
        }
        else{
            messageOne.textContent=data.location;
            messagetwo.textContent=data.forecast;
        
        }
        
    })
})

})