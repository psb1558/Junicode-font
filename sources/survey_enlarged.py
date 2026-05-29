for g in Glyphs.font.glyphs:
	reg = g.layers[0]
	enl = g.layers[5]
	wdiff = reg.width - enl.width
	if wdiff != 0:
		print(g.name, ": ", wdiff)
	else:
		lsbdiff = reg.LSB - enl.LSB
		if lsbdiff != 0:
			print(g.name, " LSB: ", lsbdiff)

