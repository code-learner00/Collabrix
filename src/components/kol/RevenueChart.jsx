import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function RevenueChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} />
        <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} tickFormatter={v => `₹${v / 1000}k`} />
        <Tooltip formatter={(v) => [`₹${v.toLocaleString('en-IN')}`, 'Revenue']} />
        <Line type="monotone" dataKey="revenue" stroke="var(--color-accent)" strokeWidth={2} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}