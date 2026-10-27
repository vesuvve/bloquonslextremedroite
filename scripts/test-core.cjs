const fs=require('fs'),vm=require('vm'),assert=require('assert');
let passed=0;const ok=(c,m)=>{assert.ok(c,m);passed++};
class El{constructor(){this.children=[];this.value='';this.events={};this.attrs={};} append(...x){this.children.push(...x)} replaceChildren(...x){this.children=x} addEventListener(n,f){this.events[n]=f} setAttribute(k,v){this.attrs[k]=v} select(){} remove(){} click(){this.clicked=true}}
async function run(){
const html=fs.readFileSync(require('path').join(__dirname,'../dist/index.html'),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
ok(new Set(ids).size===ids.length,'IDs uniques');
const elements=Object.fromEntries(ids.map(k=>[k,new El()]));let copied='',blob,anchor,execOK=true;
const document={getElementById:id=>elements[id],body:new El(),createElement:t=>{const e=new El();if(t==='a')anchor=e;return e},execCommand:()=>execOK};
const ctx={document,navigator:{clipboard:{writeText:async v=>{copied=v}}},Blob,URL:{createObjectURL:b=>{blob=b;return 'blob:test'},revokeObjectURL:()=>{}},setTimeout:()=>0};
vm.createContext(ctx);vm.runInContext(script,ctx);
const ev=async(id,name='click')=>await elements[id].events[name]({preventDefault(){}});
const state=expr=>vm.runInContext(expr,ctx);
ok(state('selected().length')===48,'48 sélectionnés au démarrage');
ok(elements.accounts.children.length===48,'48 lignes générées');
ok(elements.accounts.children.every(e=>e.children[0].checked),'Cases cochées');
ok(elements.accounts.children[0].children[0].attrs['aria-label']==='Sélectionner @J_Bardella','Libellé accessible');
await ev('copy');ok(copied===state("selected()").join("\n"),'Copie exacte, API simulée');
await ev('download');ok(anchor.download==='ma-selection-x.txt','Nom TXT');ok(await blob.text()===copied+'\n','Export UTF-8 exact');
await ev('none');ok(state('selected().length')===0,'Tout décocher');ok(elements.copy.disabled&&elements.download.disabled,'Export désactivé si vide');
await ev('all');ok(state('selected().length')===48,'Tout cocher');
const first=elements.accounts.children[0].children[0];first.checked=false;await first.events.change();ok(state('selected().length')===47,'Décoche un compte');
elements.filter.value='@J_Bard';await ev('filter','input');ok(elements.accounts.children.length===1,'Recherche avec @');ok(!elements.accounts.children[0].children[0].checked,'État conservé après filtre');
elements.filter.value='zzzzzzzzzzzz';await ev('filter','input');ok(elements.empty.hidden===false,'Recherche vide');
elements.newhandle.value='@Demo_test';await ev('addform','submit');ok(state('selected().includes("@Demo_test")'),'Ajout sélectionné');
elements.newhandle.value='@DEMO_TEST';await ev('addform','submit');ok(state('entries.length')===49,'Doublon ignoré sans casse');
elements.newhandle.value='<script>alert(1)</script>';await ev('addform','submit');ok(state('entries.length')===49,'Entrée invalide rejetée');
elements.bulk.value='@demo_two, demo_three;@demo_four\n@demo_two';await ev('import');ok(state('entries.length')===52,'Import personnel et dédoublonnage');
ctx.navigator.clipboard.writeText=async()=>{throw Error('refus')};await ev('copy');ok(elements.status.textContent==='✓ Liste copiée.','Repli copie simulé');
execOK=false;await ev('copy');ok(elements.status.textContent.includes('Téléchargez'),'Message échec copie');
ok(!/\b(fetch|XMLHttpRequest|sendBeacon|WebSocket)\b/.test(script),'Aucun appel réseau');
ok(!/<script[^>]*\bsrc=/.test(html),'Aucun script distant');
ok(!/type=["']password/.test(html),'Aucun mot de passe');
ok((html.match(/<li><h3>/g)||[]).length===5,'Cinq étapes');
const imgs=[...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m=>m[1]);ok(imgs.length===17&&imgs.every(s=>s.startsWith('data:image/webp;base64,')),'Captures embarquées, avec versions agrandies');
for(const data of imgs){const bytes=Buffer.from(data.split(',')[1],'base64');ok(bytes.toString('ascii',0,4)==='RIFF'&&bytes.toString('ascii',8,12)==='WEBP','WEBP valide')}
ok(html.includes('max-width:100%')&&html.includes('name="viewport"'),'Règles adaptatives présentes, rendu non testé');
console.log(JSON.stringify({assertions:passed,resultat:'OK',limite:'Tests de logique dans un DOM simulé. Ni recette navigateur, ni test réel du presse-papiers, ni import extension.'},null,2));
}
run().catch(e=>{console.error(e);process.exit(1)});
