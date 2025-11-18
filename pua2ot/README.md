pua2ot

This directory contains a little utility for Junicode users who use MUFI/Junicode
characters encoded in the Unicode Private Use Area (PUA) and/or MUFI entities in their
documents, or for those who are managing legacy documents using MUFI PUA characters.
The utility `pua2ot` converts a text that uses PUA characters to one that uses
only standard Unicode characters styled with OpenType features. The text it outputs
is marked up with HTML tags.

pua2ot comes as a database of MUFI’s PUA characters and one common file that can be
called in various ways: by a web page that supplies a little web app for converting
plain text and HTML files; by a script that, embedded in a web page, converts all
the PUA characters in its `<body>` element; and by a script that can be called by a
Node program.

Consult the file `pua2ot.pdf` in the `pua2ot/doc` directory for further details about
how to use the script. For information on the markup of individual characters, see
the file `charlist.html`.