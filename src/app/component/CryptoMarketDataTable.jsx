import React from "react";
import Link from "next/link";
import {
  formatBigDecimalAsInteger,
  formatNumber,
  formatNumberWithUnits,
  formatNumberToTwoDecimalPlace,
} from "../utils/formatUtil";
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
    next: { revalidate: 60 },
  });
  return res.json();
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
  const marketCapSum = res.reduce((total, row) => total + row.marketCap, 0);

  return (
    <main>
      <div className="data-table">
        <Typography variant="h3" style={{ fontWeight: "bold" }}>
          Cryptocurrency Prices by Market Cap{" "}
        </Typography>
        <Typography variant="caption">
          The global cryptocurrency market cap today is $
          {formatNumberWithUnits(marketCapSum)}
        </Typography>

        <TableContainer>
          <Table
            sx={{ minWidth: 1000, margin: "0" }}
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
                    <Link
                      href={`/${row.name}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography
                        variant="button"
                        display="span"
                        style={{ fontWeight: "bolder" }}
                      >
                        {row.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="span"
                        sx={{ ml: 1 }}
                      >
                        {row.symbol}
                      </Typography>
                    </Link>
                  </TableCell>

                  <TableCell align="right" style={tableCellStyle}>
                    <Typography variant="body2">
                      ${formatNumber(row.price)}
                    </Typography>
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
                      )}
                      %
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
                      )}
                      %
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
                      {formatNumberToTwoDecimalPlace(
                        row.priceDifferenceInOneMonth
                      )}
                      %
                    </Typography>
                  </TableCell>
                  <TableCell align="right" style={tableCellStyle}>
                    <Typography variant="body2">
                      ${formatBigDecimalAsInteger(row.volumeInTwentyFourHours)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" style={tableCellStyle}>
                    <Typography variant="body2">
                      ${formatBigDecimalAsInteger(row.marketCap)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </main>
  );
}

export default CryptoMarketDataTable;
