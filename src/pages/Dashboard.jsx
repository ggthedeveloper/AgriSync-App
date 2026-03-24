import { PLANS } from "../data/constants";
import { I, WIco } from "../components/Icons";
import { Card, SL, Bar, Bdg, Btn } from "../components/UI";
import PayModal from "../components/PayModal";

export default function Dashboard({ th, L, user, farm, WT, crops, offline, sub, setSub, payM, setPayM, goTo, setEf, setGpsErr, setProfOpen, notify }) {
  return (
    <div>
      {offline && (
        <div style={{ background:th.gl,border:`1px solid ${th.gd}`,borderRadius:10,padding:"10px 14px",marginBottom:12,fontSize:14,color:th.gd,display:"flex",gap:7,alignItems:"center" }}>
          <I n="wifiOff" size={15} color={th.gd} />{L.offline}
        </div>
      )}
      <div style={{ marginBottom:14 }}>
        <h2 style={{ fontSize:22,fontWeight:700,margin:"0 0 4px",color:th.tx }}>{L.morning}, {user.name.split(" ")[0]}</h2>
        <p style={{ fontSize:14,color:th.sub,margin:0 }}>{farm.name} · {farm.loc} · {farm.acres} acres</p>
      </div>


        {/* Alerts */}
      <Card th={th}>
        <SL th={th}>{L.alerts}</SL>
        {[
          { msg: WT.r>40 ? `Heavy rain (${WT.r}%) — delay spraying` : `Rain ${WT.r}% — check irrigation`, c:"#2563eb" },
          { msg: WT.h>70 ? `High humidity (${WT.h}%) — fungal risk` : `Humidity OK (${WT.h}%)`,          c: WT.h>70 ? "#ea580c" : "#16a34a" },
          { msg: "Fertilization recommended this week based on soil NPK", c:"#16a34a" },
        ].map(({ msg, c }, i) => (
          <div key={i} style={{ display:"flex",gap:9,alignItems:"flex-start",marginBottom:i<2?9:0,padding:"9px 11px",background:c+"12",borderRadius:9,borderLeft:`3px solid ${c}` }}>
            <I n="alert" size={14} color={c} /><span style={{ fontSize:14,color:th.tx,lineHeight:1.5 }}>{msg}</span>
          </div>
        ))}
      </Card>


      {/* Weather */}
      <Card th={th}>
        <SL th={th}>{L.weather} — {farm.loc}</SL>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:14 }}>
          <div>
            <div style={{ fontSize:44,fontWeight:700,color:th.tx,lineHeight:1 }}>{WT.t}°C</div>
            <div style={{ fontSize:15,fontWeight:600,color:th.sub,marginTop:4 }}>{WT.c}</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ display:"flex",alignItems:"center",gap:5,justifyContent:"flex-end",marginBottom:5,fontSize:14,color:th.sub }}><I n="droplets" size={14} color="#38bdf8" />{WT.h}%</div>
            <div style={{ display:"flex",alignItems:"center",gap:5,justifyContent:"flex-end",marginBottom:5,fontSize:14,color:th.sub }}><I n="wind" size={14} color="#94a3b8" />{WT.w} km/h</div>
            <div style={{ display:"flex",alignItems:"center",gap:5,justifyContent:"flex-end",fontSize:14,color:th.sub }}><I n="cloudRain" size={14} color="#60a5fa" />{WT.r}% rain</div>
          </div>
        </div>
        <div style={{ display:"flex",gap:7,borderTop:`1px solid ${th.br}`,paddingTop:12 }}>
          {WT.f.map(([d, tmp, ic], i) => (
            <div key={d} style={{ flex:1,textAlign:"center",background:i===0?th.al:"transparent",borderRadius:9,padding:"7px 4px" }}>
              <div style={{ fontSize:11,color:th.mt,marginBottom:4 }}>{d}</div>
              <div style={{ display:"flex",justifyContent:"center",marginBottom:4 }}><WIco type={ic} size={17} /></div>
              <div style={{ fontSize:13,fontWeight:700,color:th.tx }}>{tmp}°</div>
            </div>
          ))}
        </div>
        <button onClick={() => { setEf({ ...farm }); setGpsErr(""); setProfOpen(true); }} style={{ width:"100%",marginTop:12,padding:"8px",background:"transparent",border:`1px solid ${th.ac}40`,borderRadius:8,color:th.ac,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:6 }}>
          <I n="nav" size={13} color={th.ac} /> Update location for accurate forecast
        </button>
      </Card>

      {/* Soil */}
      <Card th={th}>
        <SL th={th}>{L.soilH} · {farm.soil} Soil</SL>
        {[["Nitrogen (N)",72,"#16a34a"],["Phosphorus (P)",58,"#ea580c"],["Potassium (K)",85,"#2563eb"],["pH Level",68,"#7c3aed",6.8]].map(([nm,v,c,disp]) => (
          <div key={nm} style={{ marginBottom:12 }}>
            <div style={{ display:"flex",justifyContent:"space-between",fontSize:14,marginBottom:3 }}>
              <span style={{ fontWeight:500,color:th.sub }}>{nm}</span>
              <span style={{ fontWeight:700,color:c }}>{disp||v+"%"}</span>
            </div>
            <Bar value={v} color={c} th={th} />
          </div>
        ))}
      </Card>

      {/* Recommended crops */}
      <Card th={th}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
          <SL th={th}>{L.recCrops} — {farm.loc}</SL>
          <button onClick={() => goTo("advisor")} style={{ background:"none",border:"none",color:th.ac,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:4 }}>
            All <I n="chevRight" size={14} color={th.ac} />
          </button>
        </div>
        {crops.slice(0,2).map((c, i) => (
          <div key={c.name} style={{ display:"flex",alignItems:"center",gap:12,marginBottom:i===0?12:0,paddingBottom:i===0?12:0,borderBottom:i===0?`1px solid ${th.br}`:"none" }}>
            <div style={{ width:42,height:42,borderRadius:11,background:c.c+"22",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
              <I n="wheat" size={22} color={c.c} />
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700,fontSize:15,color:th.tx }}>{c.name}</div>
              <div style={{ fontSize:13,color:th.sub }}>{c.season} · {c.profit}</div>
              <Bar value={c.s} color={c.c} th={th} />
            </div>
            <Bdg color={c.c}>{c.s}%</Bdg>
          </div>
        ))}
      </Card>

    

      {/* Subscription */}
      <Card th={th}>
        <SL th={th}>{L.plan}</SL>
        <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
          {Object.entries(PLANS).map(([k, p]) => (
            <div key={k} onClick={() => { if(k===sub) return; if(p.price===0){setSub(k);notify(`Switched to ${k} plan`);}else setPayM(k); }}
              style={{ flex:1,minWidth:90,padding:13,borderRadius:12,border:`2px solid ${sub===k?p.color:th.br}`,background:sub===k?p.color+"12":"transparent",cursor:"pointer",transition:"all 0.18s" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4 }}>
                <span style={{ fontWeight:800,fontSize:15,color:sub===k?p.color:th.tx }}>{k.charAt(0).toUpperCase()+k.slice(1)}</span>
                {sub===k && <I n="check" size={14} color={p.color} />}
              </div>
              <div style={{ fontSize:17,fontWeight:700,color:th.gd }}>
                {p.price===0 ? "Free" : "₹"+p.price.toLocaleString()}{p.price>0 && <span style={{ fontSize:12,color:th.mt }}>/mo</span>}
              </div>
              {sub===k && <div style={{ marginTop:6 }}><Bdg color={p.color}>Active</Bdg></div>}
            </div>
          ))}
        </div>
      </Card>

      {payM && <PayModal planKey={payM} th={th} L={L} onSuccess={() => setSub(payM)} onClose={() => setPayM(null)} />}
    </div>
  );
}
