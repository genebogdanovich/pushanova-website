const fs = require('fs');

const en = JSON.parse(fs.readFileSync('locales/en.json', 'utf8'));
const he = JSON.parse(fs.readFileSync('locales/he.json', 'utf8'));

function copyStructure(enNode, heNode) {
  if (Array.isArray(enNode)) {
    const arr = [];
    for (let i = 0; i < enNode.length; i++) {
      if (typeof enNode[i] === 'object' && enNode[i] !== null) {
        arr.push(copyStructure(enNode[i], heNode[i] || heNode[String(i)]));
      }
    }
    return arr;
  } else if (typeof enNode === 'object' && enNode !== null) {
    if (enNode.hasOwnProperty("message")) {
      return { message: (heNode && heNode.message) ? heNode.message : enNode.message };
    } else {
      const obj = {};
      for (let key in enNode) {
        obj[key] = copyStructure(enNode[key], (heNode && heNode[key]) ? heNode[key] : null);
      }
      return obj;
    }
  }
  return enNode;
}

const fixed = copyStructure(en, he);
fs.writeFileSync('locales/he.json', JSON.stringify(fixed, null, 2));
console.log("Fixed arrays in locales/he.json");
