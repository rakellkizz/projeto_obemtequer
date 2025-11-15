const fs = require("fs");
const path = require("path");
const { parse } = require("jsonc-parser");

// Caminho para o template que está na mesma pasta que este script
const inputPath = path.join(__dirname, "manifest.template.jsonc");

// Caminho de saída: volta uma pasta e salva na raiz de public
const outputPath = path.join(__dirname, "..", "manifest.json");

try {
  const jsoncContent = fs.readFileSync(inputPath, "utf8");
  const jsonObject = parse(jsoncContent);
  fs.writeFileSync(outputPath, JSON.stringify(jsonObject, null, 2));
  console.log("✅ manifest.json gerado com sucesso na raiz da pasta public!");
} catch (err) {
  console.error("❌ Erro ao gerar manifest.json:", err);
}
