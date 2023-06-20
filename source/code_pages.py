from fontTools import ttLib
import sys

# 0:  1252 Latin 1
# 1:  1250 Latin 2
# 3:  1253 Greek
# 4:  1254 Turkish
# 7:  1257 Windows Baltic
# 8:  1258 Vietnamese
# 29:      Macintosh character set
# 31:      Symbol character set
# 32-63:   DOS code pages not used
#       31  27  23  19  15  11  7   3
cp1 = 0b10100000000000000000000110011011
#       63  59  55  51  47  43  39  35
cp2 = 0b00000000000000000000000000000000

if __name__ == "__main__":
    if len(sys.argv) > 1:
        for i, f_name in enumerate(sys.argv):
            if i > 0:
                print("Fixing code pages in " + f_name)
                ft_font = ttLib.TTFont(f_name)
                ft_font["OS/2"].ulCodePageRange1 = cp1
                ft_font["OS/2"].ulCodePageRange2 = cp2
                ft_font.save(f_name, 1)
    sys.exit(0)
