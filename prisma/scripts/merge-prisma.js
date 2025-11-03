const fs = require("fs");
const path = require("path");

const prismaDir = path.resolve(__dirname, "..");
const headerPath = path.join(prismaDir, "schema.header.prisma");
const modelsDir = path.join(prismaDir, "models");
const outPath = path.join(prismaDir, "schema.prisma");

if (!fs.existsSync(headerPath)) {
  console.error("Missing header file:", headerPath);
  process.exit(1);
}

const header = fs.readFileSync(headerPath, "utf8").trim() + "\n\n";


const modelFiles = fs.readdirSync(modelsDir)
  .filter(f => f.endsWith(".prisma"))
  .sort();

const models = modelFiles.map(f => {
  const p = path.join(modelsDir, f);
  return fs.readFileSync(p, "utf8").trim();
}).join("\n\n");


fs.writeFileSync(outPath, header + models + "\n");
console.log("Wrote merged Prisma schema to", outPath);