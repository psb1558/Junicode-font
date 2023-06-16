# Junicode – The Font for Medievalists

This is the development site for Junicode 2, a radically rebuilt version of the
widely used free font for medievalists, linguists, and specialists in many academic
disciplines. (Versions of Junicode 1 are also hosted here, beginning with version
1.03.) Junicode 2 features full compliance with the recommendation of the
[Medieval Unicode Font Initiative](https://skaldic.abdn.ac.uk/m.php?p=mufi),
version 4.0, plus later additions and revisions, and its OpenType programming has
been rebuilt with a view to promoting accessibility and searchability in web pages
and other electronic document formats.

The Junicode 2 font

- will, when complete, have the same character set in all faces;
- has five weights (Light, Regular, Medium, Semibold, Bold)
- and five widths (Regular, SemiCondensed, Condensed, SemiExpanded, Expanded);
- includes a variable font (in both tff and cff2 flavors) with three axes:
  width, weight, and the custom
  [Enlarge](https://psb1558.github.io/Junicode-font/EnlargedAxis.html) axis;
- has improved outlines,
- an expanded collection of small caps (covering all case-paired characters),
- a more comprehensive set of anchors for mark positioning,
- and an expanded collection of OpenType features—carefully chosen and organized to promote
the display of accessible text.

![Sample Image](sample-image.jpg)

Users of the various versions of Junicode 1 need to be aware that documents
originally set in Junicode 1 may reflow when set in Junicode 2. Further,
documents that use the OpenType features of Junicode 1 (aside from basics like
kerning and standard ligatures) may not be displayed properly when changed over
to Junicode 2.

Junicode 1 is still (as of October 2021) the current stable version of the
font. However, no new features will be added to Junicode 1, though bugs will be
fixed when necessary.

The roman face of Junicode 2 is in beta testing. Interested users are encouraged
to try it out and report bugs by opening issues on this site. The italic face is
about 91% complete and still in a rough condition. It should not be relied upon
for production work until the character set is complete (probably some time in
2022).

# Resources

A [specimen](https://psb1558.github.io/Junicode-font/) page.

~~My Twitter feed, where I'll share new developments from time to time.~~

A [discussion forum](https://github.com/psb1558/Junicode-font/discussions) where you can post queries about the fonts and how to use them.

An [essay](https://psb1558.github.io/Junicode-font/Searchability.html) on making Searchable and accessible texts with Junicode and JunicodeVF.

An [introduction](https://psb1558.github.io/Junicode-font/EnlargedAxis.html) to the Enlarge axis: what it's for and how to use it.

[Test/demonstration](https://psb1558.github.io/Junicode-font/Junicode-2-feature-test.html) of
high-level CSS font properties in Junicode 2

# Building Junicode

If you want to build Junicode for yourself, you'll need a Python environment with
version 3.10.4 or higher and these Open Source apps:

- fontmake (Python app -- install with pip)
- glyphspkg (Python app -- install with pip)
- psautohint (for `.otf` fonts -- Python app -- install with pip)
- xgridfit (for `.ttf` fonts -- Python app -- install with pip)
- [ttfautohint](http://freetype.org/ttfautohint/) (for static `.ttf` fonts)
- xsltproc (already installed in Mac OS and Linux)
- Various utilities standard on Unix-like systems (e.g. `sed`, `mktemp`)

The Bash scripts `build_roman` and `build_italic` create two directories: `build` (a temporary directory,
which you may safely delete after the script has run) and `dist`, where it will place the finished
fonts. Make sure these scripts are executable and run them from the command line:

- with no argument to create a collection of static `.ttf` fonts.
- with the argument **otf** to create `.otf` fonts
- with the argument **variable** to create TrueType-flavored variable fonts

These options are available:

- **-n** to skip hinting the fonts.
- **-s** to produce a minimal set of fonts or instances: Regular, Italic, Bold, Bold Italic.
- **-u** to skip the step of replacing the `build` directory and use previously generated UFOs in that directory.

The script will create two subdirectories of `source`: `build`  and `dist`, where you will find the finished fonts.