#!/usr/bin/env python3
# Local image-generation UI for Android/Termux.
# Requires stable-diffusion.cpp's sd-cli and a compatible local model.
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
from pathlib import Path
import subprocess, json, os, uuid, threading

ROOT=Path(__file__).resolve().parent
OUT=ROOT/'generated'; OUT.mkdir(exist_ok=True)
MODEL=os.environ.get('SD_MODEL',str(ROOT/'model.safetensors'))
CLI=os.environ.get('SD_CLI','sd-cli')
PORT=int(os.environ.get('PORT','8765'))
JOBS={}; LOCK=threading.Lock()

PAGE="""<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><meta charset="utf-8"><title>Local Image Generator</title>
<style>
:root{color-scheme:dark;--bg:#0c1220;--card:#151f32;--line:#2a3852;--accent:#7cafff}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:#f2f5fb;font:16px system-ui}header{padding:22px 16px;background:#172b4b}main{max-width:760px;margin:auto;padding:16px}
h1{margin:0;font-size:1.5rem}p{color:#b7c4d8}.card{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px;margin:14px 0}
label{display:block;font-weight:650;margin:12px 0 6px}textarea,input,select{width:100%;padding:12px;border-radius:10px;border:1px solid var(--line);background:#0e1727;color:white;font:inherit}
textarea{min-height:105px;resize:vertical}.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
button{border:0;border-radius:11px;background:var(--accent);color:#07152a;font-weight:750;font-size:1rem;padding:13px 17px;cursor:pointer;width:100%;margin-top:14px}
button:disabled{opacity:.5}#status{white-space:pre-wrap;color:#c7d5ea}.output{width:100%;border-radius:12px;margin-top:12px}small{color:#9eb0c9}
@media(max-width:500px){.grid{grid-template-columns:1fr}}
</style></head><body><header><h1>Local Image Generator</h1><p>On-device UI · local model · no cloud image API</p></header><main>
<section class="card"><h2>Create an image</h2><label for="prompt">Prompt</label><textarea id="prompt" placeholder="A cinematic portrait of a red fox in a misty forest, detailed fur, soft morning light"></textarea>
<label for="negative">Negative prompt (optional)</label><input id="negative" placeholder="blurry, low quality, distorted">
<div class="grid"><div><label for="steps">Steps</label><select id="steps"><option>15</option><option selected>20</option><option>25</option><option>30</option></select></div>
<div><label for="size">Image size</label><select id="size"><option value="512x512">512 × 512</option><option value="512x768">512 × 768</option><option value="768x512">768 × 512</option></select></div></div>
<button id="go">Generate locally</button><p id="status" role="status">Ready. Generation speed depends on your phone and model.</p>
<img id="result" class="output" hidden alt="Generated image"><a id="save" hidden download="local-image.png">Save image</a></section>
<section class="card"><h3>Setup status</h3><p id="setup">Checking local engine…</p><small>Generated images are saved in the generated/ folder beside this script.</small></section>
</main><script>
const $=x=>document.getElementById(x);
async function status(){try{let d=await(await fetch('/status')).json();$('setup').textContent=d.ready?'Engine and model found: '+d.model:'Setup needed: '+d.message}catch(e){$('setup').textContent='Cannot reach local server.'}}
$('go').onclick=async()=>{let prompt=$('prompt').value.trim();if(!prompt){$('status').textContent='Enter a prompt first.';return}
$('go').disabled=true;$('result').hidden=true;$('save').hidden=true;$('status').textContent='Starting local generation…';
try{let r=await fetch('/generate',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({prompt,negative:$('negative').value,steps:$('steps').value,size:$('size').value})});let d=await r.json();if(!r.ok)throw Error(d.error||'Generation failed');
$('status').textContent='Generating locally…';let timer=setInterval(async()=>{try{let q=await(await fetch('/job?id='+encodeURIComponent(d.id))).json();$('status').textContent=q.message;if(q.done){clearInterval(timer);$('go').disabled=false;if(q.error){$('status').textContent='Error: '+q.error;return}let url='/image?name='+encodeURIComponent(q.name);$('result').src=url;$('result').hidden=false;$('save').href=url;$('save').hidden=false;$('save').textContent='Save image'} }catch(e){clearInterval(timer);$('status').textContent=e.message;$('go').disabled=false}},2000)
}catch(e){$('status').textContent='Error: '+e.message;$('go').disabled=false}};
status();
</script></body></html>"""

