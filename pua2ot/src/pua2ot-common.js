/* To use this file as a Node module, uncomment the following two lines */

// puaData = require("./PUA2OT_DATA-node.js")
// const PUA_DATA = puaData.data;

/*
    Also, you must add the following to the end of PUA2OT_DATA.js. Keep it
    in the same directory as this file.
*/

// module.exports = {
//     data: PUA_DATA
// };

/*
    Finally, follow the instructions at the bottom of this file.
*/

// ---------------------------------------------
// CONSTANT AND VARIABLE SETUP
// ---------------------------------------------

/*
    Chars with OT feature 'case' (utags c a) applied
    (*some are lc):

    E004 E00A E0EA E099 E03A E135 E22D E309 E317 E373
    *E4F0 *E516 *E737 EBEC F0C5 *F0BA
*/

    const COMPACT_PREF_LIST = [ "utag", "zwj", "otag", "entity" ];
    const LEGIBLE_PREF_LIST = [ "otag", "utag", "zwj", "entity" ];

    const UNICODE_HEXES = [ '0131', '1D00', '1D01', '0299', '1D04', '1D05', '1D06',
                            '1D07', 'A730', '0262', '029C', '026A', '1D0A', '1D0B',
                            '029F', '1D0D', '0274', '1D0F', '0276', '1D18', '0280',
                            'A731', '1D1B', '1D1C', '1D20', '1D21', '028F', '1D22',
                            '1D79', 'A77A', 'A77C', 'A783', 'A785', 'A787', 'A75A',
                            'A75B' ];

    const UTAG_DICT = { "a": "\u{0E0061}",
                        "b": "\u{0E0062}",
                        "c": "\u{0E0063}",
                        "d": "\u{0E0064}",
                        "e": "\u{0E0065}",
                        "f": "\u{0E0066}",
                        "g": "\u{0E0067}",
                        "h": "\u{0E0068}",
                        "i": "\u{0E0069}",
                        "j": "\u{0E006A}",
                        "k": "\u{0E006B}",
                        "l": "\u{0E006C}",
                        "m": "\u{0E006D}",
                        "n": "\u{0E006E}",
                        "o": "\u{0E006F}",
                        "p": "\u{0E0070}",
                        "q": "\u{0E0071}",
                        "r": "\u{0E0072}",
                        "s": "\u{0E0073}",
                        "t": "\u{0E0074}",
                        "u": "\u{0E0075}",
                        "v": "\u{0E0076}",
                        "w": "\u{0E0077}",
                        "x": "\u{0E0078}",
                        "y": "\u{0E0079}",
                        "z": "\u{0E007A}",
                        "0": "\u{0E0030}",
                        "1": "\u{0E0031}",
                        "2": "\u{0E0032}",
                        "3": "\u{0E0033}",
                        "4": "\u{0E0034}",
                        "5": "\u{0E0035}",
                        "6": "\u{0E0036}",
                        "7": "\u{0E0037}",
                        "8": "\u{0E0038}",
                        "9": "\u{0E0039}" };

const UTAG_ENTITY_DICT = { "a": "&__a;",
                           "b": "&__b;",
                           "c": "&__c;",
                           "d": "&__d;",
                           "e": "&__e;",
                           "f": "&__f;",
                           "g": "&__g;",
                           "h": "&__h;",
                           "i": "&__i;",
                           "j": "&__j;",
                           "k": "&__k;",
                           "l": "&__l;",
                           "m": "&__m;",
                           "n": "&__n;",
                           "o": "&__o;",
                           "p": "&__p;",
                           "q": "&__q;",
                           "r": "&__r;",
                           "s": "&__s;",
                           "t": "&__t;",
                           "u": "&__u;",
                           "v": "&__v;",
                           "w": "&__w;",
                           "x": "&__x;",
                           "y": "&__y;",
                           "z": "&__z;",
                           "0": "&__0;",
                           "1": "&__1;",
                           "2": "&__2;",
                           "3": "&__3;",
                           "4": "&__4;",
                           "5": "&__5;",
                           "6": "&__6;",
                           "7": "&__7;",
                           "8": "&__8;",
                           "9": "&__9;" };

