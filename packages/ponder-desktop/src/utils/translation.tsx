// Okay, Ponder doesn't actually support other languages... yet. Although these
// functions don't really do anything, they explicitly mark what text needs to
// be translated and makes the prospect of running a codemod much less
// dangerous.
//
// API inspired by GNU gettext.
// (Not because I like it, it's just the only thing I've used.)

export const translate = (text: string) => text;
export const translateWithCount = (
  singular: string,
  plural: string,
  count: number
) => (count === 1 ? singular : plural);
