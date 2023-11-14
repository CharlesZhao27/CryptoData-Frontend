import React from "react";
import {
  Breadcrumbs,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import Link from "next/link";
import {
  formatBigDecimalAsInteger,
  formatNumber,
  formatTimestamp
} from "../utils/formatUtil";

//fetch data from API and store in Json format
async function getMarketData(name) {
  const res = await fetch(`http://localhost:8080/data/${name}`, {
    next: { revalidate: 60 },
  });
  return res.json();
}

export default async function CryptoDetailsPage({ params }) {
  const name = params.name;
  try {
    const res = await getMarketData(name);
    return (
      <main>
        <Breadcrumbs separator="›" aria-label="breadcrumb" style={{padding: "20px"}}>
          <Link
            color="inherit"
            href="/"
            style={{ textDecoration: "none", color: "green" }}
          >
            Cryptocurrency
          </Link>
          <Typography>{name}</Typography>
        </Breadcrumbs>

        <TableContainer component={Paper}>
          <Table aria-label="coin-detail-table" sx={{minWidth: 1500, margin: "0"}}>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>name</TableCell>
                <TableCell>date</TableCell>
                <TableCell>high</TableCell>
                <TableCell>low</TableCell>
                <TableCell>open</TableCell>
                <TableCell>close</TableCell>
                <TableCell>volume</TableCell>
                <TableCell>marketCap</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {res.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index}</TableCell>
                  <TableCell> {row.name}</TableCell>
                  <TableCell> {formatTimestamp(row.date)}</TableCell>
                  <TableCell> ${formatNumber(row.high)}</TableCell>
                  <TableCell> ${formatNumber(row.low)}</TableCell>
                  <TableCell> ${formatNumber(row.open)}</TableCell>
                  <TableCell> ${formatNumber(row.close)}</TableCell>
                  <TableCell> ${formatBigDecimalAsInteger(row.volume)}</TableCell>
                  <TableCell> ${formatBigDecimalAsInteger(row.market_cap)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data</div>;
  }
}
