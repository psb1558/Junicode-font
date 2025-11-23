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

    /**
     * Preference list for the "compact" style of markup.
     */
    const COMPACT_PREF_LIST = [ "utag", "zwj", "enla", "otag", "entity" ];

    /**
     * Preference list for the "legible" style of markkup.
     */
    const LEGIBLE_PREF_LIST = [ "enla", "otag", "utag", "zwj", "entity" ];

    /**
     * Defines Unicodes for problematic Unicodes (those that look like variants
     * on letters of the alphabet but are not).
     */
    const UNICODE_HEXES = [ '0131', '0262', '026A', '0274', '0276', '0280', '028F',
                            '029C', '0299', '029F', '1D00', '1D01', '1D04', '1D05',
                            '1D06', '1D07', '1D0A', '1D0B', '1D0D', '1D0F', '1D18',
                            '1D1B', '1D1C', '1D20', '1D21', '1D22', '1D79', '2E4A',
                            '2E53', '2E54', 'A730', 'A731', 'A75A', 'A75B', 'A779',
                            'A77A', 'A77C', 'A77D', 'A782', 'A783', 'A784', 'A785',
                            'A786', 'A787', 'A7AF' ];

    /**
     * The default lookup for Unicode tags. This replaces directly with tag characters.
     */
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

/**
 * Lookup for replacing letters and number with entities. This makes them
 * visible and easy to debug.
 */
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

/**
 * Entities for combining marks.
 */
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

    /*
        For internal use. No need to document.
    */
    let _prefList = COMPACT_PREF_LIST;

    let _defaultTags = { "ss10": 1, "cv69": 7 };

    let _keepUnicode = false

    let _nonWordTags = [ "ss04", "ss05", "ss06", "pcap", "smcp", "hlig", "case", "ENLA" ];

    let _language = "en";

    let _replaceMUFIEntities = true;

    let _utagLookup = UTAG_DICT;

    let _charSkip = [];

    //const variantLabels = [ "insular", "smallcap", "punctuation", "alpha", "mark", "currency" ];

    let _basePreferences = [];

    let _enlargedScale = 32;

    const phRegExp = new RegExp("%\\^%", "g");

/**
 * Object mapping MUFI PUA hexes to entries in the database. We build this from the
 * database rather than coding it into this file.
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

/**
 * RegExp for doing rapid searches for entities.
 */
const ENTITY_MAP = new RegExp(Object.keys(entityDict).join("|"), "g");

// ----------------------
//  OPTIONS
// ----------------------

/**
 * Stores options for controlling the behavior of this script.
 * 
 * @property {string} language - The language of the text being converted.
 * @property {boolean} utagEntities - Whether to substitute entities (instead of characters) for Unicode tags.
 * @property {string[]} nonWordTags - Lists OpenType features that can be applied only to letters, not to words.
 * @property {boolean} keepUnicode - Whether to keep problematic Unicodes.
 * @property {string} methodPriority - Selects a predefined priority list: "compact" or "legible".
 * @property {string[]} prefList - Use to supply a custom priority list.
 * @property {{string: number}} defaultTags - OpenType features that are always on.
 * @property {string[]} basePreferences - Choose among different bases for certain categories of character.
 * @property {boolean} replaceMUFIEntities - Whether to search and replace MUFI entities.
 * @property {number} enlargedScale - Scale (0-100) for Enlarge axis.
 * @property {string[]} charSkip - List of characters to skip (not convert).
 * @type {{string: string | boolean | string[] | object}}
 */
let options = {}

Object.defineProperty(options, 'charSkip', {
    get: () => _charSkip,
    set: a => _charSkip = a
} );

Object.defineProperty(options, 'language', {
    get: () => {return _language},
    set: l => _language = l
} );

Object.defineProperty(options, 'utagEntities', {
    // true if entity dictionary is being used instead of the regular one.
    get: () => _utagLookup === UTAG_ENTITY_DICT,
    set: useEntities => _utagLookup = useEntities ? UTAG_ENTITY_DICT : UTAG_DICT
} );

Object.defineProperty(options, 'utagLookup', {
    // Get or set the dictionary used for Unicode tags. Could be used for a
    // custom one.
    get: () => _utagLookup,
    set: ute => {if (ute in [UTAG_ENTITY_DICT, UTAG_DICT]) {_utagLookup = ute}}
} );

