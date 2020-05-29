import { Section } from './types';

export enum EntityType {
  Notebook = 'notebook',
  Note = 'note',
}

export interface Notebook {
  type: EntityType.Notebook;
  title: string;
  id: string;
}

export interface Note {
  type: EntityType.Note;
  title: string;
  id: string;
  sections: Array<Section>;
}

export { Section, SectionType } from './types';
