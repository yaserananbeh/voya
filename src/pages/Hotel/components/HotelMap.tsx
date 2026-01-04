import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MAP } from '@/constants'

type Props = {
  lat: number
  lng: number
}

export function HotelMap({ lat, lng }: Props) {
  const center: LatLngExpression = [lat, lng]

  return (
    <div style={{ height: MAP.DEFAULT_HEIGHT }}>
      <MapContainer
        center={center}
        zoom={MAP.DEFAULT_ZOOM}
        scrollWheelZoom={MAP.SCROLL_WHEEL_ZOOM}
        style={{ height: '100%' }}
      >
        <TileLayer attribution={MAP.TILE_LAYER.ATTRIBUTION} url={MAP.TILE_LAYER.URL} />
        <Marker position={center} />
      </MapContainer>
    </div>
  )
}