Object.defineProperty(options, 'nonWordTags', {
    // Get or set the list of non-word tags. Just an array of OpenType
    // feature tags.
    get: () => _nonWordTags,
    set: nwt => _nonWordTags = nwt
} );

Object.defineProperty(options, 'keepUnicode', {
    // A boolean property. Either we replace problem Unicodes or we don't.
    get: () => _keepUnicode,
    set: ku => _keepUnicode = ku
} );

Object.defineProperty(options, 'methodPriority', {
    // Choose between two predefined priority lists.
    get: () => options.prefList === COMPACT_PREF_LIST ? "compact" : "legible",
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
    get: () => _prefList,
    set: pfl => {if (pfl.length == 5) {_prefList = pfl}}
} );

Object.defineProperty(options, 'defaultTags', {
    // Get or set a list of tags that should always be on (aside from
    // the ones that OpenType recommends to be on by default, e.g. calt, liga).
    get: () => _defaultTags,
    set: dft => _defaultTags = dft
} );

Object.defineProperty(options, 'replaceMUFIEntities', {
    // Boolean. Whether to replace MUFI entities.
    get: () => _replaceMUFIEntities,
    set: r => _replaceMUFIEntities = r
} );

Object.defineProperty(options, 'basePreferences', {
    // For dealing with classes of character that have more than
    // one possible base. The default choices maximize accessibility,
    // but the alternates may be good for particular purposes.
    // _basePreferences is an array that has any of these values
    // in any order: insular, smallcap, punctuation, mark,
    // currency, alpha.
    get: () => _basePreferences,
    set: v => _basePreferences = v
} );

Object.defineProperty(options, 'enlargedScale', {
    get: () => _enlargedScale,
    set: s => _enlargedScale = s
} );

// ---------------------
// FUNCTIONS
// ---------------------

/**
 * Gets the length of a string, accounting correctly for characters
 * that consist of more than one UTF-16 code unit.
 * 
 * @param {string} s - The string whose length we want.
 * @return {number} Length of the string s.
 */
const realLength = s => [...s].length;

/**
 *  Converts all whitespace characters to spaces and changes ampersand
 *  entity to a plain ampersand.
 * 
 *  @param {string} s - The string to clean up.
 *  @return {string} The cleaned up string.
*/
const cleanup_string = s => s.replace(/\s+/g, " ").trim().replace(/&amp;/g, '&');

/**
 * Gets a count of the placeholder sequences ("%^%") in a string.
 * 
 * @param {string} s - The string to survey
 * @return {number} The number of placeholders in the string.
*/
const placeholderCount = s => (s.match(phRegExp) || []).length;

/**
 * Converts a hexadecimal string to an integer.
 * 
 * @param {string} h - Hexadecimal number (as string).
 * @returns {number} Integer derived from the hex sring.
 */
const hex2int = h => parseInt(h, 16);

/**
 * Converts an integer to a hexadecimal string.
 * 
 * @param {number} i - The number to be converted.
 * @returns {string} Hexadecimal representation of the number.
 */
function int2hex(i) {
    let h = i.toString(16).toUpperCase();
    while (h.length < 4) {
        h = '0' + h;
    }
    return h;
}

/**
 * Converts an object containing OpenType tags with indices into a
 * string that can be used with CSS font-feature-settings.
 * 
 * @param {{string: number}} Object containing tags and indices.
 * @return {string} A string that can be used with CSS font-feature-settings.
 */
