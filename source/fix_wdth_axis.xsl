<xsl:stylesheet version="1.0"
 xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="xml" version="1.0" encoding="UTF-8"/>

    <xsl:template match="node()|@*">
      <xsl:copy>
         <xsl:apply-templates select="node()|@*"/>
      </xsl:copy>
    </xsl:template>

    <xsl:template match="axis[@name='Width']">
      <axis>
        <xsl:attribute name="tag">
          <xsl:text>wdth</xsl:text>
        </xsl:attribute>
        <xsl:attribute name="name">
          <xsl:text>Width</xsl:text>
        </xsl:attribute>
        <xsl:attribute name="minimum">
          <xsl:text>75</xsl:text>
        </xsl:attribute>
        <xsl:attribute name="maximum">
          <xsl:text>125</xsl:text>
        </xsl:attribute>
        <xsl:attribute name="default">
          <xsl:text>100</xsl:text>
        </xsl:attribute>
      </axis>
    </xsl:template>

    <xsl:template match="instance[contains(@stylename,'Enlarged') or
                                  contains(@stylename,'Condensed Bold') or
                                  contains(@stylename,'Condensed Semibold') or
                                  contains(@stylename,'Expanded Light')]"/>
</xsl:stylesheet>
