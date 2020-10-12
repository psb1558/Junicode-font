s = Glyphs.font.selection
for g in s:
	for l in g.layers:
		b = l.background
		while len(b.paths) > 0:
			print("Deleting background paths in " + g.name)
			del b.paths[0]
		if len(b.anchors) > 0:
			print("Deleting background anchors in " + g.name)
			b.anchors = []
		if len(b.components) > 0:
			print("Deleting background components in " + g.name)
			b.components = []
