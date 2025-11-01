import React, { useState } from 'react'

export default function App() {
    const [a, setA] = useState('')
    const [b, setB] = useState('')
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setResult(null)

        const aNum = parseFloat(a)
        const bNum = parseFloat(b)
        if (Number.isNaN(aNum) || Number.isNaN(bNum)) {
            setError('Please enter valid numbers for both inputs.')
            return
        }

        setLoading(true)
        try {
            const res = await fetch('http://localhost:3000/price', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ a: aNum, b: bNum })
            })

            if (!res.ok) {
                const body = await res.json().catch(() => ({}))
                throw new Error(body.error || `Server returned ${res.status}`)
            }

            const json = await res.json()
            setResult(json.sum)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: 24 }}>
            <h1>Price Calculator</h1>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
                <label>
                    A:
                    <input
                        type="text"
                        value={a}
                        onChange={(e) => setA(e.target.value)}
                        placeholder="Enter number a"
                        style={{ width: '100%', padding: 8, marginTop: 6 }}
                    />
                </label>

                <label>
                    B:
                    <input
                        type="text"
                        value={b}
                        onChange={(e) => setB(e.target.value)}
                        placeholder="Enter number b"
                        style={{ width: '100%', padding: 8, marginTop: 6 }}
                    />
                </label>

                <button type="submit" disabled={loading} style={{ padding: '10px 14px' }}>
                    {loading ? 'Calculating...' : 'Submit'}
                </button>
            </form>

            {error && (
                <div style={{ marginTop: 16, color: 'crimson' }}>
                    Error: {error}
                </div>
            )}

            {result !== null && (
                <div style={{ marginTop: 16, color: 'green' }}>
                    Result: {result}
                </div>
            )}
        </div>
    )
}
