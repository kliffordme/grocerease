import React, { useState } from "react";

export async function fetchAddress(lng: number, lat: number): Promise<string> {
  const token = import.meta.env.VITE_MAPBOX_TOKEN!;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.features[0]?.place_name || "Address not found";
  } catch (err) {
    console.error("Failed to fetch address:", err);
    return "Error fetching address";
  }
}
