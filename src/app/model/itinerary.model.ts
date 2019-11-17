export interface Itinerary {
  id: string;
  codigo: string;
  nome: string;
  coordinates: Coordinates[];
}

interface Coordinates {
  lat: string;
  lng: string;
}
