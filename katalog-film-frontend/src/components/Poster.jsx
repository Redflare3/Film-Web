import { useState } from 'react'

function Poster({ cover, judul }) {
  const [gagal, setGagal] = useState(false)

  if (!cover || gagal) {
    return (
      <div className="poster poster--kosong">
        <span>🎞️</span>
        <small>Taruh cover di sini</small>
      </div>
    )
  }

  return (
    <img
      className="poster"
      src={cover}
      alt={`Cover film ${judul}`}
      onError={() => setGagal(true)}
    />
  )
}

export default Poster