const MARK_TAG_ENTITIES = { '\uf03a': '&_ansc;',
                            '\uf036': '&_an;',
                            '\uf038': '&_ar;',
                            '\uf130': '&_arsc;',
                            '\u{10fffc}': '&_as;',
                            '\uf013': '&_bsc;',
                            '\uf016': '&_dsc;',
                            '\uf135': '&_eogo;',
                            '\uf02f': '&_idotl;',
                            '\uf030': '&_j;',
                            '\uf031': '&_jdotl;',
                            '\uf01c': '&_ksc;',
                            '\uf136': '&_emac;',
                            '\uf01f': '&_munc;',
                            '\uf13e': '&_oogo;',
                            '\uf032': '&_oslash;',
                            '\uf13f': '&_omac;',
                            '\uf03e': '&_orr;',
                            '\uf03f': '&_oru;',
                            '\uf033': '&_q;',
                            '\uf040': '&_ru;',
                            '\u{10fffb}': '&_sa;',
                            '\uf02a': '&_tsc;',
                            '\uf02b': '&_y;',
                            '\uf03d': '&_thorn;' };

    

    let _prefList = COMPACT_PREF_LIST;

    let _defaultTags = { "ss10": 1, "cv69": 7 };

    let _keepUnicode = false

    let _nonWordTags = [ "ss04", "ss05", "ss06", "pcap", "smcp", "hlig", "case" ];

    let _language = "en";

    let _replaceMUFIEntities = true;

    let _utagLookup = UTAG_DICT;

    const variantLabels = [ "insular", "smallcap", "punctuation" ];

    let _variantPreferences = [];

    const phRegExp = new RegExp("%\\^%", "g");

/*
    Set up a dictionary of MUFI entities.
*/
let entityDict = {};
for (const pua_code in PUA_DATA) {
    const mufi_entity = PUA_DATA[pua_code].mntity;
    try {
        entityDict["\&" + mufi_entity + ";"] = String.fromCodePoint(parseInt(pua_code, 16));
    } catch (error) {
        ;
    }
}

/*
    Set up a dictionary for doing rapid searches for entities.
*/
const ENTITY_MAP = new RegExp(Object.keys(entityDict).join("|"), "g");

// ----------------------
//  OPTIONS
// ----------------------

let options = {}

Object.defineProperty(options, 'language', {
    get: function () {
        return _language;
    },
    set: function(l) {
        _language = l;
    }
} );

Object.defineProperty(options, 'utagEntities', {
    // Whether Unicode tags should be represented as entities.
    get: function() {
        return (_utagLookup === UTAG_ENTITY_DICT);
    },
    set: function(useEntities) {
        _utagLookup = useEntities ? UTAG_ENTITY_DICT : UTAG_DICT;
    }
} );

Object.defineProperty(options, 'utagLookup', {
    // Use to get or set the dictionary used for Unicode tags.
    get: function() {
        return _utagLookup;
    },
    set: function(ute) {
        if (ute in [UTAG_ENTITY_DICT, UTAG_DICT]) {
            _utagLookup = ute;
        }
    }
} );

Object.defineProperty(options, 'nonWordTags', {
    // Get or set the list of non-word tags.
    get: function() {
        return _nonWordTags;
    },
    set: function(nwt) {
        _nonWordTags = nwt;
    }
} );

Object.defineProperty(options, 'keepUnicode', {
    // A boolean property
    get: function() {
        return _keepUnicode;
    },
    set: function(ku) {
        _keepUnicode = ku;
    }
} );

Object.defineProperty(options, 'methodPriority', {
    // Choose between two predefined priority lists.
    get: function() {
        return (options.prefList === COMPACT_PREF_LIST) ? "compact" : "legible";
    },
    set: function(p) {
        if (p == "compact") {
            options.prefList = COMPACT_PREF_LIST;
        } else if (p == "legible") {
            options.prefList = LEGIBLE_PREF_LIST;
        }
    }
} );

