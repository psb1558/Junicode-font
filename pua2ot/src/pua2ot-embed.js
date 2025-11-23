/**
 * Finds all text nodes in the &lt;body&gt; of an
 * html file and calls convert() to convert them all. Sets
 * the language automatically if there is a lang attribute on the &lt;body&gt;
 * or &lt;html&gt; element.
 */
function convertAll() {
    if (document.body.hasAttribute("lang")) {
        options.language = document.body.getAttribute("lang")
    } else if (document.documentElement.hasAttribute("lang")) {
        options.language = document.documentElement.getAttribute("lang")
    }
    console.time("PUATimer");

    let replacements = [];

    document.body.lang = options.language;

    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                if (node.nodeType === Node.TEXT_NODE) {
                    // Only accept text nodes that are not purely whitespace, for example
                    if (node.nodeValue.trim().length > 0) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                }
                return NodeFilter.FILTER_SKIP; // Skip other nodes or empty text nodes
            }
        }
    )
    let node;
    while ((node = walker.nextNode())) {
        let nv = node.nodeValue;
        let parentEl = node.parentElement;
        if (parentEl.classList.contains("noconv")) {
            continue;
        }
        nv = cleanup_string(nv);
        if (nv.length > 0) {
            const hasLeadingWhitespace = /^\s/.test(nv);
            const hasTrailingWhitespace = /\s$/.test(nv);
            const leading = hasLeadingWhitespace ? " " : "";
            const trailing = hasTrailingWhitespace ? " " : "";
            nv = convert(nv, true, false);
            newSpan = document.createElement("span");
            newSpan.innerHTML = leading + nv + trailing;
            replacements.push([parentEl, node, newSpan]);
        }
    }
    if (replacements.length > 0) {
        for (idx in replacements) {
            r = replacements[idx];
            r[0].replaceChild(r[2], r[1]);
        }
    }
    console.timeEnd("PUATimer");
}
