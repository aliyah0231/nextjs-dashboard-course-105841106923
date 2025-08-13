import CustomersTable from '@/app/ui/customers/table';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getCustomers() {
  return await sql`
    SELECT
      c.id,
      c.name,
      c.email,
      c.image_url,
      COUNT(i.id) AS total_invoices,
      SUM(CASE WHEN i.status = 'pending' THEN i.amount ELSE 0 END) AS total_pending,
      SUM(CASE WHEN i.status = 'paid' THEN i.amount ELSE 0 END) AS total_paid
    FROM customers c
    LEFT JOIN invoices i ON c.id = i.customer_id
    GROUP BY c.id
    ORDER BY c.name;
  `;
}

export default async function Page() {
  const customers = await getCustomers();

  return (
    <div className="p-4">
      <CustomersTable customers={customers} />
    </div>
  );
}