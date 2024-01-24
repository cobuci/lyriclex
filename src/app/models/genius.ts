export type Genius = {
  id: number,
  title: string,
  artist_names: string

}

export type ApiResponseType = {
  hits: { result: Genius }[];
};
