from fontTools.otlLib import builder
from fontTools import ttLib
import sys

inRomanFont =   "JuniusVF.ttf"
outRomanFont =  "JuniusVF-withSTAT.ttf"

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
        dict(nominalValue=100, name="Normal", flags=0x2, rangeMinValue=90, rangeMaxValue=100),
    ]
)

format2RomanAxes = [
    weightDict, widthDict,
    dict(
        tag="ital",
        name="Italic",
        values=[dict(value=0, name="Roman", linkedValue=1, flags=0x2)]
    )
]

ttfont = ttLib.TTFont(inRomanFont)
builder.buildStatTable(ttfont,format2RomanAxes)
# ttfont['name'].setName("JuniusVFRoman", 25, 1, 0, 0)
ttfont['name'].setName("JuniusVFRoman", 25, 3, 1, 0x409)
for inst in ttfont['fvar'].instances:
    subfamilyName = ttfont['name'].getName(
        inst.subfamilyNameID,3,1,0x409).toUnicode().replace(" ","")
    inst.postscriptNameID = ttfont['name'].addName("JuniusVFRoman" + "-" + subfamilyName,
                                                   platforms=((3,1,0x409),))
ttfont['name'].removeNames(platformID=1)
ttfont.save(outRomanFont)
