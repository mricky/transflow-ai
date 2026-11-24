import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <h2 className="text-2xl font-bold font-mono">404 - Halaman Tidak Ditemukan</h2>
      <p className="text-xs text-slate-500 mt-2">Rute perjalanan atau halaman yang Anda cari tidak tersedia.</p>
      <Link href="/" className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold">
        Kembali ke Beranda
      </Link>
    </div>
  );
}