Object.defineProperty(options, 'prefList', {
    // get or install a custom list of options for char replacement.
    get: function() {
        return _prefList;
    },
    set: function(pfl) {
        if (pfl.length == 4) {
            _prefList = pfl;
        }
    }
} );

Object.defineProperty(options, 'defaultTags', {
    // Get or set a list of tags that should always be on (aside from
    // the ones that OpenType recommends to be on by default, e.g. calt, liga).
    get: function() {
        return _defaultTags;
    },
    set: function(dft) {
        _defaultTags = dft;
    }
} );

Object.defineProperty(options, 'replaceMUFIEntities', {
    // Boolean. Whether to replace MUFI entities.
    get: function() {
        return _replaceMUFIEntities;
    },
    set: function(r) {
        _replaceMUFIEntities = r;
    }
} );

Object.defineProperty(options, 'variantPreferences', {
    // For dealing with classes of character that have more than
    // one possible base. The default choices maximize accessibility,
    // but the alternates may be good for particular purposes.
    // _variantPreferences is an array that has any of these values
    // in any order: Insular, Small caps, Punctuation, Marks,
    // Currency, Alpha.
    get: function() {
        return _variantPreferences;
    },
    set: function(v) {
        _variantPreferences = v;
    }
} );


// ---------------------
// FUNCTIONS
// ---------------------

/* 
    Converts all whitespace characters to spaces and changes &amp;
    to a plain ampersand.
*/
const cleanup_string = s => s.replace(/\s+/g, " ").trim().replace(/&amp;/g, '&');

/*
    Gets a count of the placeholder sequences ("%^%") in a string.
*/
const placeholderCount = (s) => (s.match(phRegExp) || []).length;

function featureString(tag_dict) {
    /*
    Converts a dict containing OpenType tags with
    indices into a string that can be used with CSS
    font-feature-settings.

    Args:
      tag_dict (dict): The dict to convert

    Returns:
      a string to be used with font-feature-settings
    */
    let result_string = "";
    for (const key in tag_dict) {
        let idx = tag_dict[key];
        if (result_string.length > 0) {
            result_string += ", ";
        }
        result_string = result_string + "'" + key + "'";
        if (idx > 1) {
            result_string = result_string + " " + idx.toString();
        }
    }
    return result_string;
}

function isMufiPua(ch) {
    /*
        Returns true if character is MUFI PUA or
        problematic Unicode (unless _keepUnicode
        is true).
    */
    let uni = ch.codePointAt(0);
    let hexstr = uni.toString(16).toUpperCase();
    if (hexstr.length == 3) {
        hexstr = "0" + hexstr;
    }
    if (UNICODE_HEXES.includes(hexstr)) {
        return !_keepUnicode;
    }
    return (hexstr in PUA_DATA);
}

function isFeatureOn(feature_dict, current_features) {
    /*
    Helper for resolveOtag.

    Args:
      feature_dict (dict): The feature to test

      current_features (dict): The features that are now on

    Returns:
      bool: Whether the feature is currently on
    */
    let tagname  = feature_dict.name;
    let tagindex = 1;
    if ("index" in feature_dict) {
        tagindex = feature_dict.index;
    }
    try {
        return (current_features[tagname] == tagindex);
    } catch (error) {
        ;
    }
    return false;
}

function mergeTags(base, taglist) {
    // Helper for resolveUtag(). Given a list of Unicode tags and a
    // string, this function substitutes pairs of tags for placeholders
    // (%^%) or, if there are no placeholders, appends them to the end
    // of the string.
    //
    // The number of tags in taglist should be double the number of
    // placeholders in the string. If it is shorter, the function
    // will repeat the last pair of tags until the placeholders are
    // all replaced.
    if (taglist.length >= 2) {
        let utagList = [];
        for (const idx in taglist) {
            utagList.push(options.utagLookup[taglist[idx].name]);
        }
        let phCount = placeholderCount(base)
        if (phCount == 0) {
            let utags = "";
            if (utagList.length >= 2) {
                for (idx in utagList) {
                    utags = utags + utagList[idx];
                }
            }
            base = base + utags;
        } else {
            while (phCount > 0) {
                let utags = utagList[0] + utagList[1];
                base = base.replace(/%\^%/, utags);
                phCount = placeholderCount(base);
                if (utagList.length >= 4) {
                    utagList.shift();
                    utagList.shift();
                }
            }
        }
    }
    return base;
}

