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

names = {
   {"Regular",    "MainRegSizeDef"},
   {"Italic",     "MainItalicSizeDef"},
   {"Bold",       "MainBoldSizeDef"},
   {"BoldItalic", "MainBoldItalicSizeDef"}
}

main_regular_styles = {
   {size=8.5, wght=490,  wdth=115 },
   {size=9.5, wght=472,  wdth=112 },
   {size=10.5, wght=454, wdth=109 },
   {size=11.5, wght=436, wdth=106 },
   {size=12.5, wght=418, wdth=103 },
   {size=13.5, wght=400, wdth=100 },
   {size=14.5, wght=390, wdth=99  },
   {size=16.5, wght=380, wdth=98  },
   {size=19.5, wght=370, wdth=97  },
   {size=22.5, wght=360, wdth=96  },
   {size=22.5, wght=350, wdth=95  },
}

main_bold_styles = {
   {size=8.5,  wght=790, wdth=115 },
   {size=9.5,  wght=772, wdth=112 },
   {size=10.5, wght=754, wdth=109 },
   {size=11.5, wght=736, wdth=106 },
   {size=12.5, wght=718, wdth=103 },
   {size=13.5, wght=700, wdth=100 },
   {size=14.5, wght=690, wdth=99  },
   {size=16.5, wght=680, wdth=98  },
   {size=19.5, wght=670, wdth=97  },
   {size=22.5, wght=660, wdth=96  },
   {size=22.5, wght=650, wdth=95  },
}

-- 1=Regular, 2=Light, 3=Medium
main_regular_autoadjustment = {0, -100, 100}

-- 1=Bold, 2=SemiBold
main_bold_autoadjustment = {0, -100}

-- 1=Regular, 2=Condensed, 3=SemiCondensed, 4=SemiExpanded, 5=Expanded
main_width_autoadjustment = { 0, -25, -12.5, 12.5, 25 }

function adjustweight(weight, adjustment)
   adjusted = weight + adjustment
   if adjusted > 700 then adjusted = 700 end
   if adjusted < 300 then adjusted = 300 end
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
      tex.print("\\DeclareOptionX{" .. romsizefeat .. "}{\\renewcommand*{\\" .. romsizedef .. "}{\\directlua{mksizecommand({#1})}}}")
      tex.print("\\DeclareOptionX{" .. italsizefeat .. "}{\\renewcommand*{\\" .. romsizedef .. "}{\\directlua{mksizecommand({#1})}}}")
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

function mksizecommand_helper(sizetable)
   result = "Nothing yet"
   if #sizetable > 0 then
       result = "SizeFeatures={"
       lastsize = 0
       for i, v in ipairs(sizetable) do
           if v["size"] then
               axiscount = 0
               sizeitem = "{Size={"
               currentsize = v["size"]
               csnum = v["size"]
               if i == #sizetable then                   -- last array in the list
                   currentsize = currentsize .. "-"
               elseif lastsize == 0 then                 -- first array in the list
                   currentsize = "-" .. currentsize
               else                                      -- an intermediate array
                   currentsize = lastsize .. "-" .. currentsize
               end
               lastsize = csnum
               sizeitem = sizeitem .. currentsize .. "},RawFeature={axis={"
               if v["wght"] then
                   sizeitem = sizeitem .. "wght=" .. v["wght"]
                   axiscount = axiscount + 1
               end
               if v["wdth"] then
                   if axiscount >= 1 then sizeitem = sizeitem .. "," end
                   sizeitem = sizeitem .. "wdth=" .. v["wdth"]
                   axiscount = axiscount + 1
               end
               if v["ENLA"] then
                   if axiscount >= 1 then sizeitem = sizeitem .. "," end
                   sizeitem = sizeitem .. "ENLA=" .. v["ENLA"]
               end
               sizeitem = sizeitem .. "}}},"
               result = result .. sizeitem
           end
       end
       result = result .. "}"
       return result
   end
end

function mksizecommand(sizetable)
   tex.print(mksizecommand_helper(sizetable))
end

function mkmainfontcommand(name_idx, wght_option, wght_adjust, wdth_option, wdth_adjust)
   main_style_name = names[name_idx][1]
   command_name    = names[name_idx][2]
   style_table = main_regular_styles
   wght_autoadjust = main_regular_autoadjustment[wght_option]
   if string.find(main_style_name, "Bold") then
      style_table = main_bold_styles
      wght_autoadjust = main_bold_autoadjustment[wght_option]
   end
   sizetable = {}
   for i, v in ipairs(style_table) do
      sizetable[i] = {}
      sizetable[i]["size"] = v["size"]
      sizetable[i]["wght"] = adjustweight(v["wght"] + wght_autoadjust, wght_adjust)
      sizetable[i]["wdth"] = adjustwidth(v["wdth"] + main_width_autoadjustment[wdth_option], wdth_adjust)
   end
   tex.print("\\newcommand{\\" .. command_name .. "}{" .. mksizecommand_helper(sizetable) .. "}")
end
