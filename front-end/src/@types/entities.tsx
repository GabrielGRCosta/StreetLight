
export type Coordinates = {
    latitude: number,
    longitude: number,
  }

export type LightPole = {
    id?: string,
    type: "StreetLight",
    location: {
        type: "geo:json",
        value: {
            type: "Point",
            coordinates: Coordinates
        }
    },
    status: {
        type: "Boolean",
        value: "on" | "off",
    }
}
