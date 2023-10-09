from Foundation import NSPoint
import copy

s = Glyphs.font.selection
for g in s:
    g.leftMetricsKey = g.rightMetricsKey = g.widthMetricsKey = None
    for l in g.layers:
        l.leftMetricsKey = l.rightMetricsKey = l.widthMetricsKey = None

#    reg = g.layers[0]
#    enl = g.layers[5]
#    if len(reg.components) == 0:
#        print("skipping ", g.name)
#        continue
#    print("editing ", g.name)
#    g.leftMetricsKey = g.rightMetricsKey = g.widthMetricsKey = None
#    for l in g.layers:
#        l.leftMetricsKey = l.rightMetricsKey = l.widthMetricsKey = None
#    enl.shapes = copy.copy(reg.shapes)
#    for s in enl.shapes:
#        s.position = NSPoint(s.position.x + 26, s.position.y)
#    enl.LSB = reg.LSB + 26
#    enl.width = reg.width
        
    

