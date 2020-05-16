// @flow
type Notebook = { type: 'notebook'; id: string };
type Note = { type: 'note'; id: string };

export type Navigation = {
  path: string[];
  note: null | string;
};

export type Notebooks = {
  [notebookId: string]: {
    title: string;
    contents: Array<Notebook | Note>;
  };
};

export type Notes = {
  [noteId: string]: {
    sections: Array<string>;
    title: string;
  };
};

export type Sections = {
  [sectionId: string]: {
    type: 'markdown';
    content: string;
  };
};

export const notebooks: Notebooks = {};
export const notes: Notes = {};
export const sections: Sections = {};
export const navigation: Navigation = {
  note: null,
  path: [],
};
