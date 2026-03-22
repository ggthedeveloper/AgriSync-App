import Footer from "./components/Footer";
import { useState, useRef, useCallback } from "react";
import { TR } from "./data/translations";
import { PLANS, PORDER, PAGEPLANS, WEATHER, LCROPS, DIAG, POSTS0, AP_REG, OT_REG } from "./data/constants";
import { S } from "./utils/storage";
import { TH } from "./utils/theme";
import { I } from "./components/Icons";
import { Modal, Btn, Inp, Sel, FL, Bdg, SL } from "./components/UI";
import PayModal from "./components/PayModal";
import UpGate from "./components/UpgradeGate";

import Dashboard  from "./pages/Dashboard";
import Diagnose   from "./pages/Diagnose";
import Advisor    from "./pages/Advisor";
import Market     from "./pages/Market";
import Community  from "./pages/Community";
import Health     from "./pages/Health";
import Hub        from "./pages/Hub";

export default function App({ user, onLogout, initLang }) {
  const [lang, setLang]   = useState(() => S.get("lang", initLang || "en"));
  const L  = TR[lang];
  const [dark, setDark]   = useState(() => S.get("dark", false));
  const [offline, setOffline] = useState(false);
  const [nav, setNav]     = useState("dashboard");
  const [toast, setToast] = useState(null);
  const th = TH(dark);

  // ── Subscription ──────────────────────────────────────────────────────────
  const [sub, setSubS] = useState(() => S.get("sub", "free"));
  const setSub = v => { setSubS(v); S.set("sub", v); };
  const [payM, setPayM] = useState(null);

  // ── Farm profile ──────────────────────────────────────────────────────────
  const [farm, setFarmS] = useState(() => S.get("farm", {
    name:   user.farm  || user.name + "'s Farm",
    loc:    user.loc   || "Guntur",
    acres:  user.acres || "12",
    soil:   user.soil  || "Black",
    wsrc:   user.wsrc  || "Canal",
    season: "Kharif",
    lat: null, lng: null, gps: false,
  }));
  const setFarm = useCallback(v => {
    setFarmS(p => { const n = typeof v === "function" ? v(p) : v; S.set("farm", n); return n; });
  }, []);
  const WT    = WEATHER[farm.loc]  || WEATHER.default;
  const crops = LCROPS[farm.loc]   || LCROPS.default;

  // ── Diagnose ──────────────────────────────────────────────────────────────
  const [dImg,  setDImg]  = useState(null);
  const [dBusy, setDBusy] = useState(false);
  const [dRes,  setDRes]  = useState(() => S.get("diag", null));
  const fRef = useRef();

  const upload = e => {
    const f = e.target.files[0]; if (!f) return;
    setDImg(URL.createObjectURL(f)); setDRes(null); setDBusy(true);
    setTimeout(() => {
      const r = DIAG[Math.floor(Math.random() * DIAG.length)];
      setDBusy(false); setDRes(r); S.set("diag", r);
    }, 2400);
  };

  // ── Advisor ───────────────────────────────────────────────────────────────
  const [advDone, setAdvDone] = useState(() => S.get("adv", false));
  const [advBusy, setAdvBusy] = useState(false);
  const [fp,  setFpS]  = useState(() => S.get("fp", []));
  const setFp = v => { const n = typeof v === "function" ? v(fp) : v; setFpS(n); S.set("fp", n); };

  // ── Community ─────────────────────────────────────────────────────────────
  const [posts, setPostsS] = useState(() => S.get("posts", POSTS0));
  const setPosts = v => { const n = typeof v === "function" ? v(posts) : v; setPostsS(n); S.set("posts", n); };

  // ── Hub / Cart ────────────────────────────────────────────────────────────
  const [cart, setCartS] = useState(() => S.get("cart", []));
  const setCart = v => { const n = typeof v === "function" ? v(cart) : v; setCartS(n); S.set("cart", n); };

  // ── Farm profile modal ────────────────────────────────────────────────────
  const [profOpen, setProfOpen] = useState(false);
  const [ef, setEf]             = useState(null);
  const [gpsLoad, setGpsLoad]   = useState(false);
  const [gpsErr,  setGpsErr]    = useState("");

  const notify = (msg, err = false) => {
    setToast({ msg, err });
    setTimeout(() => setToast(null), 3200);
  };

  const detectGPS = () => {
    if (!navigator.geolocation) { setGpsErr("Geolocation not supported."); return; }
    setGpsLoad(true); setGpsErr("");
    navigator.geolocation.getCurrentPosition(
      async pos => {
        const { latitude: lat, longitude: lng } = pos.coords;
        try {
          const r = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
          const d = await r.json();
          const city = d.address?.city || d.address?.town || d.address?.village || "";
          const m = [...AP_REG, ...OT_REG].find(r => city.toLowerCase().includes(r.toLowerCase())) || city || "Unknown";
          setEf(f => ({ ...f, loc:m, lat, lng, gps:true }));
          setGpsLoad(false); notify(`Located: ${m}`);
        } catch { setGpsLoad(false); setGpsErr("Could not resolve location."); }
      },
      e => { setGpsLoad(false); setGpsErr(e.code === 1 ? "Permission denied." : "Location error."); },
      { timeout: 10000 }
    );
  };

  // Navigate with plan gate
  const goTo = key => {
    const al = PAGEPLANS[key] || PORDER;
    const si = PORDER.indexOf(sub);
    if (al.some(p => PORDER.indexOf(p) <= si)) { setNav(key); return; }
    setPayM(al[0]);
  };

  // ── Location bar ──────────────────────────────────────────────────────────
  const LocBar = () => (
    <div style={{ background:th.al,border:`1px solid ${th.ac}30`,borderRadius:12,padding:"11px 14px",marginBottom:14,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
      <div style={{ display:"flex",gap:10,alignItems:"center" }}>
        <div style={{ width:36,height:36,borderRadius:10,background:th.as,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
          <I n={farm.gps?"nav":"map"} size={17} color={th.ac} />
        </div>
        <div>
          <div style={{ fontSize:15,fontWeight:700,color:th.tx }}>{farm.name}</div>
          <div style={{ fontSize:13,color:th.sub }}>{farm.loc} · {farm.acres} ac · {farm.soil} · {farm.wsrc}</div>
        </div>
      </div>
      <button onClick={() => { setEf({ ...farm }); setGpsErr(""); setProfOpen(true); }}
        style={{ background:th.sa,border:`1px solid ${th.br}`,borderRadius:8,padding:"6px 12px",cursor:"pointer",color:th.sub,display:"flex",alignItems:"center",gap:5,fontSize:13,fontWeight:700,fontFamily:"inherit" }}>
        <I n="edit" size={13} color={th.sub} /> Edit
      </button>
    </div>
  );

  // ── Farm profile editor modal ─────────────────────────────────────────────
  const FarmModal = () => {
    const d = ef;
    const sd = (k, v) => setEf(f => ({ ...f, [k]: v }));
    return (
      <Modal title={L.editFarm} onClose={() => setProfOpen(false)} th={th}>
        <div style={{ background:th.al,borderRadius:12,padding:14,marginBottom:16,border:`1px solid ${th.ac}30` }}>
          <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8 }}>
            <I n="nav" size={16} color={th.ac} />
            <span style={{ fontWeight:700,fontSize:16,color:th.tx }}>Live GPS</span>
            {d.gps && d.lat && <Bdg color={th.ac}>Active</Bdg>}
          </div>
          {d.gps && d.lat && <div style={{ fontSize:12,color:th.sub,marginBottom:8,fontFamily:"monospace" }}>{d.lat.toFixed(5)}, {d.lng.toFixed(5)}</div>}
          <Btn full onClick={detectGPS} disabled={gpsLoad}>
            {gpsLoad
              ? <><I n="refresh" size={15} color="#fff" style={{ animation:"spin 1s linear infinite" }} /> Detecting...</>
              : <><I n="radio" size={15} color="#fff" /> {L.gps}</>
            }
          </Btn>
          {gpsErr && (
            <div style={{ fontSize:13,color:th.dg,marginTop:8,padding:"7px 10px",background:th.dl,borderRadius:8,display:"flex",gap:6 }}>
              <I n="alert" size={13} color={th.dg} />{gpsErr}
            </div>
          )}
        </div>
        <FL label={L.district} th={th}>
          <Sel th={th} value={d.loc} onChange={e => sd("loc", e.target.value)}>
            <optgroup label="AP / Telangana">{AP_REG.map(r => <option key={r}>{r}</option>)}</optgroup>
            <optgroup label="Other">{OT_REG.map(r => <option key={r}>{r}</option>)}</optgroup>
          </Sel>
        </FL>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:2 }}>
          <FL label={L.farmName} th={th}><Inp th={th} value={d.name} onChange={e => sd("name", e.target.value)} /></FL>
          <FL label={L.acres}    th={th}><Inp th={th} type="number" value={d.acres} onChange={e => sd("acres", e.target.value)} /></FL>
          <FL label={L.soil}     th={th}>
            <Sel th={th} value={d.soil} onChange={e => sd("soil", e.target.value)}>
              {["Black","Red","Sandy","Loamy","Alluvial","Clay"].map(s => <option key={s}>{s}</option>)}
            </Sel>
          </FL>
          <FL label={L.water}    th={th}>
            <Sel th={th} value={d.wsrc} onChange={e => sd("wsrc", e.target.value)}>
              {["Canal","Borewell","Rain-fed","River","Pond"].map(s => <option key={s}>{s}</option>)}
            </Sel>
          </FL>
        </div>
        <FL label="Season" th={th}>
          <Sel th={th} value={d.season} onChange={e => sd("season", e.target.value)}>
            {["Kharif","Rabi","Zaid","Annual"].map(s => <option key={s}>{s}</option>)}
          </Sel>
        </FL>
        <div style={{ display:"flex",gap:10,marginTop:4 }}>
          <Btn outline onClick={() => setProfOpen(false)} style={{ flex:1 }}>
            <I n="x" size={15} color={th.ac} />{L.cancel}
          </Btn>
          <Btn onClick={() => { setFarm(ef); setProfOpen(false); setAdvDone(false); notify("Farm profile saved"); }} style={{ flex:2 }}>
            <I n="save" size={15} color="#fff" />{L.saveF}
          </Btn>
        </div>
      </Modal>
    );
  };

  // ── Page registry ─────────────────────────────────────────────────────────
  const sharedProps = { th, L, farm, WT, crops, notify };

  const pages = {
    dashboard: (
      <Dashboard {...sharedProps}
        user={user} offline={offline}
        sub={sub} setSub={setSub} payM={payM} setPayM={setPayM} goTo={goTo}
        setEf={setEf} setGpsErr={setGpsErr} setProfOpen={setProfOpen}
      />
    ),
    diagnose: (
      <Diagnose {...sharedProps}
        dImg={dImg} setDImg={setDImg} dBusy={dBusy} dRes={dRes} setDRes={setDRes}
        fRef={fRef} upload={upload}
      />
    ),
    advisor: (
      <Advisor {...sharedProps}
        advBusy={advBusy} setAdvBusy={setAdvBusy}
        advDone={advDone} setAdvDone={setAdvDone}
        fp={fp} setFp={setFp}
      />
    ),
    market:    <Market    {...sharedProps} />,
    community: <Community {...sharedProps} user={user} posts={posts} setPosts={setPosts} />,
    health:    <Health    {...sharedProps} />,
    hub:       <Hub       {...sharedProps} user={user} cart={cart} setCart={setCart} />,
  };

  const NAV = [
    { k:"dashboard", lb:L.dash,   n:"home"     },
    { k:"diagnose",  lb:L.diag,   n:"search"   },
    { k:"advisor",   lb:L.adv,    n:"cpu"      },
    { k:"market",    lb:L.mkt,    n:"barChart" },
    { k:"health",    lb:L.health, n:"heart"    },
    { k:"community", lb:L.comm,   n:"users"    },
    { k:"hub",       lb:L.hub,    n:"cart"     },
  ];

  return (
    <div style={{ minHeight:"100vh", background:th.bg, color:th.tx, fontFamily:"'DM Sans',system-ui,sans-serif", transition:"background 0.3s,color 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width:4px; height:4px; }
        ::-webkit-scrollbar-thumb { background:#1d8a3c44; border-radius:4px; }
        @keyframes spin    { from{transform:rotate(0)}         to{transform:rotate(360deg)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        button:hover:not(:disabled) { opacity:0.88; transform:translateY(-1px); }
        select { outline:none; cursor:pointer; }
        a:hover { opacity:0.88; }
      `}</style>

      {/* ── Topbar ── */}
      <div style={{ background:dark?"#0b1a0e":"#0f5a26", height:56, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 16px", position:"sticky", top:0, zIndex:100, boxShadow:"0 1px 8px rgba(0,0,0,0.2)" }}>
        <div style={{ display:"flex",alignItems:"center",gap:9 }}>
          <div style={{ width:32,height:32,borderRadius:9,background:"rgba(255,255,255,0.14)",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <I n="leaf" size={18} color="#fff" />
          </div>
          <span style={{ fontSize:19,fontWeight:700,color:"#fff",letterSpacing:"-0.3px" }}>{L.app}</span>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:6 }}>
          {/* Language */}
          <div style={{ display:"flex",gap:3,background:"rgba(0,0,0,0.2)",borderRadius:20,padding:2 }}>
            {["en","te","hi"].map(lk => (
              <button key={lk} onClick={() => { setLang(lk); S.set("lang", lk); }}
                style={{ background:lang===lk?"rgba(29,138,60,0.9)":"transparent", border:"none", color:"#fff", borderRadius:16, padding:"3px 9px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                {lk==="en" ? "EN" : lk==="te" ? "తె" : "हि"}
              </button>
            ))}
          </div>
          {/* Location pill */}
          <button onClick={() => { setEf({ ...farm }); setGpsErr(""); setProfOpen(true); }}
            style={{ background:"rgba(255,255,255,0.12)",border:"none",borderRadius:16,padding:"4px 10px",color:"#fff",fontSize:13,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:5 }}>
            <I n={farm.gps?"nav":"map"} size={12} color="#fff" />
            <span style={{ maxWidth:70,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{farm.loc}</span>
          </button>
          {/* Offline toggle */}
          <button onClick={() => setOffline(v => !v)}
            style={{ background:"rgba(255,255,255,0.12)",border:"none",borderRadius:16,padding:"5px 9px",color:"#fff",cursor:"pointer",display:"flex",alignItems:"center" }}>
            <I n={offline?"wifiOff":"wifi"} size={15} color="#fff" />
          </button>
          {/* Dark mode */}
          <button onClick={() => setDark(v => !v)}
            style={{ background:"rgba(255,255,255,0.12)",border:"none",borderRadius:16,padding:"5px 9px",color:"#fff",cursor:"pointer",display:"flex",alignItems:"center" }}>
            <I n={dark?"sun":"moon"} size={15} color="#fff" />
          </button>
          {/* Logout */}
          <button onClick={onLogout}
            style={{ background:"rgba(220,50,40,0.22)",border:"1px solid rgba(220,50,40,0.35)",borderRadius:16,padding:"5px 9px",color:"#fff",cursor:"pointer",display:"flex",alignItems:"center" }}>
            <I n="logout" size={15} color="#fff" />
          </button>
        </div>
      </div>

      {/* ── Plan banner ── */}
      <div style={{ background:PLANS[sub].color+"12",borderBottom:`1px solid ${PLANS[sub].color}22`,padding:"6px 16px",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <div style={{ display:"flex",gap:7,alignItems:"center" }}>
          <I n="award" size={14} color={PLANS[sub].color} />
          <span style={{ fontSize:13,fontWeight:700,color:PLANS[sub].color }}>{sub.charAt(0).toUpperCase()+sub.slice(1)} Plan</span>
        </div>
        {sub === "free" && (
          <button onClick={() => setPayM("basic")}
            style={{ background:PLANS.basic.color,border:"none",borderRadius:8,padding:"4px 12px",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:5 }}>
            <I n="zap" size={12} color="#fff" />Upgrade
          </button>
        )}
      </div>

      {/* ── Nav tabs ── */}
      <div style={{ background:th.sf,borderBottom:`1px solid ${th.br}`,display:"flex",overflowX:"auto",scrollbarWidth:"none" }}>
        {NAV.map(({ k, lb, n }) => (
          <button key={k} onClick={() => goTo(k)}
            style={{ padding:"12px 14px",cursor:"pointer",fontSize:13,fontWeight:600,borderBottom:`2.5px solid ${nav===k?th.ac:"transparent"}`,color:nav===k?th.ac:th.sub,whiteSpace:"nowrap",background:"transparent",border:"none",fontFamily:"inherit",display:"flex",alignItems:"center",gap:5,transition:"all 0.18s" }}>
            <I n={n} size={14} color={nav===k?th.ac:th.sub} />{lb}
          </button>
        ))}
      </div>

    {/* ── Page content ── */}
<div style={{ padding:"16px 14px", maxWidth:840, margin:"0 auto", minHeight: "70vh" }}>
  <UpGate navKey={nav} sub={sub} L={L} th={th} onUpgrade={setSub}>
    {nav === "dashboard" || nav === "diagnose" || nav === "advisor"
      ? (() => {
          const PageComp = { dashboard:Dashboard, diagnose:Diagnose, advisor:Advisor }[nav];
          const extraProps = {
            dashboard: { user, offline, sub, setSub, payM, setPayM, goTo, setEf, setGpsErr, setProfOpen, LocBar },
            diagnose:  { dImg, setDImg, dBusy, dRes, setDRes, fRef, upload, LocBar },
            advisor:   { advBusy, setAdvBusy, advDone, setAdvDone, fp, setFp, LocBar },
          }[nav];
          return <PageComp {...sharedProps} {...extraProps} />;
        })()
      : pages[nav]
    }
  </UpGate>

  {/* ✅ Footer added here */}
  <Footer th={th} />
</div>

      {/* ── Toast ── */}
      {toast && (
        <div style={{ position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:toast.err?th.dg:th.ac,color:"#fff",borderRadius:11,padding:"11px 20px",fontSize:15,fontWeight:700,zIndex:9999,boxShadow:"0 4px 20px rgba(0,0,0,0.25)",animation:"slideUp 0.25s ease",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:8 }}>
          <I n={toast.err?"alert":"check"} size={15} color="#fff" />{toast.msg}
        </div>
      )}

      {/* ── Global pay modal ── */}
      {payM && <PayModal planKey={payM} th={th} L={L} onSuccess={() => setSub(payM)} onClose={() => setPayM(null)} />}

      {/* ── Farm profile modal ── */}
      {profOpen && ef && <FarmModal />}
    </div>
  );
}
