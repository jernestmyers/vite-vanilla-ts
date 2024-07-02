export type Choice = {
    name: string;
    preferredTo: string[];
}
  
export const initialState: Choice[] = [
    {name: "Ben & Jerry's", preferredTo: []},
    {name: "John's", preferredTo: []},
    {name: "Rita's", preferredTo: []},
    {name: "Bassetts Ice Cream", preferredTo: []},
    {name: "Jeni's", preferredTo: []},
  ]
  