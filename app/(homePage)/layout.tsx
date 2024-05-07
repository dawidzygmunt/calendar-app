import Navbar from '@/components/navbar';
import React from 'react'

export default async function DashboardLayou({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
