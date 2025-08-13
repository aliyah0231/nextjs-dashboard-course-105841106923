import Breadcrumbs from '../../ui/invoices/breadcrumbs';
import { CreateInvoice } from '../../ui/invoices/buttons';
import Pagination from '../../ui/invoices/pagination';
import Table from '../../ui/invoices/table';
import { fetchFilteredInvoices, fetchInvoicesPages } from '@/app/lib/data';

type Props = { searchParams?: { q?: string; page?: string } };

export default async function Page({ searchParams }: Props) {
  const query = searchParams?.q?.toString() || '';
  const currentPage = Number(searchParams?.page) || 1;

  // Pastikan currentPage tidak keluar dari range
  const totalPages = await fetchInvoicesPages(query);
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);

  // Ambil data sesuai halaman yang sudah dibatasi
  const invoices = await fetchFilteredInvoices(query, safePage);

  return (
    <div className="p-5">
      <Breadcrumbs breadcrumbs={[]} />

      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold">Invoices</h1>
        <CreateInvoice />
      </div>

      <Table query={query} currentPage={safePage} />

      {totalPages > 1 && (
        <div className="mt-5">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
