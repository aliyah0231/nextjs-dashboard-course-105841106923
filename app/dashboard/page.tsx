
// Make sure these files exist at the specified paths, or update the paths below to the correct locations.
import Cards from "../ui/dashboard/cards";
import { fetchLatestInvoices } from '@/app/lib/data';
import LatestInvoices from "../ui/dashboard/latest-invoices";
import { revenue } from "../lib/placeholder-data"
import RevenueChart from "../ui/dashboard/revenue-chart";

export default async function Page() {
  const invoices = await fetchLatestInvoices();
  return (
      <div>
        <Cards />
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={invoices} />
      </div>
    );
}
