
const fs = require('node:fs');
const puaNode = require("./pua2ot-node-min.js");

let test_text = "vallgar hınſ gᷓ vͬ vlꝼr aurgoðı e͛ oꝺꝺau͛ıar e͛o ꝼᷓ kōn͛.";

try {
    test_text = fs.readFileSync("./load-me.txt", "utf8");
} catch (err) {
    console.error("Error reading file:", err);
}

puaNode.options.language = "is";

test_result = puaNode.convert(puaNode.cleanup_string(test_text));

console.log(test_result);
