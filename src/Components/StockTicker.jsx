import React from "react";
import "../Style/StockTicker.css";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function StockTicker(props) {

    return <div className="StockTicker" key={props.index}>
        <div className="StockTitle">
            <div>{props.stockTicker.displayName}</div>
            <div className="StockPrevClose">{props.stockTicker.prevClose}</div>
        </div>
        <div className="Stock">
            {
                (((props.stockTicker.price - props.stockTicker.prevClose) / props.stockTicker.price) * 100) > 0 ?
                    [<div className="ProfitStock">
                        <KeyboardArrowUpIcon /> <div>{(((props.stockTicker.price - props.stockTicker.prevClose) / props.stockTicker.price) * 100).toFixed(2)} % <span className="StockValue">({(props.stockTicker.price - props.stockTicker.prevClose).toFixed(2)})</span></div>
                    </div>]
                    :
                    <div className="LossStock">
                        <KeyboardArrowDownIcon /> <div>{(((props.stockTicker.price - props.stockTicker.prevClose) / props.stockTicker.price) * 100).toFixed(2)} % <span className="StockValue">({(props.stockTicker.price - props.stockTicker.prevClose).toFixed(2)})</span></div>
                    </div>
            }
        </div>
    </div>


}