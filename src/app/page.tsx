import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <main className="surface w-full max-w-5xl rounded-[32px] border border-black/5 px-6 py-12 sm:px-12">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6 items-center text-center">
            <Image
              src="/assets/logo-walikota.png"
              alt="Logo Walikota Balikpapan"
              width={120}
              height={120}
              className="object-contain"
              priority
            />
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              Portal resmi kota
            </p>
            <div className="space-y-4">
              <h1 className="font-display text-4xl leading-tight sm:text-5xl font-bold bg-gradient-to-r from-green-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Jadwal Kegiatan Walikota Balikpapan
              </h1>
              <p className="mx-auto max-w-2xl text-base leading-7 text-[var(--muted)]">
                Silakan masuk untuk melihat agenda dan pembaruan kegiatan. Admin
                mengelola jadwal, sementara pengguna dapat memantau agenda resmi
                harian.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-black/10 bg-white/80 p-6 backdrop-blur supports-[backdrop-filter]:bg-white/60">
              <div className="flex h-full flex-col justify-between gap-6">
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.25em] text-[var(--sea)]">
                    Panel Admin
                  </p>
                  <h2 className="font-display text-2xl">Kelola jadwal resmi</h2>
                  <p className="text-sm leading-6 text-[var(--muted)]">
                    Tambahkan kegiatan baru, atur prioritas, dan update status
                    agenda secara real time.
                  </p>
                </div>
                <Link
                  className="inline-flex w-full items-center justify-center rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--paper)] transition hover:translate-y-[-1px]"
                  href="/login/admin"
                >
                  Login Admin
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white/70 p-6">
              <div className="flex h-full flex-col justify-between gap-6">
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.25em] text-[var(--brass)]">
                    Login Pengguna
                  </p>
                  <h2 className="font-display text-2xl">Pantau agenda harian</h2>
                  <p className="text-sm leading-6 text-[var(--muted)]">
                    Lihat jadwal kegiatan, lokasi acara, dan perubahan terbaru
                    dari kantor walikota.
                  </p>
                </div>
                <Link
                  className="inline-flex w-full items-center justify-center rounded-full border border-black/15 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--ink)] transition hover:border-black/40"
                  href="/login/user"
                >
                  Login Pengguna
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
