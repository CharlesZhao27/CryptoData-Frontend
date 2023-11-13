import React from "react";
import {
  Paper,
  TableContainer,
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableHead,
} from "@mui/material";

//fetch data from API and store in Json format
async function getMarketData() {
  const res = await fetch("http://localhost:8080/data");
  return res.json();
}

function formatNumber(num) {
    return num ? parseFloat(num).toFixed(2) : 'N/A';
  }


async function CryptoMarketDataTable() {
  const res = await getMarketData();
  console.log(res)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow >
            <TableCell>Coin</TableCell>
            <TableCell align="right">price</TableCell>
            <TableCell align="right">24hrs</TableCell>
            <TableCell align="right">7days</TableCell>
            <TableCell align="right">30days</TableCell>
            <TableCell align="right">volume</TableCell>
            <TableCell align="right">marketCap</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {res.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell align="right">{formatNumber(row.price)}</TableCell>
              <TableCell align="right">{formatNumber(row.priceDifferenceInTwentyFourHours)}</TableCell>
              <TableCell align="right">{formatNumber(row.priceDifferenceInSevenDays)}</TableCell>
              <TableCell align="right">{formatNumber(row.priceDifferenceInOneMonth)}</TableCell>
              <TableCell align="right">{formatNumber(row.volumeInTwentyFourHours)}</TableCell>
              <TableCell align="right">{formatNumber(row.marketCap)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CryptoMarketDataTable;
