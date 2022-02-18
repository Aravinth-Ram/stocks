import React, { useEffect, useState } from "react";
import { Observable } from 'rxjs';
import "../Style/Header.css";
import StockTicker from "./StockTicker";

export default function Header() {

    const [stockTickers, setStockTickers] = useState([])


    useEffect(() => {
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
            const observable = new Observable(subscriber => {
                subscriber.next(JSON.parse(event.data));
            });
            observable.subscribe({
                next(json) {
                    try {
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



    return <div className="Header">
        {
            stockTickers && stockTickers.map((stockTicker) => (
                <StockTicker stockTicker={stockTicker} key={stockTicker.ticker} />
            ))
        }
    </div>

}