# For use in Glyphs macro panel
s = Glyphs.font.selection
for g in s:
	if g.unicode:
		unicodeint = int(g.unicode, 16)
		if unicodeint >= int("100000", 16):
			print(g.unicode + ": " + chr(unicodeint) + "\n")
