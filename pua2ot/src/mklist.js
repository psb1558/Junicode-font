const otagpref =   ['otag', 'utag', 'zwj', 'entity'];
const utagpref =   ['utag', 'otag', 'zwj', 'entity'];
const zwjpref =    ['zwj', 'utag', 'otag', 'entity'];
const entitypref = ['entity', 'zwj', 'utag', 'otag'];

const dialog = document.getElementById('method_info');
const info_para = document.getElementById("dialogtext");
const dlg_header = document.getElementById("dialogheadertext");
const tbl_head = document.getElementById("table_head");
const tbl_body = document.getElementById("table_body");
const copy_text = document.getElementById("copyText");

let isMark = false;

function hexToChar(hexString) {
    let i = parseInt(hexString, 16);
    return String.fromCodePoint(i);
}

function makeRow(hex, vartext, block, desc) {
    let ch = hexToChar(hex);

    //
    // HEX CODE
    //
    const row = document.createElement("tr");
    const hexcell = document.createElement("td");
    cellContent = `${hex}<span class='chdesc'>${desc}</span>`
    hexcell.innerHTML = cellContent;
    hexcell.classList.add("hex");
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
    varcell.classList.add("varc");
    if (vartext != null) {
        varcell.textContent = vartext;
    }
    row.appendChild(varcell);
    //
    // BASE
    //
    const basecell = document.createElement("td");
    basecell.classList.add("basec");
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

function tableHeaderCell(name, parent) {
    let cell = document.createElement("th");
    cell.textContent = name;
    parent.appendChild(cell);
}

function intersect(a, b) {
    var t;
    if (b.length > a.length) t = b, b = a, a = t;
    return a.filter(function (e) {
        return b.indexOf(e) > -1;
    });
}

async function toClipboard(t) {
    try {
        await navigator.clipboard.writeText(t);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}

function setupListeners() {
    tbl_body.addEventListener('click', function(e) {
        tgt = e.target.closest('td');
        const cl = Array.from(tgt.classList);
        if (cl.includes("hex")) {
            if (tgt.children.length > 0) {
                dlg_header.innerHTML = "Character description:";
                info_para.innerHTML = tgt.children[0].textContent;
                dialog.showModal();
            }
        } else if (intersect(cl, otagpref).length > 0) {
            let tc = tgt.innerHTML;
            tc = tc.replaceAll("&amp;", "&");
            tc = tc.replaceAll("\u200D", "&zwj;");
            if (tc.length > 0) {
                dlg_header.innerHTML = "Character code:";
                info_para.innerText = tc;
                dialog.showModal();
           }
        }
    })
    copy_text.addEventListener('click', function(e) {
        toClipboard(info_para.innerText);
    });
}

// We need to be able to see these Unicode tags.
options.utagEntities = true;

let toprow = document.createElement("tr");
tableHeaderCell("hex", toprow);
tableHeaderCell("char", toprow);
tableHeaderCell("var", toprow);
tableHeaderCell("base", toprow);
tableHeaderCell("otag", toprow);
tableHeaderCell("utag", toprow);
tableHeaderCell("zwj", toprow);
tableHeaderCell("entity", toprow);
tbl_head.appendChild(toprow);

for (h in PUA_DATA) {
    let description = "";
    let block = PUA_DATA[h];
    if ("desc" in block) {
        description = block.desc;
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
            let r = makeRow(h, d, dbl[d], description);
            tbl_body.appendChild(r);
            options.variantPreferences = varbackup;
        }
    } else {
        r = makeRow(h, null, block, description);
        tbl_body.appendChild(r);
    }
}

setupListeners();
