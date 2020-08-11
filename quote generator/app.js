const loader=document.getElementById("loader");
const quotecontainer=document.getElementById("quote-container")


function loading(){
    loader.hidden=false;
    quotecontainer.hidden = true;

}

function complete(){
    if(!loader.hidden){
        loader.hidden=true;
        quotecontainer.hidden = false;

    }

}




async function getquote(){
    loading();
    const proxyurl='https://cors-anywhere.herokuapp.com/';
    const url="http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try{

        const response= await fetch(proxyurl+url);
        const data= await response.json();

        document.getElementById("textqoute").innerHTML = data.quoteText;
        if(data.quoteAuthor===""){
            document.getElementById("author").innerHTML ="unknown";
        }else{
            document.getElementById("author").innerHTML = data.quoteAuthor ;
        }
           
        
        console.log(data);
    }
    catch(error){
        getquote();
    
        console.log("failed ERROER",error);

    }

    complete();
}

function tweet(){
    const quote=document.getElementById("textqoute").innerHTML;
    const author=document.getElementById("author").innerHTML;
    const twitterurl='https://twitter.com/intent/tweet/?text=${quote} - ${author}';
    window.open(twitterurl,'_blank');
}

//addevent
newqoutebtn=document.getElementById("new-qoute");//get btn
tweetbtn=document.getElementById("twitter");


newqoutebtn.addEventListener('click',getquote);//add evnet
newqoutebtn.addEventListener('click',tweet);

getquote();