import { BehaviorSubject } from 'rxjs';


let stockTickers = new Map();
export let data$ = new BehaviorSubject([]);

export const webSocket = () => {
    const key = "c87j002ad3i9lkntvvn0";
    const ws = new WebSocket(`wss://ws.finnhub.io?token=${key}`);

    const apiCall = [
        { type: "subscribe", symbol: "BINANCE:BTCUSDT" },
        { type: "subscribe", symbol: "BINANCE:ETHUSDT" },
        { type: "subscribe", symbol: "OANDA:EUR_USD" },
        { type: "subscribe", symbol: "OANDA:GBP_USD" },
        { type: "subscribe", symbol: "AAPL.US" },
        { type: "subscribe", symbol: "MSFT.US" },
        { type: "subscribe", symbol: "AMZN.US" }
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

    if (json.data) {
        let tempArray = new Map()
         tempArray = stockTickers
        json.data.forEach((data) => {
            let temp = { ticker: data.s, volume: data.v, price: data.p, time: data.t }
            if (tempArray && tempArray.has && tempArray.has(data.s)) {

                let dataObj = tempArray.get(data.s)
                dataObj.unshift(temp)
                tempArray.set(data.s, dataObj)
            } else {
                tempArray.set(data.s, [temp])
            }
        })
        stockTickers = tempArray
    }

    data$.next([...stockTickers])
}