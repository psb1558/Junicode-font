alt_styles = {
   Reg =          { 400, 100   }, -- Regular
   Cond =         { 400, 75    },
   SmCond =       { 400, 87.5  },
   SmExp =        { 400, 112.5 },
   Exp =          { 400, 125   },
   Light =        { 300, 100   }, -- Light
   CondLight =    { 300, 75    },
   SmCondLight =  { 300, 87.5  },
   SmExpLight =   { 300, 112.5 },
   ExpLight =     { 300, 125   },
   Medium =       { 500, 100   }, -- Medium
   CondMedium =   { 500, 75    },
   SmCondMedium = { 500, 87.5  },
   SmExpMedium =  { 500, 112.5 },
   ExpMedium =    { 500, 125   },
   Smbold =       { 600, 100   }, -- Semibold
   CondSmbold =   { 600, 75    },
   SmCondSmbold = { 600, 87.5  },
   SmExpSmbold =  { 600, 112.5 },
   ExpSmbold =    { 600, 125   },
   Bold =         { 700, 100   }, -- Bold
   CondBold =     { 700, 75    },
   SmCondBold =   { 700, 87.5  },
   SmExpBold =    { 700, 112.5 },
   ExpBold =      { 700, 125   }
}


-- 1: Regular, 2: Light, 3: Medium
regular_weights = { 
   junicodevf_at_RwghtOne =   { 490, 390, 590 },
   junicodevf_at_RwghtTwo =   { 440, 340, 540 },
   junicodevf_at_RwghtThree = { 390, 290, 490 },
   junicodevf_at_RwghtFour =  { 370, 270, 470 },
   junicodevf_at_RwghtFive =  { 350, 250, 450 },
   junicodevf_at_IwghtOne =   { 525, 425, 625 },
   junicodevf_at_IwghtTwo =   { 475, 375, 575 },
   junicodevf_at_IwghtThree = { 425, 325, 525 },
   junicodevf_at_IwghtFour =  { 370, 270, 470 },
   junicodevf_at_IwghtFive =  { 350, 250, 450 }
}

-- 1: Bold, 2: Semibold
bold_weights = { 
   junicodevf_at_BwghtOne =    { 790, 690 },
   junicodevf_at_BwghtTwo =    { 740, 640 },
   junicodevf_at_BwghtThree =  { 690, 590 },
   junicodevf_at_BwghtFour =   { 650, 550 },
   junicodevf_at_BwghtFive =   { 600, 500 },
   junicodevf_at_BIwghtOne =   { 800, 700 },
   junicodevf_at_BIwghtTwo =   { 775, 675 },
   junicodevf_at_BIwghtThree = { 725, 625 },
   junicodevf_at_BIwghtFour =  { 675, 575 },
   junicodevf_at_BIwghtFive =  { 625, 525 }
}

 -- 1: regular, 2: condensed, 3: semicondensed, 4: semiexpanded, 5: expanded
all_widths = {
   junicodevf_at_RwdthOne =    { 115,   95,   100,  125,   150   },
   junicodevf_at_RwdthTwo =    { 107.5, 85,   95,   120,   137.5 },
   junicodevf_at_RwdthThree =  { 100,   82.5, 90,   112.5, 125   },
   junicodevf_at_RwdthFour =   { 95,    75,   87.5, 107.5, 120   },
   junicodevf_at_RwdthFive =   { 90,    70,   77.5, 102.5, 115   },
   junicodevf_at_IwdthOne =    { 115,   95,   100,  125,   150   },
   junicodevf_at_IwdthTwo =    { 107.5, 85,   95,   120,   137.5 },
   junicodevf_at_IwdthThree =  { 100,   82.5, 90,   112.5, 125   },
   junicodevf_at_IwdthFour =   { 95,    75,   87.5, 107.5, 120   },
   junicodevf_at_IwdthFive =   { 90,    70,   77.5, 102.5, 115   },
   junicodevf_at_BwdthOne =    { 115,   95,   100,  125,   150   },
   junicodevf_at_BwdthTwo =    { 107.5, 85,   95,   120,   137.5 },
   junicodevf_at_BwdthThree =  { 100,   82.5, 90,   112.5, 125   },
   junicodevf_at_BwdthFour =   { 95,    75,   87.5, 107.5, 120   },
   junicodevf_at_BwdthFive =   { 90,    70,   77.5, 102.5, 115   },
   junicodevf_at_BIwdthOne =   { 115,   95,   100,  125,   150   },
   junicodevf_at_BIwdthTwo =   { 107.5, 85,   95,   120,   137.5 },
   junicodevf_at_BIwdthThree = { 100,   82.5, 90,   112.5, 125   },
   junicodevf_at_BIwdthFour =  { 95,    75,   87.5, 107.5, 120   },
   junicodevf_at_BIwdthFive =  { 90,    70,   77.5, 102.5, 115   }
}

