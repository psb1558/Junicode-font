s = Glyphs.font.selection
for g in s:
    for i, l in enumerate(g.layers):
        b = l.background
        while len(b.shapes) > 0:
            print("Deleting background paths and components in ", g.name, "[", i, "]", sep="")
            del b.shapes[0]
        if len(b.anchors) > 0:
            print("Deleting background anchors in " + g.name)
            b.anchors = []

