
interface GeoData {
  city: string;
  country: string;
  lat: number;
  lon: number;
  regionName: string;
  query: string;
  [key: string]: any; // allow extra fields
}
export { GeoData };
