"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button, InputField } from "@/components";

export default function AdminLogin() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6">
      {/* Background decorative elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />
      </div>

      <main className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link 
            href="/" 
            className="mb-6 inline-flex items-center gap-2 text-sm text-[--muted] transition-colors hover:text-[--ink]"
          >
            <Icon icon="mdi:arrow-left" className="text-lg" />
            Kembali
          </Link>
          
          <div className="mt-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[--sea]">
              <Icon icon="mdi:shield-account" className="text-3xl text-white" />
            </div>
            <h1 className="font-display text-3xl font-bold text-[--ink]">
              Login Admin
            </h1>
            <p className="mt-2 text-sm text-[--muted]">
              Kelola jadwal kegiatan Walikota Balikpapan
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div 
          className="backdrop-blur-md bg-white/90 rounded-3xl border border-white/60 shadow-2xl p-8"
          style={{
            WebkitBackdropFilter: "blur(12px)",
            backdropFilter: "blur(12px)",
          }}
        >
          <form className="space-y-5">
            <InputField
              label="ID Admin"
              type="text"
              placeholder="Masukkan ID admin"
              required
            />
            
            <InputField
              label="Kata Sandi"
              type="password"
              placeholder="••••••••"
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 rounded border-gray-300 text-[--sea] focus:ring-[--sea]"
                />
                <span className="text-[--muted]">Ingat saya</span>
              </label>
              <Link 
                href="#" 
                className="text-[--sea] hover:underline"
              >
                Lupa password?
              </Link>
            </div>

            <Button
              variant="primary"
              type="button"
              className="w-full"
              onClick={() => window.location.href = "/admin/panel"}
            >
              <span className="flex items-center justify-center gap-2">
                Masuk
                <Icon icon="mdi:arrow-right" className="text-lg" />
              </span>
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-[--muted]">ATAU</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* User Link */}
          <Link 
            href="/login/user"
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white/50 px-4 py-3 text-sm font-medium text-[--ink] transition-all hover:bg-white hover:shadow-md"
          >
            <Icon icon="mdi:account" className="text-lg" />
            Login sebagai Pengguna
          </Link>
        </div>

        {/* Footer Note */}
        <div className="mt-6 rounded-2xl bg-amber-50/80 px-4 py-3 text-center">
          <div className="flex items-start gap-2 text-left">
            <Icon icon="mdi:shield-alert" className="mt-0.5 text-lg text-amber-600" />
            <p className="text-xs text-amber-900">
              Pastikan data agenda mencakup lokasi, waktu, dan status terkini
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