function resolveOtag(otag, base, current_tags, current_pass=0, tags_name="tags") {
    /*
    An otag block specifies the OpenType features we need to turn
    on to represent this "base". These are added to the features
    that are already on, and then we call featureString() to
    generate the correctly formatted arguments for
    font_feature_settings, which we plug into a "style"
    attribute of a <span>. We wrap the "base" into the <span>.

    Args:
      otag (dict): A dictionary of OpenType features that should
      be set for the current character or ligature.

      base (string): The string to wrap in a <span>.

      current_tags (dict): The collection of tags that is currently
      on. We add to this as needed.

      current_pass (int): Whether we are in pass 0 or pass 1
      of the operation on the current word.

      tags_name: The name of a "tags" element inside the otag
      element.

    Returns:
      An array containing a formatted string and a count of word tags 
      needed (pass 0) or single-letter tags generated (pass 1).
    */
    let word_tag_count = 0;
    let loclbase = base;
    if ("base" in otag) {
        loclbase = otag.base;
    }
    loclbase = loclbase.replaceAll("%\^%", "");
    let taglist = otag[tags_name];
    // Pass 0 collects tags that can safely be applied to the whole word.
    if (current_pass == 0) {
        let target_is_word = true;
        for (const idx in taglist) {
            let tagname = taglist[idx].name;
            if (options.nonWordTags.includes(tagname)) {
                target_is_word = false;
            }
        }
        if (target_is_word) {
            for (const idx in taglist) {
                let tag_item = taglist[idx];
                if (!isFeatureOn(tag_item, current_tags)) {
                    let tagindex = 1;
                    if ("index" in tag_item) {
                        tagindex = tag_item.index;
                    }
                    current_tags[tag_item.name] = tagindex;
                    word_tag_count += 1;
                }
            }
            return [loclbase, word_tag_count];
        }
        return ["", word_tag_count];
    }
    // Will only execute the following if current_pass == 1. Pass 1 looks
    // for characters that should be enclosed in their own <span>
    // elements.
    let local_tag_count = 0;
    let target_is_char = false;
    let local_tags = structuredClone(current_tags);
    for (const idx in taglist) {
        if (options.nonWordTags.includes(taglist[idx].name)) {
            target_is_char = true;
            break;
        }
    }
    if (target_is_char) {
        for (const idx in taglist) {
            let tag_dict = taglist[idx];
            if (!isFeatureOn(tag_dict, current_tags)) {
                let tagindex = ("index" in tag_dict) ? tag_dict.index : 1;
                local_tags[tag_dict.name] = tagindex;
                local_tag_count += 1;
            }
        }
    }
    if (local_tag_count > 0) {
        let tag_string = featureString(local_tags) + ";";
        let open_tag = `<span style="font-feature-settings: ${tag_string}">`;
        let close_tag = "</span>";
        return [open_tag + loclbase + close_tag, local_tag_count];
    }
    return [loclbase, local_tag_count];
}

function resolveZwj(zwj, base, current_tags, current_pass=1) {
    /*
    If base is only one character, we can't do anything, so return it.
    If the zwj block has its own "base", just return it.
    Otherwise, place a zwj before any alphabetic character (Unicode
      categories Ll or Lu)
    A zwj block can have "tags". If this one does, just run resolveOtag
      on the processed string.

    Args:
      zwj (dict): The 'zwj' element in the dict for the current
      character.

      base (string): The string that we are formatting.

      current_tags (dict): Tags that are currently on. We pass this
      through to resolveOtag if we call it.

      current_pass (int): Which of the two passes for the current
      word we are in.

    Returns:
      str: The formatted string
    */
    let loclbase = base;
    if ("base" in zwj) {
        loclbase = zwj.base;
    }
    if (loclbase.length < 2) {
        return loclbase;
    }
    let result_string = "";
    let otag_result = [];
    for (const character of loclbase) {
        if (result_string.length > 0) {
            let isLetter = /\p{Letter}/u.test(character);
            if (isLetter) {
                result_string = result_string + "&#x200D;";
            }
        }
        result_string = result_string + character;
    }
    if ("utags" in zwj) {
        taglist = zwj.utags;
        if (taglist.length >= 2) {
            result_string = mergeTags(result_string, taglist);
        }
    }
    if ("otags" in zwj) {
        otag_result = resolveOtag(zwj, result_string, current_tags,
                                   current_pass);
    }
    if (otag_result > 0) {
        return otag_result[0];
    }
    return result_string;
}

