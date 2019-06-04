const http = require('http');
const port = 3000;
const axios = require('axios');
const stocks = ['AMZN', 'MSFT', 'AAPL', 'GOOGL','TSLA']
var player = require('play-sound')(opts = {})
var play = require('play')


const requestHandler  = (request, response) => {
  console.log(request.url);

}

const server = http.createServer(requestHandler);

server.listen(port,(err) => {
    console.log(`Server running on ${port}`);
    if(err) {
      console.log(`Something went wrong: ${err}`);
    }

    getCurrentPrice(stocks);
    setInterval(getCurrentPrice.bind(null,stocks),60000);

})

function getCurrentPrice(stocks) {

    timeStamp();
    play.sound('./media/notification.mp3');

    for(i = 0; i < stocks.length; i++) {
        axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stocks[i]}&apikey=`)
        .then( response => {
            if( response != null || response != undefined) {
                let globalQuote = response.data[Object.keys(response.data)[0]];
                let symbol = globalQuote[Object.keys(globalQuote)[0]];
                let currentPrice = globalQuote[Object.keys(globalQuote)[4]]
                console.log('\x1b[32m', symbol + ': ' + '\x1b[37m' + currentPrice);
            } else {
                console.log("An error occured.")
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
}

function timeStamp() {
 let time = new Date;
 let day = String(time.getDate()).padStart(2, '0');
 let month = String(time.getMonth() + 1).padStart(2, '0');
 let year = time.getFullYear();
 console.log('\n' + '\x1b[33m' + time.toLocaleTimeString() + ' - ' + day + '/' + month + '/' + year + '\n');
}

