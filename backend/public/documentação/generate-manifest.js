// 📦 Módulos internos do Node.js
const fs = require("fs");                // Leitura e escrita de arquivos
const path = require("path");            // Manipulação de caminhos de arquivos
const { parse } = require("jsonc-parser"); // Biblioteca que entende JSONC (JSON com comentários)

// 📁 Caminho do arquivo de entrada (manifest.template.jsonc) na mesma pasta do script
const inputPath = path.join(__dirname, "manifest.template.jsonc");

// 📁 Caminho do arquivo de saída: cria manifest.json na pasta /public
const outputPath = path.join(__dirname, "..", "public", "manifest.json");

try {
  // 📥 Lê o conteúdo do arquivo JSONC com comentários
  const jsoncContent = fs.readFileSync(inputPath, "utf8");

  // 🧠 Converte o conteúdo JSONC para um objeto JavaScript
  const jsonObject = parse(jsoncContent);

  // 💾 Escreve o JSON válido (sem comentários) formatado no destino final
  fs.writeFileSync(outputPath, JSON.stringify(jsonObject, null, 2));

  console.log("✅ manifest.json gerado com sucesso na raiz da pasta public!");
} catch (err) {
  // ⚠️ Captura e mostra erros de leitura, parsing ou escrita
  console.error("❌ Erro ao gerar manifest.json:", err);
}
