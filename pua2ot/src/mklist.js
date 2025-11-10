const otagpref =   ['otag', 'utag', 'zwj', 'entity'];
const utagpref =   ['utag', 'otag', 'zwj', 'entity'];
const zwjpref =    ['zwj', 'utag', 'otag', 'entity'];
const entitypref = ['entity', 'zwj', 'utag', 'otag'];

let isMark = false;

function hexToChar(hexString) {
    let i = parseInt(hexString, 16);
    return String.fromCodePoint(i);
}

function makeRow(hex, vartext, block) {
    let ch = hexToChar(hex);

    //
    // HEX CODE
    //
    const row = document.createElement("tr");
    const hexcell = document.createElement("td");
    hexcell.textContent = hex;
    row.appendChild(hexcell);
    //
    // PUA CHARACTER
    //
    const puacell = document.createElement("td");
    puacell.classList.add("char");
    let b = ch;
    if (isMark) {
        b = "\u25CC" + b;
    }
    puacell.textContent = b;
    row.appendChild(puacell);
    //
    // VAR LABEL
    //
    const varcell = document.createElement("td");
    if (vartext != null) {
        varcell.textContent = vartext;
    }
    row.appendChild(varcell);
    //
    // BASE
    //
    const basecell = document.createElement("td");
    if ("base" in block) {
        b = block["base"];
        if (isMark) {
            b = "\u25CC" + b;
        }
        basecell.textContent = b;
    }
    row.appendChild(basecell);
    //
    // OTAG
    //
    const otagcell = document.createElement("td");
    otagcell.classList.add("otag");
    if ("otag" in block) {
        options.prefList = otagpref;
        b = ch;
        if (isMark) {
            b = "\u25CC" + b;
        }
        otagcell.innerHTML = convert(b);
    }
    row.appendChild(otagcell);
    //
    // UTAG
    //
    const utagcell = document.createElement("td");
    utagcell.classList.add("utag");
    if ("utag" in block) {
        options.prefList = utagpref;
        b = convert(ch);
        if (isMark) {
            b = "\u25CC" + b;
        }
        utagcell.innerHTML = b;
    }
    row.appendChild(utagcell);
    //
    // ZWJ
    //
    const zwjcell = document.createElement("td");
    zwjcell.classList.add("zwj");
    if ("zwj" in block) {
        options.prefList = zwjpref;
        b = convert(ch);
        if (isMark) {
            b = "\u25CC" + b;
        }
        zwjcell.innerHTML = b;
    }
    row.appendChild(zwjcell);
    //
    // ENTITY
    //
    const entitycell = document.createElement("td");
    entitycell.classList.add("entity");
    if ("entity" in block) {
        options.prefList = entitypref;
        b = convert(ch);
        if (isMark) {
            b = "\u25CC" + b;
        }
        entitycell.textContent = b;
    }
    row.appendChild(entitycell);
    return row;
}

options.utagEntities = true;

let table = document.createElement("table");
let toprow = document.createElement("tr");
let cell = document.createElement("td");
cell.textContent = "hex";
toprow.appendChild(cell);
cell = document.createElement("td");
cell.textContent = "char";
toprow.appendChild(cell);
cell = document.createElement("td");
cell.textContent = "var";
toprow.appendChild(cell);
cell = document.createElement("td");
cell.textContent = "base";
toprow.appendChild(cell);
cell = document.createElement("td");
cell.textContent = "otag";
toprow.appendChild(cell);
cell = document.createElement("td");
cell.textContent = "utag";
toprow.appendChild(cell);
cell = document.createElement("td");
cell.textContent = "zwj";
toprow.appendChild(cell);
cell = document.createElement("td");
cell.textContent = "entity";
toprow.appendChild(cell);
table.appendChild(toprow);
document.body.appendChild(table);
for (h in PUA_DATA) {
    let block = PUA_DATA[h];
    if ("desc" in block) {
        if (block.desc.includes("COMBINING")) {
            isMark = true;
        } else {
            isMark = false;
        }
    } else {
        isMark = false;
    }
    let topbase = "";
    if ("base" in block) {
        topbase = block["base"];
    }
    if ("var" in block) {
        dbl = block["var"];
        for (d in dbl) {
            const varbackup = options.variantPreferences;
            options.variantPreferences = [d];
            let r = makeRow(h, d, dbl[d]);
            table.appendChild(r);
            options.variantPreferences = varbackup;
        }
    } else {
        r = makeRow(h, null, block);
        table.appendChild(r);
    }
}

const dialog = document.getElementById('method_info');
const info_para = document.getElementById("dialogtext");

function setupClassListeners(tagname) {
    tagCells = document.getElementsByClassName(tagname);
    for (o in tagCells) {
        const el = tagCells[o];
        if (el.innerText != undefined && el.innerText.trim().length > 0) {
                el.addEventListener('click', function() {
                    tc = el.innerHTML;
                    tc = tc.replaceAll("&amp;", "&");
                    tc = tc.replaceAll("\u200D", "&zwj;");
                    info_para.innerText = tc;
                    dialog.showModal();
            })
        }
    }
}

setupClassListeners("otag");
setupClassListeners("utag");
setupClassListeners("zwj");
setupClassListeners("entity");