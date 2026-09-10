"""Annotated backflip excerpt with explicit, shared slow-motion and holds."""
from pathlib import Path
from fractions import Fraction
import argparse
import json
import av
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).parent
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--source', type=Path, default=ROOT.parent / 'det_013')
parser.add_argument('--output', type=Path, default=ROOT)
parser.add_argument('--qa-dir', type=Path, help='Optionally export inspection PNGs.')
args = parser.parse_args()
SOURCE, OUT = args.source, args.output
OUT.mkdir(parents=True, exist_ok=True)
W, H = 1280, 534
SCALE = .75
OFFSETS = [8, 648]
FONT = '/System/Library/Fonts/Supplemental/Arial.ttf'
BOLD = '/System/Library/Fonts/Supplemental/Arial Bold.ttf'
title = ImageFont.truetype(BOLD, 26)
note = ImageFont.truetype(BOLD, 22)
small = ImageFont.truetype(FONT, 19)
red, green = '#d10b24', '#087547'
with av.open(str(SOURCE / 'wan.mp4')) as c:
    wan = [f.to_image() for f in c.decode(video=0)]
with av.open(str(SOURCE / 'omr.mp4')) as c:
    omr = [f.to_image() for f in c.decode(video=0)]
assert len(wan) == len(omr) == 81

def interpolate(index, points):
    keys = sorted(points)
    if index <= keys[0]: return points[keys[0]]
    if index >= keys[-1]: return points[keys[-1]]
    left = max(k for k in keys if k <= index)
    right = min(k for k in keys if k >= index)
    if left == right: return points[left]
    t = (index-left)/(right-left)
    return tuple(a+(b-a)*t for a,b in zip(points[left],points[right]))

def circle(draw, box, offset, color):
    x1,y1,x2,y2 = box
    scaled = (offset+x1*SCALE, 50+y1*SCALE, offset+x2*SCALE, 50+y2*SCALE)
    for angle in range(0,360,16):
        draw.arc(scaled, angle, angle+10, fill='white', width=6)
        draw.arc(scaled, angle, angle+10, fill=color, width=4)

baseline_boxes = {40:(250,90,550,320),44:(230,8,555,240),48:(410,8,685,235),50:(390,25,710,290)}
omr_boxes = {40:(270,130,600,455),44:(175,125,465,475),48:(180,125,475,475),50:(180,135,490,475)}
holds = {44:2.0,48:2.0,56:1.0}
schedule=[]
frames=[]
elapsed=0.0
for index in range(57):
    canvas=Image.new('RGB',(W,H),'#f8fafb')
    draw=ImageDraw.Draw(canvas)
    draw.rectangle((0,0,639,49),fill='#9f2333')
    draw.rectangle((640,0,W,49),fill='#086743')
    draw.text((22,10),'Wan2.2 baseline',font=title,fill='white')
    draw.text((662,10),'Wan2.2 + OMR',font=title,fill='white')
    canvas.paste(wan[index].resize((624,360),Image.Resampling.LANCZOS),(8,50))
    canvas.paste(omr[index].resize((624,360),Image.Resampling.LANCZOS),(648,50))
    if 40 <= index <= 50:
        circle(draw,interpolate(index,baseline_boxes),8,red)
        circle(draw,interpolate(index,omr_boxes),648,green)
    if index == 56:
        circle(draw,(295,175,650,460),8,red)
        circle(draw,(145,160,630,460),648,green)
    if index < 32:
        left,right='Follow the backflip','Same prompt and source time'
    elif index < 44:
        left,right='Watch the leg / torso transition','Follow the body into the landing'
    elif index < 48:
        left,right='01  Inspect this leg position','Body meets the cushion'
    elif index < 56:
        left,right='02  Compare the next leg position','Body settles into the cushion'
    else:
        left,right='03  Inspect pose and cushion contact','Forward body motion after landing'
    assert draw.textbbox((0,0),left,font=note)[2] < 596
    assert draw.textbbox((0,0),right,font=note)[2] < 596
    draw.text((22,422),left,font=note,fill=red)
    draw.text((662,422),right,font=note,fill=green)
    if index in holds:
        badge=f'HOLD {list(holds).index(index)+1} / 3'
        detail='Paused together for inspection'
    elif index >= 32:
        badge='0.25× SLOW MOTION'
        detail='Both panels slowed equally'
    else:
        badge='1× PLAYBACK'
        detail='Both panels at original speed'
    draw.rounded_rectangle((20,463,280,503),radius=6,fill='#172942')
    draw.text((32,472),badge,font=small,fill='white')
    draw.text((302,473),detail,font=small,fill='#53677b')
    clock=f'Source {index/16:.2f} s'
    draw.text((W-180,473),clock,font=small,fill='#334b62')
    draw.rectangle((20,519,W-20,523),fill='#d5dfe5')
    draw.rectangle((20,519,20+(W-40)*index/56,523),fill=red if index in holds else '#118765')
    seconds=(1/16 if index < 32 else 1/4)+holds.get(index,0)
    schedule.append({'frame':index,'source_seconds':index/16,'output_start':elapsed,
                     'seconds':seconds,'speed':1 if index<32 else .25,'hold_seconds':holds.get(index,0)})
    elapsed+=seconds
    frames.append(canvas)

