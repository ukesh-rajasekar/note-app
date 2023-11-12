export type NoteType = {
  id: string;
  text: string;
  category: string;
  client: string;
};

export type NoteContextType = {
  notes: NoteType[];
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
  findNotes: () => Promise<void>;
};

export type PickerOptions = {
  label: string;
  value: string;
}