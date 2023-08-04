from fontTools.otlLib import builder
from fontTools import ttLib
import sys
import argparse

whichFont = "neither"
argparser = argparse.ArgumentParser(prog='mkstat',
                                    description='Fix STAT and name tables for Junicode Two.')
argparser.add_argument("inputfile", help='Font to process.')
argparser.add_argument("outputfile", help="Font to output.")
args = argparser.parse_args()

inFont = args.inputfile
outFont = args.outputfile

if "Italic" in inFont:
    whichFont = "italic"
else:
    whichFont = "roman"

weightDict = dict(
    tag="wght",
    name="Weight",
    values=[
        dict(value=300, name="Light"),
        dict(value=400, name="Regular", linkedValue=700, flags=0x2),
        dict(value=500, name="Medium"),
        dict(value=600, name="SmBold"),
        dict(value=700, name="Bold"),
        # dict(value=400, name="Regular", linkedValue=700, flags=0x2)
    ]
)

widthDict = dict(
    tag="wdth",
    name="Width",
    values=[
        dict(value=75, name="Cond"),
        dict(value=87.5, name="SmCond"),
        dict(value=100, name="Normal", flags=0x2),
        dict(value=112.5, name="SmExp"),
        dict(value=125, name="Exp"),
    ]
)

enlargeDict = dict(
    tag="ENLA",
    name="Enlarge",
    values=[
        dict(value=0, name="Normal", flags=0x2),
        dict(value=47, name="Enlarged"),
        dict(value=100, name="CapSize"),
    ]
)

format2RomanAxes = [
    weightDict, widthDict, enlargeDict,
    dict(
        tag="ital",
        name="Italic",
        values=[dict(value=0, name="Roman", linkedValue=1, flags=0x2)]
    )
]

format2ItalicAxes = [
    weightDict, widthDict, enlargeDict,
    dict(
        tag="ital",
        name="Italic",
        values=[dict(value=1, name="Italic")]
    )
]

ttfont = ttLib.TTFont(inFont)
if whichFont == "italic":
    print("Adding STAT table to italic font "  + inFont)
    builder.buildStatTable(ttfont,format2ItalicAxes)
    # Add stuff to name table. First the Variations PostScript Name Prefix (table entry 25).
    ttfont['name'].setName("JunicodeVF", 25, 3, 1, 0x409)
# Glyphs takes care of the naming table now.
    # Cycle through fvar, getting instance names, building a correct postscriptNameID,
    # recording that in the name table, and adding the ID to the postscriptNameID field
    # of the fvar instance. Whew!
    for inst in ttfont['fvar'].instances:
        # if (inst.coordinates['wght'] == 400.0 and inst.coordinates['wdth'] == 100.0
        #    and inst.coordinates['ENLA'] == 0.0):
        if False:
            inst.subfamilyNameID = 2
            inst.postscriptNameID = 6
        else:
            subfamilyName = ttfont['name'].getName(inst.subfamilyNameID,3,1,0x409).toUnicode().replace(" ","")
            inst.postscriptNameID = ttfont['name'].addName("JunicodeVF" + "-" + subfamilyName,
                                                       platforms=((3,1,0x409),))
    # We don't need platform 1 names. If there are any, remove them.
    ttfont['name'].removeNames(platformID=1)
    ttfont.save(outFont)
elif whichFont == "roman":
    print("Adding STAT table to roman font " + inFont)
    ttfont = ttLib.TTFont(inFont)
    builder.buildStatTable(ttfont,format2RomanAxes)
    # Add stuff to name table. First the Variations PostScript Name Prefix (table entry 25).
    ttfont['name'].setName("JunicodeVF", 25, 3, 1, 0x409)
    # Cycle through fvar, getting instance names, building a correct postscriptNameID,
    # recording that in the name table, and adding the ID to the postscriptNameID field
    # of the fvar instance. Whew!
    for inst in ttfont['fvar'].instances:
        if (inst.coordinates['wght'] == 400.0 and inst.coordinates['wdth'] == 100.0
            and inst.coordinates['ENLA'] == 0.0):
            inst.subfamilyNameID = 2
            inst.postscriptNameID = 6
        else:
            subfamilyName = ttfont['name'].getName(inst.subfamilyNameID,3,1,0x409).toUnicode().replace(" ","")
            inst.postscriptNameID = ttfont['name'].addName("JunicodeVF" + "-" + subfamilyName,
                                                       platforms=((3,1,0x409),))
    # We don't need platform 1 names. If there are any, remove them.
    ttfont['name'].removeNames(platformID=1)
    ttfont.save(outFont)
