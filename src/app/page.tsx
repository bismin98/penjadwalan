import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center px-3 py-8 sm:px-6 sm:py-16">
      <main className="surface w-full max-w-5xl rounded-2xl sm:rounded-4xl border border-black/5 px-4 py-8 sm:px-6 sm:py-12 md:px-12">
        <div className="flex flex-col gap-6 sm:gap-10">
          <div className="flex flex-col gap-4 sm:gap-6 items-center text-center">
            <Image
              src="/assets/logo-walikota.png"
              alt="Logo Walikota Balikpapan"
              width={120}
              height={120}
              className="object-contain w-20 h-20 sm:w-28 sm:h-28"
              priority
            />
            <p className="text-[9px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-(--muted)">
              PEMERINTAH KOTA BALIKPAPAN
            </p>
            <div className="space-y-3 sm:space-y-4">
              <h1 className="font-display text-2xl sm:text-4xl md:text-5xl leading-tight font-bold bg-linear-to-r from-green-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Jadwal Kegiatan Walikota Balikpapan
              </h1>
              <p className="mx-auto max-w-2xl text-xs sm:text-base leading-6 sm:leading-7 text-(--muted) px-2 sm:px-0">
                Silakan masuk untuk melihat agenda dan pembaruan kegiatan. Admin
                mengelola jadwal, sementara pengguna dapat memantau agenda resmi
                harian.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            <div className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white/80 p-4 sm:p-6 backdrop-blur supports-backdrop-filter:bg-white/60">
              <div className="flex h-full flex-col justify-between gap-4 sm:gap-6 items-center text-center">
                <div className="space-y-2 sm:space-y-3">
                  <p className="text-[10px] sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] text-(--sea)">
                    Panel Admin
                  </p>
                  <h2 className="font-display font-bold text-lg sm:text-2xl">KELOLA JADWAL RESMI</h2>
                  <p className="text-xs sm:text-sm leading-5 sm:leading-6 text-(--muted)">
                    Tambahkan kegiatan baru, atur prioritas, dan update status
                    agenda secara real time.
                  </p>
                </div>
                <Link
                  className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-4 py-2 sm:px-5 sm:py-3 text-[10px] sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-(--paper) transition hover:-translate-y-px"
                  href="/login/admin"
                >
                  Login Admin
                </Link>
              </div>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white/70 p-4 sm:p-6">
              <div className="flex h-full flex-col justify-between gap-4 sm:gap-6 items-center text-center">
                <div className="space-y-2 sm:space-y-3">
                  <p className="text-[10px] sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] text-(--brass)">
                    Login Pengguna
                  </p>
                  <h2 className="font-display font-bold text-lg sm:text-2xl">PANTAU AGENDA HARIAN</h2>
                  <p className="text-xs sm:text-sm leading-5 sm:leading-6 text-(--muted)">
                    Lihat jadwal kegiatan, lokasi acara, dan perubahan terbaru
                    dari kantor walikota.
                  </p>
                </div>
                <Link
                  className="inline-flex w-full items-center justify-center rounded-full bg-linear-to-r from-orange-500 via-pink-500 to-purple-500 px-4 py-2 sm:px-5 sm:py-3 text-[10px] sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white transition hover:-translate-y-px hover:shadow-lg"
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
