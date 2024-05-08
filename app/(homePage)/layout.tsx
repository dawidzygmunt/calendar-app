import Navbar from '@/components/navbar';
import React from 'react'
import toast, { Toaster } from 'react-hot-toast';

export default async function DashboardLayou({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Toaster />
      <Navbar />
      {children}
    </div>
  )
}
