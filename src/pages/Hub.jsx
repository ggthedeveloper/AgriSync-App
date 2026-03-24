import { useState } from "react";
import { GODOWNS } from "../data/constants";
import { I } from "../components/Icons";
import { Card, Modal, Btn, Bdg, SL, FL, Inp, Sel } from "../components/UI";

export default function Hub({ th, L, user, cart, setCart, notify }) {
  const [bkm, setBkm] = useState(null);
  const [bDone, setBDone] = useState(false);
  const [bf, setBf] = useState({ date:"", name:user.name, phone:"", notes:"" });
  const [sg, setSg] = useState(GODOWNS[0]);
  const [sf, setSf] = useState({ qty:"", days:"" });
  const [sDone, setSDone] = useState(false);
  const [ins, setIns] = useState(false);
  const [iDone, setIDone] = useState(false);
  const [iF, setIF] = useState({ crop:"Paddy", area:"", season:"Kharif", bank:"" });
  const [hlth, setHlth] = useState(false);

  return (
    <div>
      <h2 style={{ fontSize:22,fontWeight:700,margin:"0 0 16px",color:th.tx }}>{L.hardware}</h2>

      {/* Cart banner */}
      {cart.length > 0 && (
        <div style={{ background:th.gl,border:`1px solid ${th.gd}`,borderRadius:11,padding:"11px 14px",marginBottom:14,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <div style={{ display:"flex",gap:8,alignItems:"center" }}>
            <I n="cart" size={16} color={th.gd} />
            <span style={{ fontSize:15,fontWeight:700,color:th.gd }}>{cart.length} item(s) in cart</span>
          </div>
          <Btn color={th.gd} onClick={() => { notify(`Order placed: ${cart.join(", ")}`); setCart([]); }}>Checkout</Btn>
        </div>
      )}

      {/* Hardware cards */}
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12 }}>
        {[
          { name:"AI Drone",    price:"₹30,000", rent:"₹300/day", desc:"GPS precision, 10 ac/hr",     c:"#5b21b6" },
          { name:"Auto Sprayer",price:"₹10000",   rent:"₹100/day", desc:"500L boom, remote control", c:th.ac },
        ].map(item => (
          // <Card th={th} key={item.name} style={{ marginBottom:0 }}>
          //   <div style={{ width:46,height:46,borderRadius:13,background:item.c+"18",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:11 }}>
          //     <I n={item.name==="AI Drone"?"cpu":"zap"} size={24} color={item.c} />
          //   </div>
          //   <div style={{ fontWeight:700,fontSize:15,color:th.tx,marginBottom:2 }}>{item.name}</div>
          //   <div style={{ fontSize:18,fontWeight:700,color:th.gd,marginBottom:2 }}>{item.price}</div>
          //   <div style={{ fontSize:13,color:th.mt,marginBottom:10 }}>Rent: {item.rent} · {item.desc}</div>
          //   <div style={{ display:"flex",gap:6 }}>
          //     <Btn onClick={() => { setCart(c => [...c, item.name]); notify(`${item.name} added`); }} style={{ flex:1,padding:"8px 0",fontSize:13 }}>Buy</Btn>
          //     <Btn outline onClick={() => { setBkm({ type:"rent",item }); setBDone(false); }} style={{ flex:1,padding:"8px 0",fontSize:13 }}>Rent</Btn>
          //   </div>
          // </Card>
                  <Card th={th} key={item.name} style={{ 
          marginBottom:0,
          borderRadius:16,
          padding:16,
          transition:"all 0.2s ease",
          cursor:"pointer"
        }}>
          <div style={{ 
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            marginBottom:12
          }}>
            <div style={{ 
              width:48,height:48,
              borderRadius:14,
              background:item.c+"18",
              display:"flex",
              alignItems:"center",
              justifyContent:"center"
            }}>
              <I n={item.name==="AI Drone"?"cpu":"zap"} size={24} color={item.c} />
            </div>

            <div style={{
              background:"#16a34a15",
              color:"#16a34a",
              padding:"4px 8px",
              borderRadius:8,
              fontSize:12,
              fontWeight:700
            }}>
              SAVE
            </div>
          </div>

          <div style={{ fontWeight:700,fontSize:16,color:th.tx,marginBottom:4 }}>
            {item.name}
          </div>

          {/* PRICE SECTION */}
          <div style={{ marginBottom:6 }}>
            <span style={{
              textDecoration:"line-through",
              color:"#888",
              fontSize:13,
              marginRight:6
            }}>
              {item.name==="AI Drone" ? "₹1,50,000" : "₹20,000"}
            </span>

            <span style={{
              fontSize:20,
              fontWeight:800,
              color:th.gd
            }}>
              {item.price}
            </span>
          </div>

          <div style={{ fontSize:13,color:th.mt,marginBottom:12 }}>
            Rent: <strong>{item.rent}</strong> · {item.desc}
          </div>

          <div style={{ display:"flex",gap:8 }}>
            <Btn 
              onClick={() => { setCart(c => [...c, item.name]); notify(`${item.name} added`); }} 
              style={{ 
                flex:1,
                padding:"10px 0",
                fontSize:14,
                borderRadius:10
              }}
            >
              Buy
            </Btn>

            <Btn 
              outline 
              onClick={() => { setBkm({ type:"rent",item }); setBDone(false); }} 
              style={{ 
                flex:1,
                padding:"10px 0",
                fontSize:14,
                borderRadius:10
              }}
            >
              Rent
            </Btn>
          </div>
        </Card>
        ))}
      </div>

      {/* Farm evaluation */}
      <Card th={th} style={{ display:"flex",gap:14,alignItems:"center",marginBottom:12 }}>
        <div style={{ width:50,height:50,borderRadius:14,background:th.al,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
          <I n="activity" size={26} color={th.ac} />
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:700,fontSize:16,color:th.tx }}>Farm Evaluation</div>
          {/* <div style={{ fontSize:18,fontWeight:700,color:th.gd }}>₹5000</div> */}
          <div style={{ marginBottom:6 }}>
            <span style={{
              textDecoration:"line-through",
              color:"#888",
              fontSize:13,
              marginRight:6
            }}>
              ₹25,000
            </span>

            <span style={{
              fontSize:20,
              fontWeight:800,
              color:th.gd
            }}>
              ₹4,000
            </span>
          </div>
          <div style={{ fontSize:14,color:th.mt }}>AI + agronomist · 2-day · Full report</div>
        </div>
        <Btn onClick={() => { setBkm({ type:"evaluation",item:{ name:"Farm Evaluation" } }); setBDone(false); }}>Book</Btn>
      </Card>

      {/* Additional services */}
      <Card th={th}>
        <SL th={th}>Additional Services</SL>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
          {[
            { n:"building", label:L.coldSt,   sub:"Book godown", fn:() => { setSg(GODOWNS[0]); setSDone(false); setBkm({ type:"storage" }); } },
            { n:"shield",   label:L.ins,       sub:"PMFBY",       fn:() => { setIF({ crop:"Paddy",area:"",season:"Kharif",bank:"" }); setIDone(false); setIns(true); } },
            { n:"heart",    label:L.fHealth,   sub:"Tracker",     fn:() => setHlth(true) },
            { n:"truck",    label:L.transport, sub:"Logistics",   fn:() => { setBkm({ type:"transport",item:{ name:"Produce Transport" } }); setBDone(false); } },
          ].map(s => (
            <div key={s.label} onClick={s.fn} style={{ background:th.sa,borderRadius:12,padding:14,cursor:"pointer",border:`1px solid ${th.br}` }}>
              <div style={{ width:36,height:36,borderRadius:10,background:th.al,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:9 }}>
                <I n={s.n} size={18} color={th.ac} />
              </div>
              <div style={{ fontWeight:700,fontSize:14,color:th.tx,marginBottom:2 }}>{s.label}</div>
              <div style={{ fontSize:13,color:th.mt }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Booking modal (rent / evaluation / transport) */}
      {bkm && bkm.type !== "storage" && (
        <Modal title={bkm.type==="rent" ? `Rent ${bkm.item?.name}` : `Book ${bkm.item?.name}`} onClose={() => setBkm(null)} th={th}>
          {!bDone ? (
            <div>
              {[["date","Preferred Date","date"],["name","Contact Name","text"],["phone","Phone","tel"],["notes","Notes","text"]].map(([k,lb,tp]) => (
                <FL key={k} label={lb} th={th}>
                  <Inp th={th} type={tp} value={bf[k]||""} onChange={e => setBf(f => ({ ...f,[k]:e.target.value }))} />
                </FL>
              ))}
              <Btn full onClick={() => { if (!bf.date||!bf.name) { notify("Fill required fields",true); return; } setBDone(true); }}>
                <I n="checkCirc" size={15} color="#fff" />{L.book}
              </Btn>
            </div>
          ) : (
            <div style={{ textAlign:"center",padding:"16px 0" }}>
              <div style={{ width:64,height:64,borderRadius:20,background:th.al,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px" }}>
                <I n="checkCirc" size={32} color={th.ac} />
              </div>
              <div style={{ fontWeight:700,fontSize:19,marginBottom:6,color:th.tx }}>Booking Confirmed</div>
              <div style={{ background:th.sa,borderRadius:12,padding:14,textAlign:"left",marginBottom:16,fontSize:15,lineHeight:1.9,border:`1px solid ${th.br}` }}>
                <div><strong>Service:</strong> {bkm.item?.name}</div>
                <div><strong>Date:</strong> {bf.date}</div>
                <div><strong>Contact:</strong> {bf.name}</div>
              </div>
              <Btn full onClick={() => setBkm(null)}>{L.done}</Btn>
            </div>
          )}
        </Modal>
      )}

      {/* Cold storage modal */}
      {bkm && bkm.type === "storage" && (
        <Modal title="Book Cold Storage" onClose={() => setBkm(null)} th={th}>
          {!sDone ? (
            <div>
              <SL th={th}>Select Facility</SL>
              {GODOWNS.map(g => (
                <div key={g.name} onClick={() => g.ok && setSg(g)} style={{ background:sg?.name===g.name?th.al:th.sa,borderRadius:12,padding:13,marginBottom:9,border:`1.5px solid ${sg?.name===g.name?th.ac:th.br}`,cursor:g.ok?"pointer":"not-allowed",opacity:g.ok?1:0.5 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                    <div>
                      <div style={{ fontWeight:700,fontSize:15,color:th.tx }}>{g.name}</div>
                      <div style={{ fontSize:13,color:th.sub }}>{g.loc} · {g.d}km · {g.temp}</div>
                      <div style={{ fontSize:13,color:th.ac,fontWeight:600 }}>₹{g.rate}/day/MT · {g.cap}</div>
                    </div>
                    <Bdg color={g.ok?th.ac:th.dg}>{g.ok?"Available":"Full"}</Bdg>
                  </div>
                </div>
              ))}
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10 }}>
                <FL label="Quantity (MT)" th={th}><Inp th={th} type="number" value={sf.qty||""} onChange={e => setSf(f => ({ ...f,qty:e.target.value }))} /></FL>
                <FL label="Duration (days)" th={th}><Inp th={th} type="number" value={sf.days||""} onChange={e => setSf(f => ({ ...f,days:e.target.value }))} /></FL>
              </div>
              {sf.qty && sf.days && (
                <div style={{ background:th.gl,borderRadius:10,padding:11,marginBottom:12,fontSize:15,color:th.gd }}>
                  Est: <strong>₹{parseInt(sf.qty)*parseInt(sf.days)*(sg?.rate||15)}</strong>
                </div>
              )}
              <Btn full onClick={() => { if (!sf.qty||!sf.days) { notify("Fill fields",true); return; } setSDone(true); }}>
                <I n="package" size={15} color="#fff" />Confirm
              </Btn>
            </div>
          ) : (
            <div style={{ textAlign:"center",padding:"16px 0" }}>
              <div style={{ width:64,height:64,borderRadius:20,background:th.al,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px" }}>
                <I n="package" size={32} color={th.ac} />
              </div>
              <div style={{ fontWeight:700,fontSize:19,color:th.tx }}>Storage Booked</div>
              <p style={{ fontSize:15,color:th.sub,margin:"8px 0 16px" }}>{sg?.name} · {sf.qty} MT · {sf.days} days</p>
              <Btn full onClick={() => setBkm(null)}>{L.done}</Btn>
            </div>
          )}
        </Modal>
      )}

      {/* Crop insurance modal */}
      {ins && (
        <Modal title="Crop Insurance (PMFBY)" onClose={() => setIns(false)} th={th}>
          {!iDone ? (
            <div>
              <div style={{ background:th.al,borderRadius:12,padding:13,marginBottom:14,fontSize:15,lineHeight:1.75,borderLeft:`3px solid ${th.ac}`,color:th.tx }}>
                PMFBY covers crop loss from natural calamities, pests and disease.
              </div>
              <FL label="Crop" th={th}>
                <Sel th={th} value={iF.crop} onChange={e => setIF(f => ({ ...f,crop:e.target.value }))}>
                  {["Paddy","Wheat","Cotton","Maize","Groundnut","Soybean","Sugarcane"].map(c => <option key={c}>{c}</option>)}
                </Sel>
              </FL>
              <FL label="Season" th={th}>
                <Sel th={th} value={iF.season} onChange={e => setIF(f => ({ ...f,season:e.target.value }))}>
                  {["Kharif","Rabi","Annual"].map(s => <option key={s}>{s}</option>)}
                </Sel>
              </FL>
              <FL label="Farm Area (acres)" th={th}><Inp th={th} type="number" value={iF.area} onChange={e => setIF(f => ({ ...f,area:e.target.value }))} /></FL>
              <FL label="Bank Account Number" th={th}><Inp th={th} value={iF.bank} onChange={e => setIF(f => ({ ...f,bank:e.target.value }))} /></FL>
              {iF.area && (
                <div style={{ background:th.gl,borderRadius:10,padding:11,marginBottom:12,fontSize:15,color:th.gd }}>
                  Premium: <strong>₹{Math.round(iF.area*420)}</strong> · Coverage: <strong>₹{Math.round(iF.area*40000)}</strong>
                </div>
              )}
              <div style={{ display:"flex",gap:10 }}>
                <Btn full onClick={() => { if (!iF.area||!iF.bank) { notify("Fill all fields",true); return; } setIDone(true); }}>
                  <I n="shield" size={15} color="#fff" />Submit
                </Btn>
                <a href="https://pmfby.gov.in" target="_blank" rel="noopener noreferrer" style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"10px 14px",border:`1.5px solid ${th.ac}`,borderRadius:10,color:th.ac,fontSize:14,fontWeight:700,textDecoration:"none",background:th.al,whiteSpace:"nowrap" }}>
                  <I n="extLink" size={14} color={th.ac} />Official
                </a>
              </div>
            </div>
          ) : (
            <div style={{ textAlign:"center",padding:"16px 0" }}>
              <div style={{ width:64,height:64,borderRadius:20,background:th.al,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px" }}>
                <I n="shield" size={32} color={th.ac} />
              </div>
              <div style={{ fontWeight:700,fontSize:19,color:th.tx }}>Insurance Applied!</div>
              <p style={{ fontSize:15,color:th.sub,margin:"8px 0 16px" }}>{iF.crop} · {iF.season} · {iF.area} acres</p>
              <Btn full onClick={() => setIns(false)}>{L.done}</Btn>
            </div>
          )}
        </Modal>
      )}

      {/* Quick health modal */}
      {hlth && (
        <Modal title={L.fHealth} onClose={() => setHlth(false)} th={th}>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14 }}>
            {[[L.bp,"118/76","#dc2626"],[L.sugar,"102 mg/dL","#ea580c"],[L.bmi,"22.4","#16a34a"],[L.checkup,"12 Jul 2025","#2563eb"]].map(([k,v,c]) => (
              <div key={k} style={{ background:c+"0e",borderRadius:12,padding:13,border:`1px solid ${c}28` }}>
                <div style={{ fontSize:13,color:th.mt,marginBottom:4 }}>{k}</div>
                <div style={{ fontWeight:700,color:c,fontSize:16 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ background:th.al,borderRadius:12,padding:14,marginBottom:14 }}>
            <div style={{ fontWeight:700,marginBottom:10,fontSize:16,color:th.ac,display:"flex",gap:7,alignItems:"center" }}>
              <I n="heart" size={15} color={th.ac} />{L.tips}
            </div>
            {["Drink 3L water daily","Wear PPE when spraying","Rest after heavy work","Annual checkups"].map((tip, i) => (
              <div key={i} style={{ fontSize:15,padding:"7px 0",borderBottom:i<3?`1px solid ${th.br}`:"none",display:"flex",gap:9 }}>
                <I n="check" size={14} color={th.ac} /><span style={{ color:th.tx }}>{tip}</span>
              </div>
            ))}
          </div>
          <Btn full onClick={() => { setHlth(false); notify("Reminder set"); }}>
            <I n="bell" size={15} color="#fff" />Set Reminder
          </Btn>
        </Modal>
      )}
    </div>
  );
}
