import Link from "next/link";

export default function AdminLogin() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <main className="surface w-full max-w-4xl rounded-[32px] border border-black/5 px-6 py-12 sm:px-12">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr]">
          <section className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--sea)]">
              Panel Admin
            </p>
            <h1 className="font-display text-4xl leading-tight">
              Masuk untuk mengelola jadwal walikota
            </h1>
            <p className="text-sm leading-6 text-[var(--muted)]">
              Gunakan akun resmi untuk menambahkan agenda, mengatur prioritas,
              dan menyampaikan pembaruan penting kepada warga.
            </p>
            <div className="rounded-2xl border border-black/10 bg-white/70 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--brass)]">
                Info singkat
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Pastikan data agenda mencakup lokasi, waktu, dan status terkini.
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <Link className="text-[var(--ink)] underline" href="/">
                Kembali ke halaman awal
              </Link>
              <Link className="text-[var(--muted)] underline" href="/login/user">
                Login sebagai pengguna
              </Link>
            </div>
          </section>

          <section className="rounded-3xl border border-black/10 bg-white/80 p-6">
            <form className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  ID Admin
                </label>
                <input
                  className="field w-full rounded-2xl border px-4 py-3 text-sm"
                  placeholder="Masukkan ID admin"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  Kata sandi
                </label>
                <input
                  className="field w-full rounded-2xl border px-4 py-3 text-sm"
                  placeholder="Masukkan kata sandi"
                  type="password"
                />
              </div>
              <Link
                className="inline-flex w-full items-center justify-center rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--paper)] transition hover:translate-y-[-1px]"
                href="/admin/panel"
              >
                Masuk Admin
              </Link>
              <p className="text-center text-xs text-[var(--muted)]">
                Setelah login, Anda akan diarahkan ke panel input jadwal.
              </p>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
