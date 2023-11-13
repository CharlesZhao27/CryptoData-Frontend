import { Typography } from "@mui/material";
import CryptoMarketDataTable from './component/CryptoMarketDataTable'



export default function Home() {
  return (
    <main>
      <Typography> Crypto Market Data</Typography>
      <CryptoMarketDataTable />
    </main>
  )
}
