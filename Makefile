all:
	fontmake -g Junicode-width.glyphs -i -o otf
	fontmake -g Junicode-Italic.glyphs -i -o otf

install:
	mkdir -p /usr/share/fonts/opentype/juniusx
	cp */*.otf /usr/share/fonts/opentype/juniusx

clean:
	rm -rf *_ufo/
