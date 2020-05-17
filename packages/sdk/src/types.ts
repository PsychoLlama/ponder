/**
 * These are the data structures persisted in the ~/.ponder directory. Be
 * careful changing them.
 */
export interface Notebook {
  title: string;
  notebooks: Array<string>;
  notes: Array<string>;
}

export interface Note {
  title: string;
  sections: Array<Section>;
}

export interface Section {
  type: SectionType;
  content: string;
  id: string;
}

export enum SectionType {
  RichText = 'rich-text',
}
