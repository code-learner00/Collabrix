import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
import { formatINR } from '../../utils/formatters'

export default function ROIChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} />
        <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} tickFormatter={v => `₹${v / 1000}k`} />
        <Tooltip formatter={(v) => [formatINR(v)]} />
        <Legend />
        <Bar dataKey="spent" name="Spent" fill="var(--color-accent)" radius={[3, 3, 0, 0]} />
        <Bar dataKey="earned" name="Earned" fill="var(--color-success)" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}