atlas=Image.new('RGB',(3*640,3*267))
for tile,index in enumerate([0,12,24,36,40,44,48,52,56]):
    atlas.paste(frames[index].resize((640,267)),((tile%3)*640,(tile//3)*267))
palette=atlas.quantize(colors=256,method=Image.Quantize.MEDIANCUT)
quantized=[f.quantize(palette=palette,dither=Image.Dither.FLOYDSTEINBERG) for f in frames]
durations=[round((x['output_start']+x['seconds'])*100)*10-round(x['output_start']*100)*10 for x in schedule]
quantized[0].save(OUT/'backflip-annotated.gif',save_all=True,append_images=quantized[1:],
                  duration=durations,loop=0,optimize=True,disposal=2)
with av.open(str(OUT/'backflip-annotated.mp4'),'w') as container:
    stream=container.add_stream('libx264',rate=32)
    stream.width,stream.height,stream.pix_fmt=W,H,'yuv420p'
    stream.options={'crf':'18','preset':'medium'}
    output_index=0
    for source,entry in zip(frames,schedule):
        for _ in range(round(entry['seconds']*32)):
            frame=av.VideoFrame.from_image(source)
            frame.pts,frame.time_base=output_index,Fraction(1,32)
            for packet in stream.encode(frame):container.mux(packet)
            output_index+=1
    for packet in stream.encode():container.mux(packet)
frames[48].save(OUT/'backflip-annotated.webp',quality=92)
if args.qa_dir:
    args.qa_dir.mkdir(parents=True, exist_ok=True)
    for i in [0,40,44,48,56]:frames[i].save(args.qa_dir/f'teaser-check-{i}.png')
manifest={'prompt':'det_013','source_fps':16,'source_frames_used':57,'source_interval':[0,3.5],
          'original_frames':81,'original_duration':81/16,'crop':None,'output_size':[W,H],
          'output_duration':elapsed,'mp4_frames':output_index,'mp4_fps':32,
          'same_timing_in_both_panels':True,'schedule':schedule}
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
with Image.open(OUT/'backflip-annotated.gif') as gif:
    assert gif.n_frames==57 and gif.info['loop']==0
    actual=[]
    for i in range(gif.n_frames):gif.seek(i);actual.append(gif.info['duration'])
    assert actual==durations and sum(actual)==round(elapsed*1000)
with av.open(str(OUT/'backflip-annotated.mp4')) as container:
    assert sum(1 for _ in container.decode(video=0))==output_index
print(f'Verified {len(frames)} source frames; {output_index} MP4 frames; {elapsed:.2f}s edited loop.')
print('Holds:',[(i,i/16,schedule[i]['output_start'],holds[i]) for i in holds])
print('GIF MB',round((OUT/'backflip-annotated.gif').stat().st_size/1e6,2),'MP4 MB',round((OUT/'backflip-annotated.mp4').stat().st_size/1e6,2))