function featureString(tag_dict) {
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

/**
 * Tests whether a character is MUFI PUA or problematic Unicode
 * (note that the return value may depend on the value of option.keepUnicodes).
 * 
 * @param {string} ch - the character to test.
 * @return {boolean} True if character is MUFI PUA or problematic Unicode.
 */
function isMufiPua(ch) {
    const hexstr = int2hex(ch.codePointAt(0));
    if (_charSkip.includes(hexstr)) {
        return false;
    }
    if (UNICODE_HEXES.includes(hexstr)) {
        return !_keepUnicode;
    }
    return (hexstr in PUA_DATA);
}

/**
 * Tests whether a feature is on. This is a helper for resolveOtag().
 * 
 * @param {{string: number}} feature_dict - one-entry Object with the feature we're testing for.
 * @param {{string: number}} current_features - features currently on.
 * @return {boolean} True if the feature is currently on.
 */
function isFeatureOn(feature_dict, current_features) {
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

/**
 * Helper for resolveUtag(), applyEnlargeAxis(), and resolveZwj().
 * Given a list of 
 * Unicode tags and a string, this function substitutes pairs of 
 * tags for placeholders (%^%) or, if there are no placeholders, 
 * appends them to the end of the string.
 * The number of tags in taglist should be double the number of
 * placeholders in the string. If it is shorter, the function
 * will repeat the last pair of tags until the placeholders are
 * all replaced.
 * 
 * @param {string} base - The string that forms the basis of the
 * output of resolveUtag() or resolveZwj().
 * @param {array} taglist - Array of one-character strings representing utags.
 * @return {string} The base with tags merged in.
 */
function mergeTags(base, taglist) {
    if (taglist.length >= 2) {
        let utagList = [];
        for (const idx in taglist) {
            utagList.push(_utagLookup[taglist[idx].name]);
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

/**
 * Applies the ENLA axis to a base and returns the necessary
 * markup.
 * 
 * @param {object} enla - Information for applying the ENLA axis.
 * @param {string} base - The base for this operation.
 * @param {array} current_tags - current active OT tags (not used).
 * @returns {string} string with base and markup.
 */
function applyEnlargeAxis(enla, base, current_tags) {
    let loclbase = ("base" in enla) ? enla.base : base;
    if ("utags" in enla) {
        taglist = enla.utags;
        if (taglist.length >= 2) {
            loclbase = mergeTags(loclbase, taglist);
        }
    }
    t = `<span style="font-variation-settings: 'ENLA' ${_enlargedScale}">`;
    return t + loclbase + "</span>";
}

/**
 * An otag block specifies the OpenType features we need to activate
 * to represent this "base". These are added to the features
 * that are already on, and then we call featureString() to
 * generate the correctly formatted arguments for
 * font_feature_settings, which we plug into a "style"
 * attribute of a &lt;span&gt;. We wrap the "base" into the &lt;span&gt;.
 * 
 * @param {object} otag - The block of json data we are using for the transformation.
 * @param {string} base - The letter(s) we are transforming.
 * @param {array} current_tags - array of OpenType features currently on.
 * @param {number} current_pass - 0 for first pass, 1 for second.
 * @param {string} tags_name - name of the tags key to look for
 * @return {array} - Array with converted base and number of replacements made.
 */
function resolveOtag(otag, base, current_tags, current_pass=0, tags_name="tags") {
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
            if (_nonWordTags.includes(tagname)) {
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
        if (_nonWordTags.includes(taglist[idx].name)) {
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

/**
 * Forms a ligature by inserting a zero-width joiner (zwj) before each
 * alphabetic character (Unicode categories Ll or Lu). If the zwj block
 * has a "utags" key, merge the utags into the base. A zwj block can
 * also have a "tags" section: if so, run resolveOtag after the other
 * processing.
 * 
 * @param {object} zwj - The block of json data we are using for the transformation.
 * @param {string} base  - The letter(s) we are transforming.
 * @param {array} current_tags - array of OpenType features currently on.
 * @param {number} current_pass - 0 for first pass, 1 for second.
 * @return {string} - the converted base.
 */
function resolveZwj(zwj, base, current_tags, current_pass=1) {
    const loclbase = ("base" in zwj) ? zwj.base : base;
    /* let loclbase = base;
    if ("base" in zwj) {
        loclbase = zwj.base;
    } */
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

/**
 * Utags are Junicode's alternative to cvNN for producing
 * characters. It can greatly reduce the amount of html required
 * in a file. If an OpenType tag is needed, just call
 * resolveOtag. If there's an error we just return the base.
 * 
 * @param {object} utag - The block of json data we are using for the transformation.
 * @param {string} base - The letter(s) we are transforming.
 * @param {array} current_tags - array of OpenType features currently active.
 * @param {number} current_pass - 0 for first pass, 1 for second.
 * @return {string} - the converted base.
 */
function resolveUtag(utag, base, current_tags, current_pass=1) {
    let loclbase = "base" in utag ? utag.base : base;
    /* let loclbase = base;
    let taglist = [];
    if ("base" in utag) {
        loclbase = utag.base;
    } */
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

/**
 * Place a Junicode (not MUFI) entity in the text in the place of the PUA
 * character. Junicode uses this for combining marks that
 * have only PUA code points.
 * 
 * @param {object} entity - The block of json data we are using for the transformation.
 * @param {string} base - The letter(s) we are transforming.
 * @param {array} current_tags - array of OpenType features currently active.
 * @param {number} current_pass - 0 for first pass, 1 for second.
 * @return {string} - the converted base.
 */
function resolveEntity(entity, base, current_tags, current_pass=1) {
    let loclbase = ("base" in entity) ? entity.base : base;
    if ("tags" in entity) {
        let otag_result = resolveOtag(entity, loclbase, current_tags,
                                       current_pass);
        loclbase = otag_result[0];
    }
    return loclbase;
}

/**
 * A helper for convert(). This function locates and returns the
 * json block needed for the next method.
 * 
 * @param {*} char_block {object} - The character block to search for
 * a suitable conversion method for the current character.
 * @return {array} - 0: a string with the selected type; 1: section
 * of the character block needed for pending operation.
 */
function getMethodBlock(char_block, h) {
    let preferred_block = null;
    let selected_type = null;
    for (const idx in _prefList) {
        let tag = _prefList[idx];
        if (tag in char_block) {
            preferred_block = char_block[tag];
            selected_type = tag;
            break;
        }
    }
    return [selected_type, preferred_block];
}

/**
 * Run to replace MUFI entities with PUA code points. Uses
 * a regex method that's said to be efficient (important,
 * since we're doing 850+ searches).
 * 
 * @param {string} text_buffer - The text in which to perform a 
 * search-and-replace operation substituting characters for MUFI
 * entitys.
 * @return {string} the text_buffer after the search-and-replace
 */
function replaceEntities(text_buffer) {
    return text_buffer.replace(ENTITY_MAP, matched => entityDict[matched]);
}

/**
 * Lets us define different method blocks for different languages.
 * Not currently used, but ready!
 * 
 * @param {object} codepoint_entry - block in which to search for the
 * currently active language.
 * @return {object} The block for the selected language, or null if the function has failed.
 */
function getLangBlock(codepoint_entry) {
    lang = _language;
    return lang in codepoint_entry.lang ? codepoint_entry.lang[lang] : codepoint_entry.lang["other"];
}

/**
 * Allows you to select alternate bases for certain categories of character: number,
 * insular, alpha, currency, punctuation, mark, smallcap.
 * 
 * @param {object} codepoint_entry - The json block for the current character
 * @return {object} - The block for the selected base, or null if the function has failed.
 */
function getVarBlock(codepoint_entry) {
    for (const v in _basePreferences) {
        const vv = _basePreferences[v];
        if (vv in codepoint_entry.var) {
            return codepoint_entry.var[vv];
        }
    }
    if ("other" in codepoint_entry.var) {
        return codepoint_entry.var["other"];
    }
    return null;
}

/**
 * Runs the program. Splits the text_buffer into an array of
 * words and processes each word in two passes. Then
 * reassembles text from array (space-separated).
 * 
 * @param {string} text_buffer - The text to be converted. This can contain multiple
 * and nested HTML elements.
 * @param {boolean} repl_ent - Whether to replace MUFI entities before running the rest of the function.
 * @param {boolean} code_on - In the GUI flavor, whether the "Show code" box is checked, and the
 * underlying code is showing in the "Destination" box. In embedded and Node flavors you must
 * also set options.replaceMUFIEntities.
 * @return {string} The processed text.
 */
function convert(text_buffer, repl_ent = true, code_on = false) {
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
                const hexstr = int2hex(_char.codePointAt(0));
                if (_charSkip.includes(hexstr)) {
                    result_string = result_string + _char;
                    continue;
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
                    let method_info = getMethodBlock(codepoint_entry, hexstr);
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
                    else if (method_type == "enla") {
                        tmpstr = applyEnlargeAxis(method_block, current_base, current_tags);
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
