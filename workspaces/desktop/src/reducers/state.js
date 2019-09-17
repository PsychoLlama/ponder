// @flow
type Notebook = { type: 'notebook', id: string };
type Note = { type: 'note', id: string };

export type Navigation = {
  path: string[],
  note: null | string,
};

export const navigation: Navigation = {
  note: null,
  path: [],
};

export type Notebooks = {
  [notebookId: string]: {
    contents: Array<Notebook | Note>,
  },
};

export const notebooks: Notebooks = {};

export type Notes = {
  [id: string]: {
    sections: Array<string>,
    title: string,
  },
};

export const notes: Notes = {};
