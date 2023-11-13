import React from "react";
import Link from "next/link";
import {
  Paper,
  TableContainer,
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableHead,
  styled,
  Typography,
} from "@mui/material";

//fetch data from API and store in Json format
async function getMarketData() {
  const res = await fetch("http://localhost:8080/data", {
    next: { revalidate: 3600 },
  });
  return res.json();
}

//format bigDecimal to 2 decimal number
function formatNumber(num) {
  if (num) {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(num);
  } else {
    return "N/A";
  }
}

async function CryptoMarketDataTable() {
  const headerStyle = {
    fontWeight: "bold",
    padding: "12px 5px",
  };

  const tableCellStyle = {
    padding: "10px 1px",
  };

  const res = await getMarketData();
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ maxWidth: 800, margin: "auto" }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <TableCell style={{ padding: "12px 5px" }}>#</TableCell>
            <TableCell style={headerStyle} align="left">
              Coin
            </TableCell>
            <TableCell style={headerStyle} align="right">
              price
            </TableCell>
            <TableCell style={headerStyle} align="right">
              24h
            </TableCell>
            <TableCell style={headerStyle} align="right">
              7d
            </TableCell>
            <TableCell style={headerStyle} align="right">
              30d
            </TableCell>
            <TableCell style={headerStyle} align="right">
              volume
            </TableCell>
            <TableCell style={headerStyle} align="right">
              marketCap
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {res.map((row, index) => (
            <TableRow key={row.name}>
              <TableCell style={tableCellStyle}>
                <Typography variant="Button" display="block">
                  {index + 1}
                </Typography>
              </TableCell>

              <TableCell
                component="th"
                scope="row"
                style={{ ...tableCellStyle, cursor: "pointer" }}
              >
                <Typography
                  variant="Button"
                  display="span"
                  style={{ fontWeight: "bolder" }}
                >
                  {row.name}
                </Typography>
                <Typography variant="caption" display="span" sx={{ ml: 1 }}>
                  {row.symbol}
                </Typography>
              </TableCell>

              <TableCell align="right" style={tableCellStyle}>
                ${formatNumber(row.price)}
              </TableCell>
              <TableCell align="right" style={tableCellStyle}>
                {formatNumber(row.priceDifferenceInTwentyFourHours)}
              </TableCell>
              <TableCell align="right">
                {formatNumber(row.priceDifferenceInSevenDays)}
              </TableCell>
              <TableCell align="right" style={tableCellStyle}>
                {formatNumber(row.priceDifferenceInOneMonth)}
              </TableCell>
              <TableCell align="right" style={tableCellStyle}>
                ${formatNumber(row.volumeInTwentyFourHours)}
              </TableCell>
              <TableCell align="right" style={tableCellStyle}>
                ${formatNumber(row.marketCap)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CryptoMarketDataTable;
