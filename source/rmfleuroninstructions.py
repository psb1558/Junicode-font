from fontTools import ttLib
from fontTools.ttLib import ttFont, tables
import argparse

# ttfautohint goes crazy trying to hint the very complicated outlines of the
# fleurons in the font, and generates more than 90,000 bytes of completely
# useless code. This tiny program deletes the instructions for those glyphs.

fleurons = ["uniE270",   "uniE27D",   "uniE670",    "uniE67D",    "uniE68A",   "uniE736",
            "uniE8B0",   "uniE8B1",   "uniEF90",    "uniEF91",    "uniEF92",   "uniEF93",
            "uniEF98",   "uniEF99",   "uniEF94",    "uniEF95",    "uniEF96",   "uniEF97",
            "uniEF9A",   "uniEF9B",   "uniEF9C",    "uniF018",    "uniF019",   "uniF014",
            "uniEF9F",   "uniF011",   "uniF01D",    "uniF01E",    "uniF01B",   "uni2619",
            "uni261A",   "uni261B",   "uni261C",    "uni261D",    "uni261E",   "uni261F",
            "uni2740",   "uni2766",   "uni2767",    "uniF19F",    "a.vtag",    "b.vtag",
            "c.vtag",    "d.vtag",    "e.vtag",     "f.vtag",     "g.vtag",    "h.vtag",
            "i.vtag",    "j.vtag",    "k.vtag",     "l.vtag",     "m.vtag",    "n.vtag",
            "o.vtag",    "p.vtag",    "q.vtag",     "r.vtag",     "s.vtag",    "t.vtag",
            "u.vtag",    "v.vtag",    "w.vtag",     "x.vtag",     "y.vtag",    "z.vtag",
            "zero.vtag", "one.vtag",  "two.vtag",   "three.vtag", "four.vtag", "five.vtag",
            "six.vtag", "seven.vtag", "eight.vtag", "nine.vtag",  "cancel.vtag" ]

argparser = argparse.ArgumentParser(prog='rmfleuroninstructions',
                                    description='Remove instructions for fleurons and several other glyphs.')
argparser.add_argument("inputfile", help='Font to process.')
argparser.add_argument("outputfile", nargs="?", help="Font to output.")
args = argparser.parse_args()
inputfile    = args.inputfile
outputfile   = args.outputfile
if not outputfile:
    outputfile = inputfile

thisFont = ttLib.TTFont(inputfile)
print("Removing extraneous hints in " + inputfile)
altered = False

for f in fleurons:
    try:
        glyph = thisFont['glyf'][f]
        glyph.program.fromAssembly("")
        altered = True
    except Exception:
        pass

if altered:
    thisFont.save(outputfile, 1)
