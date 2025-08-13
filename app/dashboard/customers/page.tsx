import CustomersTable from "@/app/ui/customers/table";
import postgres from "postgres";
import { FormattedCustomersTable } from "@/app/lib/definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function getCustomers(): Promise<FormattedCustomersTable[]> {
  const rows = await sql/*sql*/ `
    SELECT
      c.id,
      c.name,
      c.email,
      c.image_url,
      COUNT(i.id) AS total_invoices,
      COALESCE(SUM(CASE WHEN i.status = 'pending' THEN i.amount ELSE 0 END), 0) AS total_pending,
      COALESCE(SUM(CASE WHEN i.status = 'paid' THEN i.amount ELSE 0 END), 0) AS total_paid
    FROM customers c
    LEFT JOIN invoices i ON c.id = i.customer_id
    GROUP BY c.id
    ORDER BY c.name;
  `;

return rows.map(
    (row: any): FormattedCustomersTable => ({
      id: row.id,
      name: row.name,
      email: row.email,
      image_url: row.image_url,
      total_invoices: Number(row.total_invoices),
      total_pending: Number(row.total_pending).toString(),
      total_paid: Number(row.total_paid).toString(),
    })
  );

export default async function Page() {
  const customers = await getCustomers();

  return (
    <div className="p-4">
      <CustomersTable customers={customers} />
    </div>
  );
}
