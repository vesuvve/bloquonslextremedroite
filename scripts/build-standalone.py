"""Construit une copie HTML autonome sans dépendance tierce."""
from pathlib import Path
import base64,re,mimetypes
root=Path(__file__).resolve().parents[1]
def data(path):
    p=root/path
    mime=mimetypes.guess_type(str(p))[0] or 'application/octet-stream'
    return 'data:'+mime+';base64,'+base64.b64encode(p.read_bytes()).decode()
html=(root/'index.html').read_text()
html=html.replace('<script src="analytics.js" defer></script>', '')
css=(root/'styles.css').read_text()
css=re.sub(r'url\((assets/[^)]+)\)',lambda m:'url('+data(m[1])+')',css)
html=html.replace('<link rel="stylesheet" href="styles.css">','<style>'+css+'</style>')
html=html.replace('<script src="app.js" defer></script>','<script>'+(root/'app.js').read_text()+'</script>')
html=re.sub(r'src="(assets/[^"]+)"',lambda m:'src="'+data(m[1])+'"',html)
out=root/'dist';out.mkdir(exist_ok=True)
(out/'index.html').write_text(html)
print(out/'index.html')
