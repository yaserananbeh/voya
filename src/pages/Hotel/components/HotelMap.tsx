import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'

type Props = {
  lat: number
  lng: number
}

export function HotelMap({ lat, lng }: Props) {
  const center: LatLngExpression = [lat, lng]

  return (
    <div style={{ height: 300 }}>
      <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: '100%' }}>
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center} />
      </MapContainer>
    </div>
  )
}