function adjustweight(weight, adjustment)
   adjusted = weight + adjustment
   if adjusted > 800 then adjusted = 800 end
   if adjusted < 200 then adjusted = 200 end
   return adjusted
end

function adjustwidth(width, adjustment)
   adjusted = width + adjustment
   if adjusted > 125 then adjusted = 125 end
   if adjusted < 75 then adjusted = 75 end
   return adjusted
end

 function mkaltcommands()
   for k, v in pairs(alt_styles) do
      romdef = k .. "Def"
      romsizedef = k .. "SizeDef"
      italsizedef = k .. "ItalicSizeDef"
      romfeat = k .. "Features"
      romsizefeat = k .. "SizeFeatures"
      italsizefeat = k .. "ItalicSizeFeatures"
      if k == "Reg" then
         romdef = "RegDef"
         italsizedef = "ItalicSizeDef"
         romfeat = "RegularFeatures"
         romsizefeat = "RegularSizeFeatures"
         italsizefeat = "ItalicSizeFeatures"
      end
      tex.print("\\newcommand{\\" .. romdef .. "}{}")
      tex.print("\\newcommand{\\" .. romsizedef .. "}{SizeFeatures={{Size={5-}, RawFeature={axis={wght=" ..
              v[1] .. ",wdth=" .. v[2] .. "}}}}}")
      tex.print("\\DeclareOptionX{" .. romfeat .. "}{\\renewcommand*{\\" .. romdef .. "}{#1,}}")
      tex.print("\\DeclareOptionX{" .. romsizefeat .. "}{\\renewcommand*{\\" .. romsizedef .. "}{#1}}")
   end
end

function mkregweightcommands(wtidx,adjustment)
   for k, wt in pairs(regular_weights) do
      cmd, n = string.gsub(k, "_at_", "@")
      tex.print("\\newcommand*{\\" .. cmd .. "}{" .. adjustweight(wt[wtidx],adjustment) .. "}")
   end
end

function mkboldweightcommands(wtidx,adjustment)
   for k, wt in pairs(bold_weights) do
      cmd, n = string.gsub(k, "_at_", "@")
      tex.print("\\newcommand*{\\" .. cmd .. "}{" .. adjustweight(wt[wtidx],adjustment) .. "}")
   end
end

function mkwidthcommands(wdidx, adjustment)
   for k, wd in pairs(all_widths) do
      cmd, n = string.gsub(k, "_at_", "@")
      tex.print("\\newcommand*{\\" .. cmd .. "}{" .. adjustwidth(wd[wdidx],adjustment) .. "}")
   end
end

function mkfontcommands()
   for k, v in pairs(alt_styles) do
      defcmd = k .. "Def"
      defsizecmd = k .. "SizeDef"
      romfontcmd = "j" .. k
      italfontcmd = "j" .. k .. "Italic"
      if k == "Reg" then
         romfontcmd = "jRegular"
         italfontcmd = "jItalic"
      end
      tex.print("\\junicodevf@newfont{\\" .. romfontcmd .. "}{JunicodeVF}{\\" .. defcmd .. "}{\\" .. defsizecmd .. "}")
      tex.print("\\junicodevf@newfont{\\" .. italfontcmd .. "}{JunicodeVF-Italic}{\\" .. defcmd .. "}{\\" .. defsizecmd .. "}")
   end
end