export type Genius = {
  id: number,
  title: string,
  url: string,
  artist_names: string
  lyrics: string,
  image: string
}

export type ApiResponseType = {
  hits: { result: Genius }[];
};
