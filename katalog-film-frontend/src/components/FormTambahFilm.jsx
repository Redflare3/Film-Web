import { useState } from 'react'

function FormTambahFilm({ onTambah }) {
  const [judul, setJudul] = useState('')
  const [sutradara, setSutradara] = useState('')
  const [tahun, setTahun] = useState('')
  const [genre, setGenre] = useState('')
  const [rating, setRating] = useState('')
  const [cover, setCover] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!judul.trim() || !genre.trim()) return

    const genreRapi = genre.trim()

    onTambah({
      judul: judul.trim(),
      sutradara: sutradara.trim() || 'Tidak diketahui',
      tahun: Number(tahun),
      genre: genreRapi.charAt(0).toUpperCase() + genreRapi.slice(1),
      rating: Number(rating),
      cover: cover.trim(),
    })

    setJudul('')
    setSutradara('')
    setTahun('')
    setGenre('')
    setRating('')
    setCover('')
  }

  return (
    <section id="tambah" className="form-section">
      <h2 className="section-judul">Tambah film baru</h2>
      <p className="section-sub">Isi data film yang ingin kamu masukkan ke koleksi.</p>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Judul film"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Sutradara"
          value={sutradara}
          onChange={(e) => setSutradara(e.target.value)}
        />
        <input
          type="number"
          placeholder="Tahun rilis"
          min="1900"
          max="2100"
          value={tahun}
          onChange={(e) => setTahun(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Genre (mis. Drama)"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Rating (0-10)"
          step="0.1"
          min="0"
          max="10"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="URL cover (opsional)"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
        />
        <button type="submit" className="tombol tombol--primary">Tambah</button>
      </form>
    </section>
  )
}

export default FormTambahFilm