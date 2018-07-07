# About the extension

Source code of the Chrome extension Cookie-Fucker.

Removes all cookie warnings from all websites, light yet very intelligent.

---

# About the code

The script launches general checking of the DOM 3 times (otherwise it won't cover all cases):
- when the DOM is ready ("run_at": "document_idle" as declared at manifest.json)
- when the document is completely loaded (document.readyState === 'complete')
- in 500 ms after the document is completely loaded (setTimeout)

The checking covers usual patterns for displaying cookie warnings (which are used in most of the cases),
as long as specific patterns for certain cases.

The general checking iterates each element of the DOM and checks the following:
- position (must be fixed of sticky)
- outerHTML (must contain at least one of the specific keywords such as "cookie", "gdpr", "notice" etc)
- specific styles to detect elements which overlap the whole page:
z-index (must be greater than 100),
top & left & bottom & right (must be 0),
display & visibility (must not be none/hidden),
opacity or alpha channel in rgba (must be less than 1)

The specific patterns are for the following cases:
- oath.com & their websites including Yahoo & AOL (automaticly submits the form)
- Google, Youtube, Facebook, Linkedin, Aliexpress (finds & removes specific elements using querySelector)
- trustarc.com & websites which use its code (finds & removes all elements where className contains "truste_")