function resolveUtag(utag, base, current_tags, current_pass=1) {
    /*
    utag places two characters from the Unicode tag range after
    the base. This is Junicode's alternate to cvNN for producing
    characters. It can greatly reduce the amount of html required
    in a file. If an OpenType tag is needed, just call
    resolveOtag. If there's an error we just return the base.

    Args:
      utag (dict): The 'utag' element in the dict for the current
      character.

      base (string): The string that we are formatting.

      current_tags (dict): Tags that are currently on. We pass this
      through to resolveOtag if we call it.

      current_pass (int): Which of the two passes for the current
      word we are in.

    Returns:
      str: The formatted string
    */
    let loclbase = base;
    let taglist = [];
    if ("base" in utag) {
        loclbase = utag.base;
    }
    taglist = utag.tags;
    if (taglist === undefined) {
        if (!("otags" in utag)) {
            return loclbase;
        }
        taglist = [];
    }
    loclbase = mergeTags(loclbase, taglist);
    if ("otags" in utag) {
        let otag_result = resolveOtag(utag, loclbase, current_tags,
                                       current_pass, "otags");
        return otag_result[0];
    }
    return loclbase;
}

function resolveEntity(entity, base, current_tags, current_pass=1) {
    /*
    Place an entity in the text in the place of the PUA
    character. Junicode uses this for combining marks that
    have only PUA code points.

    Args:
      entity (dict): The 'entity' element in the dict for the current
      character.

      base (string): The string that we are formatting.

      current_tags (dict): Tags that are currently on. We pass this
      through to resolveOtag if we call it.

      current_pass (int): Which of the two passes for the current
      word we are in.

    Returns:
      str: The formatted string
    */
    let loclbase = ("base" in entity) ? entity.base : base;
    if ("tags" in entity) {
        let otag_result = resolveOtag(entity, loclbase, current_tags,
                                       current_pass);
        loclbase = otag_result[0];
    }
    return loclbase;
}

function getMethodBlock(char_block) {
    /*
    For finding the method to use on a character.
    Note: returns None if none found.

    Args:
      char_block (dict): The character block in which to search for
      a suitable conversion method for the current character.

    Returns:
      tuple: a string for the method to be used and a dict with
      the conversion data.
    */
    let preferred_block = null;
    let selected_type = null;
    for (const idx in options.prefList) {
        let tag = options.prefList[idx];
        if (tag in char_block) {
            preferred_block = char_block[tag];
            selected_type = tag;
            break;
        }
    }
    return [selected_type, preferred_block];
}

function replaceEntities(text_buffer) {
    /*
        Run to replace MUFI entities with PUA code points. Uses
        a regex method that's said to be efficient (important,
        since we're doing 850+ searches).
    */
    const result = text_buffer.replace(ENTITY_MAP, function(matched) {
        return entityDict[matched];
    } );
    return result;
}

function getLangBlock(codepoint_entry) {
    // To have different method blocks for different languages.
    lang = options.language;
    if (lang in codepoint_entry.lang){
        return codepoint_entry.lang[lang]
    } else if ("other" in codepoint_entry.lang) {
        return codepoint_entry.lang["other"]
    }
    // This would point to a problem in the database
    return null;
}

function getVarBlock(codepoint_entry) {
    // To have different method blocks depending on a choice of
    // variant groups, e.g. "insular" for using insular Unicodes
    // instead of a-z.
    for (v in options.variantPreferences) {
        vv = options.variantPreferences[v];
        if (vv in codepoint_entry.var) {
            return codepoint_entry.var[vv]
        }
    }
    if ("other" in codepoint_entry.var) {
        return codepoint_entry.var["other"];
    }
    return null;
}

