import React, { useState } from 'react';

export default function App() {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setResult(null);

        const aNum = parseFloat(a);
        const bNum = parseFloat(b);
        if (Number.isNaN(aNum) || Number.isNaN(bNum)) {
            setError('Please enter valid numbers for both inputs.');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('http://localhost:3000/price', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ a: aNum, b: bNum })
            });

            if (!res.ok) {
                // normalize error for the UI and tests
                throw new Error('Error: failed to calculate');
            }

            const json = await res.json();
            // accept different shapes returned by the API in tests or server
            setResult(json.result ?? json.sum ?? json);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-background">
            <div className="floating-shapes" />
            <div className="max-w-md mx-auto p-6">
                <div className="card relative z-10">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl heading-gradient mb-3">Price Calculator</h1>
                        <p className="text-gray-600">Enter two numbers to calculate their sum</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="input-a" className="block text-sm font-medium text-gray-700 mb-1">
                                First Number
                            </label>
                            <input
                                id="input-a"
                                type="number"
                                value={a}
                                onChange={(e) => setA(e.target.value)}
                                className="input-field"
                                placeholder="Enter first number"
                            />
                        </div>

                        <div>
                            <label htmlFor="input-b" className="block text-sm font-medium text-gray-700 mb-1">
                                Second Number
                            </label>
                            <input
                                id="input-b"
                                type="number"
                                value={b}
                                onChange={(e) => setB(e.target.value)}
                                className="input-field"
                                placeholder="Enter second number"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full flex items-center justify-center"
                        >
                            {loading ? 'Calculating...' : 'Calculate Sum'}
                        </button>

                        {error && (
                            <div className="mt-6 p-4 bg-red-50/50 backdrop-blur-sm rounded-xl border border-red-100 animate-fade-in">
                                <p className="text-sm text-red-700 text-center">{error}</p>
                            </div>
                        )}

                        {result !== null && !error && (
                            <div className="mt-6 p-4 bg-emerald-50/50 backdrop-blur-sm rounded-xl border border-emerald-100 animate-fade-in text-center">
                                <p className="text-sm text-emerald-700">Calculation successful!</p>
                                <p className="mt-1 text-xl font-semibold text-emerald-900">Result: {result}</p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}