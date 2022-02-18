import React, { useEffect, useState } from "react";
import "../Style/Dashboard.css";
import { Observable } from 'rxjs';
import StockTable from "./StockTable";

export default function Dashboard() {

    const [stockTickers, setStockTickers] = useState(new Map())

    useEffect(() => {
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
            const observable = new Observable(subscriber => {
                subscriber.next(JSON.parse(event.data));
            });
            observable.subscribe({
                next(json) {
                    try {
                        let tempArray = stockTickers
                        if(json.data){
                            json.data.forEach((data) => {
                                let temp = { ticker: data.s, volume: data.v, price: data.p, time: data.t }
                                if (tempArray.has(data.s)) {
                                    let dataObj = tempArray.get(data.s)
                                    dataObj.unshift(temp)
                                } else {
                                    tempArray.set(data.s, [temp])
                                }
                            })
                            setStockTickers([...tempArray])
                        } 
                    } catch (err) {
                        console.log(err);
                    }
                },
                error(err) { console.error('something wrong occurred: ' + err); },
                complete() { console.log('done'); }
            });

        };
    }, [])

    return <div className="Dashboard">
        {
            Object.values(stockTickers).map((stockTicker, ticker) => {
                return <StockTable stockTicker={stockTicker} key={ticker} ticker={ticker} />
            })
        }
    </div>


}