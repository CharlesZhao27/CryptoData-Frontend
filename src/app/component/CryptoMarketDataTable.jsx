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

//format bigDecimal to 2 decimal number or 6 decimal number
function formatNumber(num) {
  if (num === null || num === undefined) {
    return "N/A";
  }
  let options;
  if (num > 0 && num < 1) {
    options = { maximumFractionDigits: 6, minimumFractionDigits: 6 };
  } else {
    options = { maximumFractionDigits: 2, minimumFractionDigits: 2 };
  }
  return new Intl.NumberFormat("en-US", options).format(num);
}

//format bigDecimal to 2 decimal number
function formatNumberToTwoDecimalPlace(num) {
  if (num) {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(num);
  } else {
    return "N/A";
  }
}

function getColorForValue(value) {
  return value > 0 ? { color: "green" } : { color: "red" };
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
              Mkt Cap
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {res.map((row, index) => (
            <TableRow key={row.name}>
              <TableCell style={tableCellStyle}>
                <Typography variant="Button" display="block" gutterBottom>
                  {index + 1}
                </Typography>
              </TableCell>
              
              {/* Link component to dynamic routed page */}
              
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
                <Typography variant="body2">${formatNumber(row.price)}</Typography>
              </TableCell>
              <TableCell
                align="right"
                style={{
                  ...tableCellStyle,
                  ...getColorForValue(row.priceDifferenceInTwentyFourHours),
                }}
              >
                <Typography variant="body2">
                  {formatNumberToTwoDecimalPlace(
                    row.priceDifferenceInTwentyFourHours
                  )}%
                </Typography>
              </TableCell>
              <TableCell
                align="right"
                style={{
                  ...tableCellStyle,
                  ...getColorForValue(row.priceDifferenceInSevenDays),
                }}
              >
                <Typography variant="body2">
                  {formatNumberToTwoDecimalPlace(
                    row.priceDifferenceInSevenDays
                  )}%
                </Typography>
              </TableCell>
              <TableCell
                align="right"
                style={{
                  ...tableCellStyle,
                  ...getColorForValue(row.priceDifferenceInOneMonth),
                }}
              >
                <Typography variant="body2">
                  {formatNumberToTwoDecimalPlace(row.priceDifferenceInOneMonth)}%
                </Typography>
              </TableCell>
              <TableCell align="right" style={tableCellStyle}>
                <Typography variant="body2">
                  ${formatNumber(row.volumeInTwentyFourHours)}
                </Typography>
              </TableCell>
              <TableCell align="right" style={tableCellStyle} >
                <Typography variant="body2">${formatNumber(row.marketCap)}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CryptoMarketDataTable;
