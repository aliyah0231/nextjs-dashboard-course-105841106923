// app/dashboard/customers/page.tsx
import CustomersTable from '../../ui/customers/table';
import { customers, invoices } from '../../lib/placeholder-data';

export default function Page() {
  const formattedCustomers = customers.map(customer => {
    // Ambil semua invoice milik customer ini
    const customerInvoices = invoices.filter(
      inv => inv.customer_id === customer.id
    );

    // Hitung total invoice
    const totalInvoices = customerInvoices.length;

    // Hitung total pending
    const totalPending = customerInvoices
      .filter(inv => inv.status === 'pending')
      .reduce((sum: number, inv) => sum + inv.amount, 0);

    // Hitung total paid
    const totalPaid = customerInvoices
      .filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + inv.amount, 0);

    return {
      ...customer,
      total_invoices: totalInvoices,
      total_pending: `$${(totalPending / 100).toFixed(2)}`,
      total_paid: `$${(totalPaid / 100).toFixed(2)}`
    };
  });

  return (
    <div>
      <CustomersTable customers={formattedCustomers} />
    </div>
  );
}
