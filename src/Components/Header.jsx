import React, { useEffect, useState } from "react";
import "../Style/Header.css";
import StockTicker from "./StockTicker";
import { webSocket, data$ } from "../Functions/HeaderWebSockets";

export default function Header() {

    const [stockTickers, setStockTickers] = useState([])

    useEffect(() => {
        webSocket()
        data$.subscribe(value => {
            setStockTickers(value)
        })
    }, [])


    return <div className="Header">
        {
            stockTickers.map((values, index) => {
                return <StockTicker stockTicker={values} key={index} index={index}/>
            })
        }
    </div>

}

