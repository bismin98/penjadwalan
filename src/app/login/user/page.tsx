import Link from "next/link";

export default function UserLogin() {
  return (
    <div className="flex min-h-screen items-center justify-center px-3 py-8 sm:px-6 sm:py-16">
      <main className="surface w-full max-w-4xl rounded-2xl sm:rounded-4xl border border-black/5 px-4 py-8 sm:px-12 sm:py-12">
        <div className="grid gap-6 sm:gap-10 md:grid-cols-[1.1fr_1fr]">
          <section className="space-y-4 sm:space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-(--brass)">
              Login Pengguna
            </p>
            <h1 className="font-display text-2xl leading-tight sm:text-4xl">
              Pantau jadwal kegiatan walikota
            </h1>
            <p className="text-xs leading-5 sm:text-sm sm:leading-6 text-(--muted)">
              Akses agenda resmi, lokasi kegiatan, serta perubahan jadwal terbaru
              melalui akun pengguna.
            </p>
            <div className="rounded-xl sm:rounded-2xl border border-black/10 bg-white/70 p-3 sm:p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-(--sea)">
                Pengumuman
              </p>
              <p className="mt-2 text-xs sm:text-sm text-(--muted)">
                Cek notifikasi setelah login untuk pembaruan kegiatan mendadak.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 text-xs sm:text-sm">
              <Link className="text-foreground underline" href="/">
                Kembali ke halaman awal
              </Link>
              <Link className="text-(--muted) underline" href="/login/admin">
                Login sebagai admin
              </Link>
            </div>
          </section>

          <section className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white/80 p-4 sm:p-6">
            <form className="space-y-4 sm:space-y-5">
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] text-(--muted)">
                  Email
                </label>
                <input
                  className="field w-full rounded-xl sm:rounded-2xl border px-3 py-2.5 sm:px-4 sm:py-3 text-sm"
                  placeholder="nama@email.com"
                  type="email"
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] text-(--muted)">
                  Kata sandi
                </label>
                <input
                  className="field w-full rounded-xl sm:rounded-2xl border px-3 py-2.5 sm:px-4 sm:py-3 text-sm"
                  placeholder="Masukkan kata sandi"
                  type="password"
                />
              </div>
              <Link
                className="inline-flex w-full items-center justify-center rounded-full border border-black/15 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-foreground transition hover:border-black/40"
                href="/user/dashboard"
              >
                Masuk Pengguna
              </Link>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
