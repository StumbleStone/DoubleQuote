export const debug_text = `
Do we want 'quote' or ‘quote’ ?

Do we want "quote" or “quote” ?

Do we want don't, they're and it's or don’t, they’re and it’s? and just to make sure we also check don‘t

We also want spaces/newlines/eof after dialog "quotes."Right?"
We also want spaces/newlines/eof after dialog “quotes.”Right?”

"We also want spaces/newlines before dialog"quotes."Right?
“We also want spaces/newlines before dialog“quotes.”Right?

=== TECHINCAL TESTS ===

side-by-side issues: "A'll “A'll "A’ll “A’ll
side-by-side issues: "'ll “'ll "’ll “’ll

`.trim();

//Remember ?to >add .spaces "after ”special !characters
