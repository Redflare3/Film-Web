function Navbar({ kataKunci, onUbahKataKunci, daftarGenre, genreAktif, onUbahGenre }) {
  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <a href="#atas" className="logo">🎞️ FilmVault</a>

        <div className="navbar__links">
          <a href="#koleksi">Koleksi</a>
          <a href="#tambah">Tambah Film</a>
        </div>

        <input
          className="navbar__search"
          type="search"
          placeholder="Cari judul, sutradara, genre..."
          value={kataKunci}
          onChange={(e) => onUbahKataKunci(e.target.value)}
        />

        <select
          className="select"
          value={genreAktif}
          onChange={(e) => onUbahGenre(e.target.value)}
        >
          {daftarGenre.map((genre) => (
            <option key={genre} value={genre}>
              {genre === 'Semua' ? 'Semua genre' : genre}
            </option>
          ))}
        </select>
      </div>
    </nav>
  )
}

export default Navbar