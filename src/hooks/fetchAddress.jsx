export async function fetchAddress(lng, lat) {
  const token = import.meta.env.VITE_MAPBOX_TOKEN;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    return data.features?.[0]?.place_name || "Address not found";
  } catch (err) {
    console.error("Failed to fetch address:", err);
    return "Error fetching address";
  }
}