def setup():
    try: binary=subprocess.run(['sh','-lc',f'command -v {CLI}'],capture_output=True,text=True,timeout=5).stdout.strip()
    except Exception: binary=''
    if not binary:return False,'sd-cli not found in PATH. Install/build stable-diffusion.cpp first.'
    if not Path(MODEL).is_file():return False,f'Model not found: {MODEL}. Set SD_MODEL to its full path.'
    return True,str(Path(MODEL))

def worker(jid,prompt,negative,steps,size):
    try:
        w,h=map(int,size.split('x')); dest=OUT/(jid+'.png')
        cmd=[CLI,'-m',MODEL,'-p',prompt,'-n',negative,'-o',str(dest),'--steps',str(steps),'--width',str(w),'--height',str(h)]
        with LOCK:JOBS[jid]={'done':False,'message':'Running the local model…'}
        result=subprocess.run(cmd,capture_output=True,text=True,timeout=3600)
        if result.returncode: raise RuntimeError((result.stderr or result.stdout or 'sd-cli failed')[-1600:])
        if not dest.exists():raise RuntimeError('No output PNG found; check your model and sd-cli version/flags.')
        with LOCK:JOBS[jid]={'done':True,'message':'Image generated.','name':dest.name}
    except Exception as e:
        with LOCK:JOBS[jid]={'done':True,'message':'Generation failed.','error':str(e)}

class Handler(BaseHTTPRequestHandler):
    def send(self,code,data,typ='application/json'):
        b=data.encode() if isinstance(data,str) else data
        self.send_response(code);self.send_header('Content-Type',typ);self.send_header('Content-Length',str(len(b)));self.end_headers();self.wfile.write(b)
    def do_GET(self):
        if self.path=='/':return self.send(200,PAGE,'text/html; charset=utf-8')
        if self.path=='/status':
            ok,msg=setup();return self.send(200,json.dumps({'ready':ok,'model':msg if ok else '','message':msg}))
        if self.path.startswith('/job?'):
            jid=parse_qs(self.path.split('?',1)[1]).get('id',[''])[0]
            return self.send(200,json.dumps(JOBS.get(jid,{'done':True,'error':'Unknown job'})))
        if self.path.startswith('/image?'):
            name=Path(parse_qs(self.path.split('?',1)[1]).get('name',[''])[0]).name; f=OUT/name
            if not f.is_file():return self.send(404,'Not found','text/plain')
            return self.send(200,f.read_bytes(),'image/png')
        return self.send(404,'Not found','text/plain')
    def do_POST(self):
        if self.path!='/generate':return self.send(404,'Not found')
        n=int(self.headers.get('Content-Length','0'));d=parse_qs(self.rfile.read(n).decode())
        prompt=d.get('prompt',[''])[0].strip()
        if not prompt:return self.send(400,json.dumps({'error':'Prompt is required'}))
        ok,msg=setup()
        if not ok:return self.send(400,json.dumps({'error':msg}))
        steps=max(1,min(50,int(d.get('steps',['20'])[0]))); size=d.get('size',['512x512'])[0]
        if size not in ('512x512','512x768','768x512'):size='512x512'
        jid=uuid.uuid4().hex[:12]
        threading.Thread(target=worker,args=(jid,prompt,d.get('negative',[''])[0],steps,size),daemon=True).start()
        return self.send(202,json.dumps({'id':jid}))
    def log_message(self,*args):pass

if __name__=='__main__':
    print(f'Open http://127.0.0.1:{PORT} on this phone.')
    print('Set SD_MODEL=/full/path/to/model.safetensors if needed.')
    HTTPServer(('127.0.0.1',PORT),Handler).serve_forever()
    
