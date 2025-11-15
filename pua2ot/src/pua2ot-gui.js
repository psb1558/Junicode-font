/*
    Load this after pua2ot-common.js.
*/

// ------------------------
// SET UP GLOBAL VARIABLES
// ------------------------

/*
    Whether "Show code" is currently active.
*/
let codeOn = false;

/*
    Here's where we keep the text we're working with. Don't edit
    these, but only a copy.
*/
let htmlBackup = document.createElement('div');
let textBackup = "";

/*
    Keep original html file here
*/
let htmlDoc = null;

// ---------------------------------------------
// END OF VARIABLE SETUP. FUNCTIONS BEGIN.
// ---------------------------------------------

/**
 * Tests whether the text we're working with is plain text or html.
 * @returns {boolean} result of the test.
 */
const isHTMLType = () => htmlDoc != null;

/**
 * Prepares a string for export by doing some replacements and
 * wrapping it in a &lt;div&gt; that turns on the default OpenType
 * features.
 * @returns {string} The processed string.
 */
function exportString() {
    /*
        Prepare text for export; wrap it in a div that turns on 
        default features.
    */
    let text = destElement.innerHTML;
    if (text.search("&amp;")) {
        text = text.replaceAll("&amp;", "&");
    }
    fString = featureString(options.defaultTags);
    const div_open =  "<div style=\"font-feature-settings: " + fString + ";\">\n";
    const div_close = "\n</div>";
    text = div_open + text + div_close;
    if (isHTMLType()) {
        htmlDoc.body.innerHTML = text;
        return htmlDoc.documentElement.outerHTML;
    }
    return text;
}

/**
 * Prepares and downloads a file containing the converted text. This will
 * be a plain text file (with html markup) if the original file was plain,
 * and an html file if the original was html.
 */
