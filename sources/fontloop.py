from fontTools import ttLib
from fontTools.ttLib import ttFont, tables
import argparse

# A very simple program for looping through a font. This looks for
# big glyph programs, but it could be adapted to do any number of
# minor chores.

argparser = argparse.ArgumentParser(prog='xgridfit',
                                    description='Loop through a font.')
argparser.add_argument("inputfile", help='Font to process.')
argparser.add_argument("outputfile", nargs="?", help="Font to output.")
args = argparser.parse_args()
inputfile    = args.inputfile
outputfile   = args.outputfile
if not outputfile:
    outputfile = inputfile

thisFont = ttLib.TTFont(inputfile)
gn = thisFont.getGlyphNames()
for n in gn:
    glyph = thisFont['glyf'][n]
    try:
        proglen = len(glyph.program.getBytecode())
        if proglen > 400:
            print(str(proglen) + " " + n)
    except Exception:
        pass
# thisFont.save(outputfile, 1)
