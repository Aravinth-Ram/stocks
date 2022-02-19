import { BehaviorSubject } from 'rxjs';


let stockTickers = []
export let data$ = new BehaviorSubject([]);

export const webSocket = () => {
    const ws = new WebSocket("wss://finnhub.io/ws");

    const apiCall = [
        { type: 50, ticker: "BINANCE:BTCUSDT" },
        { type: 50, ticker: "BINANCE:ETHUSDT" },
        { type: 50, ticker: "OANDA:EUR_USD" },
        { type: 50, ticker: "OANDA:GBP_USD" },
        { type: 50, ticker: "AAPL.US" },
        { type: 50, ticker: "MSFT.US" },
        { type: 50, ticker: "AMZN.US" }
    ]

    ws.onopen = (event) => {
        apiCall.map((message) => {
            return ws.send(JSON.stringify(message));
        })
    };

    ws.onmessage = function (event) {
        calculate(JSON.parse(event.data))
    }

}

const calculate = (json) => {

    if ((json.event = "data")) {
        let tempArray = stockTickers
        let temp = { ticker: "", prevClose: 0, price: 0, displayName: "" }
        if (tempArray.findIndex(value => value.ticker === json.content.ticker) !== -1) {
            let index = tempArray.findIndex(value => value.ticker === json.content.ticker)
            tempArray[index].price = json.content.price
        } else {
            temp.displayName = json.content.displayName
            temp.prevClose = json.content.prevClose
            temp.ticker = json.content.ticker
            tempArray.push(temp)
        }
        stockTickers = [...tempArray]
    }


    data$.next(stockTickers)
}