function saveFile() {
    const blob = new Blob([exportString()], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (isHTMLType()) ? 'pua2ot_download.html' : 'pua2ot_download.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Adds markup to the source text (from a text file) to show which characters 
 * are being replaced (by default the PUA characters, but usually also the 
 * problematic Unicodes).
 */
function markPuaCharsText() {
    let found_PUA = false;
    let resultStr = "";
    for (var ch of textBackup) {
        if (isMufiPua(ch)) {
            found_PUA = true;
            resultStr += ("<span class='pua'>" + ch + "</span>");
        } else {
            resultStr += ch;
        }
    }
    if (found_PUA) {
        sourceElement.innerHTML = resultStr;
    }
}

/**
 * Restore text source to cancel highlighting of PUA chars.
 */
const restoreSourceText = () => sourceElement.innerText = textBackup;

/**
 * Adds markup to the source text (from an html file) to show which characters 
 * are being replaced (by default the PUA characters, but usually also the 
 * problematic Unicodes).
 */
function markPuaCharsHtml() {
    let replacementList = [];

    const clonedDiv = htmlBackup.cloneNode(true);

    const walker = document.createTreeWalker(
        clonedDiv,
        NodeFilter.SHOW_TEXT,
        null
    )
    let node;
    let PUA_found = false;
    while ((node = walker.nextNode())) {
        let locl_found = false;
        let nv = node.nodeValue.trim();
        if (nv.length > 0) {
            let resultString = "";
            for (var ch of nv) {
                if (isMufiPua(ch)) {
                    PUA_found = locl_found = true;
                    resultString += ("<span class='pua'>" + ch + "</span>");
                } else {
                    resultString += ch;
                }
            }
            if (locl_found) {
                const newNode = document.createElement('span');
                newNode.innerHTML = " " + resultString + " ";
                replacementList.push([node, newNode]);
            }
        }
    }
    if (PUA_found) {
        for (var idx in replacementList) {
            const replacementItem = replacementList[idx];
            replacementItem[0].replaceWith(replacementItem[1]);
        }
        sourceElement.innerHTML = clonedDiv.innerHTML;
    }
}

/**
 * Restore HTML source to cancel highlighting of PUA chars.
 */
const restoreSourceHtml = () => sourceElement.innerHTML = htmlBackup.innerHTML;

/**
 * 
 * @param {boolean} repl_ent - Whether to replace the MUFI entities in the text before
 * other processing.
 */
const plainTextCaller = (repl_ent) => destElement.innerHTML = convert(textBackup, repl_ent, codeOn);

/**
 * Calls convert() for an HTML buffer.
 * @param {boolean} repl_ent - Whether to replace the MUFI entities in the text before
 * other processing.
 */
function htmlCaller(repl_ent) {
    console.time("PUATimer");

    let replacementList = [];

    const clonedDiv = htmlBackup.cloneNode(true);

    const walker = document.createTreeWalker(
                        clonedDiv,
                        NodeFilter.SHOW_TEXT,
                        null
                    )
    while (destElement.firstChild) {
        destElement.removeChild(destElement.firstChild);
    }
    let node;
    while ((node = walker.nextNode())) {
        let nv = node.nodeValue.trim();
        if (nv.length > 0) {
            const newNode = document.createElement('span');
            newNode.innerHTML = " " + convert(nv, repl_ent, codeOn) + " ";
            replacementList.push([node, newNode]);
        }
    }
    for (var idx in replacementList) {
        const replacementItem = replacementList[idx];
        replacementItem[0].replaceWith(replacementItem[1]);
    }
    destElement.innerHTML = clonedDiv.innerHTML;
    console.timeEnd("PUATimer");
}

/**
 * Display contents of "body" element of html file in source box.
 */
function displayInSourceBox() {
    sourceElement.style.whiteSpace = "normal";
    sourceElement.style.wordWrap = "break-word";
    sourceElement.innerHTML = htmlBackup.innerHTML = htmlDoc.body.innerHTML;
}

/**
 * Copy text to clipboard. We display a message because there is 
 * otherwise no feedback.
 * @param {string} text - The text to copy.
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        alert("Text copied");
    } catch (err) {
        alert("Failed to copy text");
    }
}

/**
 * Loads a file into the source box.
 * @param {string} f - Name of a file to load.
 */
function loadFile(f) {
        const reader = new FileReader();
        reader.onload = () => {
            let text = reader.result;
            if (options.replaceMUFIEntities) {
                text = replaceEntities(text)
            }
            /*
                These lines detect whether loaded file is html by parsing it.
                If it is html, we need to grab the body's text nodes and
                convert them one by one.
            */
            const parser = new DOMParser();
            htmlDoc = parser.parseFromString(text, 'text/html');
            const hasError = htmlDoc.querySelector('parsererror');
            const hasElements = htmlDoc.body.children.length > 0;
            if (!hasError && hasElements) {
                textCaller = htmlCaller;
                puaMarker = markPuaCharsHtml;
                restoreSource = restoreSourceHtml;
                puaWidget.checked = false;
                displayInSourceBox(htmlDoc);
            } else {
                htmlDoc = null;
                textCaller = plainTextCaller;
                puaMarker = markPuaCharsText;
                restoreSource = restoreSourceText;
                text = cleanup_string(text);
                puaWidget.checked = false;
                sourceElement.innerText = textBackup = text;
            }
            textCaller(!codeOn);
        };
        reader.readAsText(f);
}

let textCaller = plainTextCaller;
let puaMarker = markPuaCharsText;
let restoreSource = restoreSourceText;


/* ---------------------------------------------
    SET UP LISTENERS (with helper functions)

    More legible markup
    Use entities for Unicode tags
    Keep problematic Unicodes
    Default features
    Non-word tags
    Language
    Language picker dialog
    Download
    Copy
    Show code
    Mark replaced chars in code
    Drop a file
    Load file via input button
    Edit source
    Variant bases
   --------------------------------------------- */

// Access to our two text boxes.
let sourceElement = document.querySelector("#sourcebox");
let destElement = document.querySelector("#destbox");

// "More legible markup" checkbox.
let legibleWidget = document.getElementById('method_preference');
legibleWidget.addEventListener('change', function() {
    options.methodPriority = this.checked ? "legible" : "compact";
    textCaller(!codeOn);
 } );

// "Use entities for Unicode tags" checkbox.
let utagEntitiesWidget = document.getElementById('utag_entities');
utagEntitiesWidget.addEventListener('change', function() {
    options.utagEntities = this.checked;
    textCaller(!codeOn)
} );

// "Keep problematic Unicodes" checkbox.
let keepUnicodesWidget = document.getElementById('problem_unicodes');
keepUnicodesWidget.addEventListener('change', function() {
    options.keepUnicode = this.checked;
    if (puaWidget.checked) {
        restoreSource();
        puaMarker();
    }
    textCaller(!codeOn);
} );

// "Default features" edit box.
let defaultFeaturesWidget = document.getElementById('default_features');
defaultFeaturesWidget.addEventListener('input', function () {
    let effort = "{" + this.value + "}";
    try {
        let result = JSON.parse(effort);
        options.defaultTags = result;
        let box_feature_string = featureString(options.defaultTags);
        destElement.style.fontFeatureSettings = box_feature_string;
        textCaller(!codeOn);
        this.style.backgroundColor = 'initial';
    } catch (error) {
        this.style.backgroundColor = 'lightcoral';
    }
} );

// "Non-word tags" edit box.
let nonWordWidget = document.getElementById('non_word_tags');
nonWordWidget.addEventListener('input', function () {
    let effort = "[" + nonWordWidget.value + "]";
    try {
        let result = JSON.parse(effort);
        options.nonWordTags = result;
        textCaller(!codeOn);
        this.style.backgroundColor = 'initial';
    } catch (error) {
        this.style.backgroundColor = 'lightcoral';
    }
} );

// "Language" dropdown.
let lang_code_picker = document.getElementById('lang_code_picker');
let languageChoiceWidget = document.getElementById('language_choice');
languageChoiceWidget.addEventListener('change', function() {
    if (this.value == "other") {
        lang_code_picker.showModal();
    } else {
        options.language = this.value;
    }
    textCaller(!codeOn);
    destElement.setAttribute("lang", options.language);
    sourceElement.setAttribute("lang", options.language);
} );

// Widgets for the language picker dialog.
let languageInput = document.getElementById('langInput');
let languageCancel = document.getElementById('language_cancel');
languageCancel.addEventListener('click', () => {
    lang_code_picker.close();
} );

// Language picker dialog.
let languageSubmit = document.getElementById('language_okay');
languageSubmit.addEventListener('click', () => {
    let value = languageInput.value;
    if (value.length == 2) {
        options.language = value;
        lang_code_picker.close();
        destElement.setAttribute("lang", value);
        sourceElement.setAttribute("lang", value);
    }
});

// "Download" button.
let dnlButtonElement = document.querySelector("#dnlbutton");
dnlButtonElement.onclick = () => {
    saveFile();
}

// "Copy" button.
let cpyButtonElement = document.querySelector("#cpybutton");
cpyButtonElement.onclick = () => {
    copyToClipboard(exportString());
}

// "Show code" checkbox. This also disables the "Copy" and
// "Download" buttons.
let codeWidget = document.getElementById('show_code');
codeWidget.addEventListener('change', function () {
    if (this.checked) {
        codeOn = true;
        destElement.classList.add('codeview');
        textCaller(false);
        dnlButtonElement.disabled = true;
        cpyButtonElement.disabled = true;
    } else {
        codeOn = false;
        destElement.classList.remove('codeview');
        textCaller(true);
        dnlButtonElement.disabled = false;
        cpyButtonElement.disabled = false;
    }
} );

// "Mark Replaced Chars in Source" checkbox
let puaWidget = document.getElementById("mark_pua");
let puaLabel = document.getElementById("mark_pua_label");
puaWidget.addEventListener('change', function () {
    this.checked ? puaMarker() : restoreSource();
} );


// Drag and drop events, for the source box.
sourceElement.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.style.backgroundColor = '#eee';
} );

