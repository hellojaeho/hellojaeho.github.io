#!/usr/bin/env python3
"""Inject tiny inlined blur-up posters into grid VIDEO tiles.
Usage: python3 inject_posters.py [N]   # process the first N tiles (default 10)
Idempotent: a tile that already has .tile-poster is refreshed, not duplicated.
"""
import re, sys, json, base64, subprocess

N = int(sys.argv[1]) if len(sys.argv) > 1 else 10
SRC = 'index.html'

def curl(url, binary=False):
    r = subprocess.run(['curl', '-s', '-L', '--max-time', '12', url], capture_output=True)
    return r.stdout if binary else r.stdout.decode('utf-8', 'replace')

def datauri_for_id(vid):
    try:
        thumb = json.loads(curl(f'https://vimeo.com/api/oembed.json?url=https%3A%2F%2Fvimeo.com%2F{vid}'))['thumbnail_url']
    except Exception:
        return None
    base = thumb.split('?')[0]
    base = re.sub(r'[-_]d_\d+(x\d+)?$', '', base)
    base = re.sub(r'_\d+x\d+$', '', base)
    data = curl(base + '-d_48x27', binary=True)
    if not (data[:2] == b'\xff\xd8'):
        data = curl(thumb.split('?')[0], binary=True)   # fallback: full thumb
        if not (data[:2] == b'\xff\xd8'):
            return None
    return 'data:image/jpeg;base64,' + base64.b64encode(data).decode(), len(data)

h = open(SRC).read()

# locate tile blocks
marker = '<div class="tile carousel-row load-overlay'
starts = [m.start() for m in re.finditer(re.escape(marker), h)]
starts.append(len(h))

done = 0
# process from last to first so earlier offsets stay valid
targets = []
for i in range(min(N, len(starts) - 1)):
    block = h[starts[i]:starts[i+1]]
    if 'tile-video' not in block:
        continue
    m = re.search(r'playback/(\d+)', block)
    if not m:
        continue
    targets.append((i, m.group(1)))

# build replacements
report = []
# process in reverse so string offsets remain valid
for i, vid in reversed(targets):
    block = h[starts[i]:starts[i+1]]
    res = datauri_for_id(vid)
    if not res:
        report.append((vid, 'NO-THUMB'))
        continue
    datauri, nbytes = res
    poster = f'<div class="tile-poster" style="background-image:url(\'{datauri}\')"></div>'
    if 'class="tile-poster"' in block:
        newblock = re.sub(r'<div class="tile-poster"[^>]*></div>', poster, block, count=1)
        action = f'refreshed ({nbytes}B)'
    else:
        newblock = block.replace('<div class="tile-media">', '<div class="tile-media">\n            ' + poster, 1)
        action = f'added ({nbytes}B)'
    h = h[:starts[i]] + newblock + h[starts[i+1]:]
    report.append((vid, action))
    done += 1

open(SRC, 'w').write(h)
for vid, act in report:
    print(f'  {vid}: {act}')
print(f'Done. {done} video tiles given blur-up posters (of first {N} tiles).')