function convert(text_buffer, repl_ent = true, code_on = false) {
    /*
        Runs the program. Splits the text_buffer into a list of
        words and processes each word in two passes
    */
    let processed_word_list = [];

    if (options.replaceMUFIEntities && repl_ent) {
        text_buffer = replaceEntities(text_buffer);
    }
    let word_list = text_buffer.split(" ");
    for (const idx in word_list) {
        let _word = word_list[idx];
        if (_word.length == 0) {
            continue;
        }
        let current_tags = structuredClone(options.defaultTags);
        let tag_stack = [structuredClone(current_tags)];
        let result_string = "";
        let word_tag_count = 0;
        let word_string = "";
        for (const this_pass in [0, 1]) {
            if (this_pass == 0) {
                word_string = _word;
            } else {
                word_string = result_string;
                result_string = "";
            }
            // work through the word character by character.
            for (const _char of word_string) {
                let uni = _char.codePointAt(0);
                let hexstr = uni.toString(16).toUpperCase();
                if (hexstr.length == 3) {
                    hexstr = "0" + hexstr;
                }
                if (options.keepUnicode && UNICODE_HEXES.includes(hexstr)) {
                    result_string = result_string + _char;
                    continue;
                }
                if (hexstr in PUA_DATA) {
                    let codepoint_entry = PUA_DATA[hexstr];
                    if ("lang" in codepoint_entry) {
                        codepoint_entry = getLangBlock(codepoint_entry);
                    }
                    if ("var" in codepoint_entry) {
                        codepoint_entry = getVarBlock(codepoint_entry);
                    }
                    if (codepoint_entry == null) {
                        continue;
                    }
                    let current_base = codepoint_entry.base;
                    let method_info = getMethodBlock(codepoint_entry);
                    let method_type = method_info[0];
                    let method_block = method_info[1];
                    let tmpstr = current_base;
                    if (method_type == "otag") {
                        let tag_info = resolveOtag(method_block, current_base, current_tags,
                                                    this_pass);
                        tmpstr = tag_info[0];
                        let tag_count = tag_info[1];
                        if (this_pass == 0) {
                            word_tag_count += tag_count;
                        }
                        if (tmpstr.length == 0) {
                            tmpstr = _char;
                        }
                    }
                    else if (method_type == "zwj") {
                        tmpstr = resolveZwj(method_block, current_base, current_tags,
                                             this_pass);
                    }
                    else if (method_type == "utag") {
                        tmpstr = resolveUtag(method_block, current_base, current_tags,
                                              this_pass);
                    }
                    else if (method_type == "entity") {
                        let entity_base = current_base;
                        if (hexstr in MARK_TAG_ENTITIES) {
                            entity_base = MARK_TAG_ENTITIES[hexstr];
                        }
                        tmpstr = resolveEntity(method_block, entity_base, current_tags,
                                                this_pass);
                    }
                    try {
                        result_string = result_string + tmpstr
                    } catch (error) {
                        console.error("passing after TypeError with " + hexstr);
                    }
                } else {
                    result_string = result_string + _char;
                }
            }
        }

        let whole_word_str = result_string;
        if (word_tag_count > 0) {
            let word_tag_content = featureString(current_tags) + ";";
            let tag_open = "<span style=\"font-feature-settings: ";
            let tag_close = "\">";
            whole_word_str = tag_open + word_tag_content + tag_close + result_string + "</span>";
        }
        processed_word_list.push(whole_word_str);
        current_tags = tag_stack.pop();
    }

    let processed_text = processed_word_list.join(" ");
    if (code_on) {
        processed_text = processed_text.replaceAll("<", "&lt;");
        processed_text = processed_text.replaceAll(">", "&gt;");
    }

    return processed_text;
}

/* To use this file as a Node module, uncomment the following lines. */

// module.exports = {
//     options: options,
//     cleanup_string: cleanup_string,
//     convert: convert
// };
