import { useState, useEffect } from 'react'

const API_URL = 'https://api.tvmaze.com/search/shows'
const keFilm = (show) => ({
  judul: show.name,
  sutradara: show.network?.name || show.webChannel?.name || 'Tidak diketahui',
  tahun: show.premiered ? Number(show.premiered.slice(0, 4)) : 0,
  genre: show.genres[0] || 'Lainnya',
  rating: show.rating?.average ?? 0,
  cover: show.image?.medium || '',
})
function CariFilmAPI({ onTambah, judulTersimpan }) {
  const [input, setInput] = useState('')
  const [kataCari, setKataCari] = useState('sherlock')
  const [hasil, setHasil] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [percobaan, setPercobaan] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function ambilData() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `${API_URL}?q=${encodeURIComponent(kataCari)}`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error(`Server membalas dengan status ${response.status}`)
        }

        const data = await response.json()
        setHasil(data)
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(
          err.message === 'Failed to fetch'
            ? 'Tidak dapat terhubung ke server. Periksa koneksi internet kamu.'
            : err.message
        )
        setHasil([])
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    ambilData()
    return () => controller.abort()
  }, [kataCari, percobaan])

  const handleCari = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setKataCari(input.trim())
  }

  const cobaLagi = () => setPercobaan((p) => p + 1)

  return (
    <section id="cari-api" className="api-section">
      <h2 className="section-judul">Cari film dari TVMaze</h2>
      <p className="section-sub">
        Data API
      </p>

      <form className="api-form" onSubmit={handleCari}>
        <input
          type="text"
          placeholder="Ketik judul, mis. batman, dark, friends..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="tombol tombol--primary">Cari</button>
      </form>

      {loading && (
        <div className="status status--loading">
          <span className="spinner" />
          Memuat data...
        </div>
      )}

      {error && (
        <div className="status status--error">
          <p>Gagal mengambil data: {error}</p>
          <button className="tombol tombol--outline" onClick={cobaLagi}>
            Coba Lagi
          </button>
        </div>
      )}

      {!loading && !error && hasil.length === 0 && (
        <p className="kosong">Tidak ada hasil untuk "{kataCari}".</p>
      )}

      {!loading && !error && hasil.length > 0 && (
        <ul className="hasil-list">
          {hasil.map(({ show }) => {
            const sudahAda = judulTersimpan.includes(show.name.toLowerCase())

            return (
              <li key={show.id} className="hasil-item">
                <div className="hasil-item__thumb">
                  {show.image ? (
                    <img src={show.image.medium} alt={`Cover ${show.name}`} />
                  ) : (
                    <div className="thumb-kosong">🎞️</div>
                  )}
                </div>

                <div className="hasil-item__info">
                  <strong>{show.name}</strong>
                  <small>
                    {show.premiered ? show.premiered.slice(0, 4) : '-'} ·{' '}
                    {show.genres[0] || 'Lainnya'}
                  </small>
                  <span className="rating">⭐ {show.rating?.average ?? '-'}</span>
                </div>

                <button
                  className="tombol tombol--outline"
                  disabled={sudahAda}
                  onClick={() => onTambah(keFilm(show))}
                >
                  {sudahAda ? 'Ditambahkan' : 'Tambah'}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default CariFilmAPI