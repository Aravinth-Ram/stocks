import React, { useEffect, useState } from "react";
import "../Style/Dashboard.css";
import StockTable from "./StockTable";
import { webSocket, data$ } from "../Functions/DashboardWebSockets";

export default function Dashboard() {

    const [stockTickers, setStockTickers] = useState(new Map())

    useEffect(() => {
        webSocket()
        data$.subscribe(value => {
            setStockTickers(value)
        })
    }, [])


    return <div className="Dashboard">
        {
            Object.values(stockTickers).map((stockTicker, ticker) => {
                return <StockTable stockTicker={stockTicker} key={ticker} ticker={ticker} />
            })
        }

    </div>




}