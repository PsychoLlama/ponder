// @flow
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
    notebooks: { [id: string]: string },
    notes: { [id: string]: string },
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
