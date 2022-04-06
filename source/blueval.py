from fontTools import ttLib
from fontTools.ttLib import ttFont, tables
import argparse

argparser = argparse.ArgumentParser(description='Install BlueValues in a Junicode roman instance.')
argparser.add_argument("inputfile", help='Font to process.')
argparser.add_argument("outputfile", nargs="?", help="Font to output.")
args = argparser.parse_args()
inputfile    = args.inputfile
outputfile   = args.outputfile
if not outputfile:
    outputfile = inputfile

thisFont = ttLib.TTFont(inputfile)
thisFont['CFF '].cff[0].Private.BlueValues = [-14, 0, 415, 425, 455, 464, 663, 676, 725, 728]
thisFont['CFF '].cff[0].Private.StemSnapV = [60, 75, 80]
thisFont['CFF '].cff[0].Private.StdVW = [75]
thisFont.save(outputfile, 1)
