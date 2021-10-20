from fontTools.otlLib import builder
from fontTools import ttLib
import sys

whichFont = "both"
if len(sys.argv) > 1:
    whichFont = sys.argv[1]

inRomanFont =   "JunicodeTwoBetaVF-RomanVF.ttf"
outRomanFont =  "JunicodeTwoBetaVF-Roman.ttf"
inItalicFont =   "JunicodeTwoBetaVF-ItalicVF.ttf"
outItalicFont =  "JunicodeTwoBetaVF-Italic.ttf"

weightDict = dict(
    tag="wght",
    name="Weight",
    values=[
        dict(nominalValue=300, name="Light", rangeMinValue=300, rangeMaxValue=350),
        dict(nominalValue=400, name="Regular", flags=0x2, rangeMinValue=350, rangeMaxValue=450),
        dict(nominalValue=500, name="Medium", rangeMinValue=450, rangeMaxValue=550),
        dict(nominalValue=600, name="SemiBold", rangeMinValue=550, rangeMaxValue=650),
        dict(nominalValue=700, name="Bold", rangeMinValue=650, rangeMaxValue=750),
        dict(value=400, name="Regular", linkedValue=700, flags=0x2)
    ]
)

widthDict = dict(
    tag="wdth",
    name="Width",
    values=[
       dict(nominalValue=60, name="Condensed", rangeMinValue=60, rangeMaxValue=70),
       dict(nominalValue=80, name="SemiCondensed", rangeMinValue=70, rangeMaxValue=90),
       dict(nominalValue=100, name="Normal", flags=0x2, rangeMinValue=90, rangeMaxValue=110),
       dict(nominalValue=120, name="SemiExpanded", rangeMinValue=110, rangeMaxValue=125),
       dict(nominalValue=140, name="Expanded", rangeMinValue=125, rangeMaxValue=140),
# Recalculated, since glyphslib changes scale to 75-125 with 100 default
#        dict(nominalValue=75, name="Condensed", rangeMinValue=75, rangeMaxValue=81),
#        dict(nominalValue=87.5, name="SemiCondensed", rangeMinValue=81, rangeMaxValue=94),
#        dict(nominalValue=100, name="Normal", flags=0x2, rangeMinValue=94, rangeMaxValue=106),
#        dict(nominalValue=112.5, name="SemiExpanded", rangeMinValue=106, rangeMaxValue=119),
#        dict(nominalValue=125, name="Expanded", rangeMinValue=119, rangeMaxValue=125),
    ]
)

enlargeDict = dict(
    tag="ENLA",
    name="Enlarge",
    values=[
        dict(nominalValue=0, name="Normal", flags=0x2, rangeMinValue=0, rangeMaxValue=0.5),
        dict(nominalValue=1, name="Enlarged", rangeMinValue=0.5, rangeMaxValue=1)
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

if whichFont == "italic" or whichFont == "both":
    ttfont = ttLib.TTFont(inItalicFont)
    builder.buildStatTable(ttfont,format2ItalicAxes)
    # Add stuff to name table. First the Variations PostScript Name Prefix (table entry 25).
    ttfont['name'].setName("JunicodeTwoBetaVFItalic", 25, 3, 1, 0x409)
    # Cycle through fvar, getting instance names, building a correct postscriptNameID,
    # recording that in the name table, and adding the ID to the postscriptNameID field
    # of the fvar instance. Whew!
    for inst in ttfont['fvar'].instances:
        subfamilyName = ttfont['name'].getName(
            inst.subfamilyNameID,3,1,0x409).toUnicode().replace(" ","")
        inst.postscriptNameID = ttfont['name'].addName("JunicodeTwoVFBetaItalic" + "-" + subfamilyName,
                                                   platforms=((3,1,0x409),))
    # We don't need platform 1 names. If there are any, remove them.
    ttfont['name'].removeNames(platformID=1)
    ttfont.save(outItalicFont)

if whichFont == "roman" or whichFont == "both":
    ttfont = ttLib.TTFont(inRomanFont)
    builder.buildStatTable(ttfont,format2RomanAxes)
    # Add stuff to name table. First the Variations PostScript Name Prefix (table entry 25).
    ttfont['name'].setName("JunicodeTwoBetaVFRoman", 25, 3, 1, 0x409)
    # Cycle through fvar, getting instance names, building a correct postscriptNameID,
    # recording that in the name table, and adding the ID to the postscriptNameID field
    # of the fvar instance. Whew!
    for inst in ttfont['fvar'].instances:
        subfamilyName = ttfont['name'].getName(
            inst.subfamilyNameID,3,1,0x409).toUnicode().replace(" ","")
        inst.postscriptNameID = ttfont['name'].addName("JunicodeTwoVFBetaRoman" + "-" + subfamilyName,
                                                           platforms=((3,1,0x409),))
    # We don't need platform 1 names. If there are any, remove them.
    ttfont['name'].removeNames(platformID=1)
    ttfont.save(outRomanFont)