sourceElement.addEventListener('dragleave', function() {
    this.style.backgroundColor = '';
} );

// Drop a new file into the source box. We can handle
// two kinds of file: plain text (UTF-8) and HTML
// (the complete HTML file so we can parse it properly).
sourceElement.addEventListener('drop', function(e) {
    e.preventDefault();
    this.style.backgroundColor = '';
    const files = e.dataTransfer.files;
    if (files.length == 1) {
        let file = files[0];
        loadFile(file);
        fileInputWidget.innerHTML = file.name;
    }
} );

// “Choose File” button.
let fileInputWidget = document.getElementById('file_input');
fileInputWidget.addEventListener('change', (event) => {
    const selected_files = event.target.files;
    if (selected_files.length >= 1) {
        loadFile(selected_files[0]);
    }
} );

/**
 * Helper for change event for "Edit source" button.
 */
function handleSourceInput() {
    if (isHTMLType()) {
        htmlBackup.innerHTML = sourceElement.innerHTML;
    } else {
        textBackup = sourceElement.innerText;
    }
    textCaller(!codeOn);
}

// "Edit Source" button.
let editSrcWidget = document.getElementById('edit_source');
editSrcWidget.addEventListener('change', (event) => {
    if (editSrcWidget.checked) {
        puaWidget.checked = false;
        const event = new Event('change');
        puaWidget.dispatchEvent(event);
        puaWidget.disabled = true;
        puaLabel.style.opacity = 0.5;
        sourceElement.contentEditable = true;
        sourceElement.addEventListener('input', handleSourceInput);
    } else {
        puaWidget.disabled = false;
        puaLabel.style.opacity = 1.0;
        sourceElement.removeEventListener('input', handleSourceInput);
        sourceElement.contentEditable = false;
        if (isHTMLType()) {
            htmlBackup.innerHTML = sourceElement.innerHTML;
        } else {
            textBackup.innerText = sourceElement.innerText;
        }
    }
} );

/**
 * Helper for "Alternate bases" event.
 */
function varValues() {
    let varPref = [];
    for (let i = 0; i < varWidget.options.length; i++) {
        if (varWidget.options[i].selected) {
            varPref.push(varWidget.options[i].value);
        }
    }
    options.basePreferences = varPref;
}

let varWidget = document.getElementById('alternate_unicodes');
varWidget.addEventListener('change', ()=> {
    varValues();
    textCaller(!codeOn);
} );

let enlaWidget = document.getElementById('enlarge_scale');
enlaWidget.addEventListener('change', ()=> {
    s = parseInt(enlaWidget.value);
    console.log("s:", enlaWidget.value);
    if (s != NaN) {
        if (s >= 0 && s <=100) {
            options.enlargedScale = s
        }
    }
    textCaller(!codeOn);
    console.log("scale:", options.enlargedScale);
} );

/*
    Now complete initialization by cleaning up the source text (convert 
    any whitespace sequence to a space), converting, and displaying in
    the destinaton box.
*/

sourceElement.innerText = textBackup = cleanup_string(sourceElement.innerText)

textCaller(!codeOn);
