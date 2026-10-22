import asyncio,sys
from playwright.async_api import async_playwright
U='file:///workspace/zoes-princess-castle/index.html'
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch()
    for name,w,h,m in [('ipad',1180,820,0),('iphone',844,390,1),('iphone-portrait',390,844,1),('ipad-portrait',820,1180,0)]:
      c=await b.new_context(viewport={'width':w,'height':h},has_touch=True,is_mobile=bool(m),device_scale_factor=2 if m else 1)
      pg=await c.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m_:m_.type=='error' and errs.append(m_.text))
      for s in ['title','hub','friends','ball','tea','dress','bed','ride']:
        await pg.goto(U+'?s='+s);await pg.wait_for_timeout(500)
        await pg.screenshot(path=f'shots/{name}-{s}.png')
        if name in('ipad','iphone'):
          # every .btn / tappable must be inside viewport
          bad=await pg.evaluate("""()=>[...document.querySelectorAll('.btn,.sw')].map(e=>e.getBoundingClientRect()).filter(r=>r.left<0||r.top<0||r.right>innerWidth+1||r.bottom>innerHeight+1).length""")
          if bad: print(name,s,'offscreen',bad)
      # flows
      await pg.goto(U+'?s=ride');await pg.wait_for_timeout(400)
      await pg.mouse.click(w/2,h/2);await pg.wait_for_timeout(300)
      for i in range(70):
        await pg.mouse.click(w/2,h/2);await pg.wait_for_timeout(250)
      await pg.screenshot(path=f'shots/{name}-ride-play.png')
      await pg.goto(U+'?s=tea');await pg.wait_for_timeout(300)
      await pg.screenshot(path=f'shots/{name}-tea0.png')
      print(name,'errors',errs[:5])
    await b.close()
asyncio.run(main())
