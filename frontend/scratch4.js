const fs = require('fs')
const path = './src/app/articles/[slug]/page.tsx'
let content = fs.readFileSync(path, 'utf8')
if (!content.includes('generateStaticParams')) {
  content = content.replace(
    'export async function generateMetadata',
    "export async function generateStaticParams() { return [] }\n\nexport async function generateMetadata"
  )
  fs.writeFileSync(path, content)
}
