import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import React from "react";
import "../Style/StockTable.css";
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import moment from 'moment'

export default function StockTable(props) {

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        }
    }));

    const useStyles = makeStyles({
        root: {
            "& .MuiTableCell-head": {
                color: "white",
                backgroundColor: "grey",
                borderBottom: "2px solid #000",
            },
        }
    });

    const classes = useStyles();

    return <div className="StockNameAndTable">
        <div className="StockName">
            <div>{props.stockTicker[0]} </div>
        </div>
        <TableContainer sx={{ maxHeight: "330px" }} id="StockTable">
            <Table stickyHeader>
                <TableHead id="StockHead">
                    <TableRow className={classes.root}>
                        <TableCell align="center">
                            DateTime
                        </TableCell>
                        <TableCell align="center">
                            Price
                        </TableCell>
                        <TableCell align="center">
                            Volume
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.stockTicker[1].map((data, index) => {
                            return <StyledTableRow key={index}>
                                <TableCell align="center">
                                    {moment(data.time).format('DD-MM-YYYY HH:mm:ss')} IST
                                </TableCell>
                                <TableCell align="center">
                                    {data.price}
                                </TableCell>
                                <TableCell align="center">
                                    {data.volume}
                                </TableCell>
                            </StyledTableRow>
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </div>

}