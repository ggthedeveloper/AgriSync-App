import { useState, useRef } from "react";
import { USERS, AP_REG, OT_REG } from "../data/constants";
import { TR } from "../data/translations";
import { S } from "../utils/storage";
import { I } from "../components/Icons";

export default function Auth({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [lang, setLang] = useState(() => S.get("lang", "en"));
  const L = TR[lang];
  const [fm, setFm] = useState({ name:"", ph:"", pw:"", cpw:"", acres:"", loc:"Guntur", soil:"Black", wsrc:"Canal", farm:"" });
  const [otp, setOtp] = useState(["","","",""]);
  const [genOtp] = useState(() => String(Math.floor(1000 + Math.random() * 9000)));
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const refs = [useRef(), useRef(), useRef(), useRef()];
  const set = (k, v) => { setFm(f => ({ ...f, [k]: v })); setErr(""); };

  const doLogin = () => {
    if (!fm.ph || !fm.pw) return setErr("Please enter mobile and password");
    setBusy(true);
    setTimeout(() => {
      const u = USERS.find(u => u.ph === fm.ph && u.pw === fm.pw);
      u ? onLogin(u, lang) : setErr("Invalid mobile or password");
      setBusy(false);
    }, 1000);
  };

  const doSignup = () => {
    if (!fm.name || !fm.ph || !fm.pw || !fm.cpw) return setErr("Fill all required fields");
    if (fm.ph.length !== 10) return setErr("Enter valid 10-digit number");
    if (fm.pw !== fm.cpw) return setErr("Passwords do not match");
    setBusy(true);
    setTimeout(() => { setBusy(false); setMode("otp"); }, 800);
  };

  const doVerify = () => {
    const v = otp.join("");
    if (v.length < 4) return setErr("Enter complete OTP");
    if (v !== genOtp) return setErr(`Wrong OTP. Hint: ${genOtp}`);
    setBusy(true);
    setTimeout(() => {
      onLogin({ name:fm.name, ph:fm.ph, acres:fm.acres||"5", loc:fm.loc, soil:fm.soil, wsrc:fm.wsrc, farm:fm.farm||fm.name+"'s Farm" }, lang);
      setBusy(false);
    }, 800);
  };

  const otpKey = (i, v) => {
    if (!/^\d*$/.test(v)) return;
    const n = [...otp]; n[i] = v; setOtp(n); setErr("");
    if (v && i < 3) refs[i+1].current.focus();
    if (!v && i > 0) refs[i-1].current.focus();
  };

  const inputSt = { width:"100%", background:"rgba(0,0,0,0.28)", border:"1px solid rgba(255,255,255,0.14)", borderRadius:10, padding:"12px 14px", color:"#fff", fontSize:15, fontFamily:"inherit", outline:"none", boxSizing:"border-box" };
  const lbl = { fontSize:14, fontWeight:600, color:"rgba(255,255,255,0.55)", display:"block", marginBottom:6 };

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(150deg,#071c0a 0%,#0f4020 55%,#071c0a 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans',system-ui,sans-serif", padding:20, overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        * { box-sizing: border-box; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin   { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        button { transition: all 0.18s; }
        button:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
      `}</style>

      {/* Language switcher */}
      <div style={{ position:"absolute", top:18, right:18, display:"flex", gap:5 }}>
        {["en","te","hi"].map(lk => (
          <button key={lk} onClick={() => setLang(lk)} style={{ background:lang===lk?"rgba(29,138,60,0.85)":"rgba(255,255,255,0.1)", border:"none", color:"#fff", borderRadius:8, padding:"5px 12px", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
            {lk==="en" ? "EN" : lk==="te" ? "తె" : "हि"}
          </button>
        ))}
      </div>

      {/* Logo */}
      <div style={{ textAlign:"center", marginBottom:26, animation:"fadeUp 0.5s ease" }}>
        <div style={{ width:64, height:64, borderRadius:20, background:"linear-gradient(135deg,#1d8a3c,#0f5a26)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px", boxShadow:"0 8px 24px rgba(29,138,60,0.35)" }}>
          <I n="leaf" size={32} color="#fff" />
        </div>
        <h1 style={{ fontSize:30, fontWeight:700, color:"#fff", letterSpacing:"-0.5px", margin:0 }}>{L.app}</h1>
        <p style={{ fontSize:15, color:"rgba(255,255,255,0.48)", marginTop:6, marginBottom:0 }}>{L.tag}</p>
      </div>

      {/* Card */}
      <div style={{ background:"rgba(255,255,255,0.05)", backdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:20, padding:24, width:"100%", maxWidth:400, animation:"fadeUp 0.6s ease" }}>

        {/* Tab bar */}
        {mode !== "otp" && (
          <div style={{ display:"flex", background:"rgba(0,0,0,0.25)", borderRadius:10, padding:3, marginBottom:20, gap:2 }}>
            {["login","signup"].map(m => (
              <button key={m} onClick={() => { setMode(m); setErr(""); }} style={{ flex:1, padding:"9px", borderRadius:8, border:"none", fontFamily:"inherit", fontWeight:700, fontSize:15, cursor:"pointer", background:mode===m?"rgba(29,138,60,0.9)":"transparent", color:mode===m?"#fff":"rgba(255,255,255,0.4)" }}>
                {m === "login" ? L.signIn : L.signUp}
              </button>
            ))}
          </div>
        )}

        {/* OTP */}
        {mode === "otp" && (
          <div style={{ textAlign:"center" }}>
            <div style={{ width:56, height:56, borderRadius:16, background:"rgba(29,138,60,0.2)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
              <I n="phone" size={26} color="#4ade80" />
            </div>
            <div style={{ fontWeight:700, color:"#fff", fontSize:18, marginBottom:5 }}>Verify OTP</div>
            <div style={{ fontSize:14, color:"rgba(255,255,255,0.5)", marginBottom:3 }}>Sent to +91 {fm.ph}</div>
            <div style={{ fontSize:14, color:"#fbbf24", marginBottom:20 }}>Demo OTP: <strong>{genOtp}</strong></div>
            <div style={{ display:"flex", gap:10, justifyContent:"center", marginBottom:18 }}>
              {otp.map((v, i) => (
                <input key={i} ref={refs[i]} value={v} maxLength={1} onChange={e => otpKey(i, e.target.value)}
                  style={{ width:56, height:60, textAlign:"center", fontSize:24, fontWeight:700, borderRadius:12, border:`2px solid ${v?"#1d8a3c":"rgba(255,255,255,0.18)"}`, background:"rgba(0,0,0,0.3)", color:"#fff", fontFamily:"inherit", outline:"none" }} />
              ))}
            </div>
            {err && <div style={{ color:"#f87171", fontSize:14, marginBottom:12, background:"rgba(239,68,68,0.1)", borderRadius:8, padding:"8px 12px" }}>{err}</div>}
            <button onClick={doVerify} disabled={busy} style={{ width:"100%", padding:"13px", background:"#1d8a3c", border:"none", borderRadius:12, color:"#fff", fontWeight:700, fontSize:16, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              {busy ? <><I n="refresh" size={17} color="#fff" style={{ animation:"spin 1s linear infinite" }} /> Verifying...</> : <><I n="check" size={17} color="#fff" /> Verify & Continue</>}
            </button>
          </div>
        )}

        {/* Login */}
        {mode === "login" && (
          <div>
            <div style={{ marginBottom:13 }}>
              <label style={lbl}>{L.mobile}</label>
              <div style={{ display:"flex", alignItems:"center", background:"rgba(0,0,0,0.28)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:10, overflow:"hidden" }}>
                <span style={{ padding:"0 13px", color:"rgba(255,255,255,0.38)", fontSize:15, borderRight:"1px solid rgba(255,255,255,0.1)" }}>+91</span>
                <input value={fm.ph} onChange={e => set("ph", e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="9876543210"
                  style={{ flex:1, background:"transparent", border:"none", padding:"13px 14px", color:"#fff", fontSize:16, fontFamily:"inherit", outline:"none" }} />
              </div>
            </div>
            <div style={{ marginBottom:8 }}>
              <label style={lbl}>{L.pwd}</label>
              <div style={{ display:"flex", alignItems:"center", background:"rgba(0,0,0,0.28)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:10, overflow:"hidden" }}>
                <input type={showPw?"text":"password"} value={fm.pw} onChange={e => set("pw", e.target.value)} placeholder="Enter password"
                  style={{ flex:1, background:"transparent", border:"none", padding:"13px 14px", color:"#fff", fontSize:16, fontFamily:"inherit", outline:"none" }} />
                <button onClick={() => setShowPw(v => !v)} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.38)", padding:"0 14px", cursor:"pointer", display:"flex" }}>
                  <I n={showPw?"eyeOff":"eye"} size={16} color="rgba(255,255,255,0.38)" />
                </button>
              </div>
            </div>
            {err && (
              <div style={{ color:"#f87171", fontSize:14, margin:"10px 0", background:"rgba(239,68,68,0.1)", borderRadius:8, padding:"8px 12px", display:"flex", gap:7, alignItems:"center" }}>
                <I n="alert" size={14} color="#f87171" />{err}
              </div>
            )}
            <button onClick={doLogin} disabled={busy} style={{ width:"100%", padding:"13px", background:"linear-gradient(135deg,#1d8a3c,#155e2a)", border:"none", borderRadius:12, color:"#fff", fontWeight:700, fontSize:16, cursor:"pointer", fontFamily:"inherit", marginTop:16, boxShadow:"0 4px 14px rgba(29,138,60,0.3)", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              {busy ? <><I n="refresh" size={17} color="#fff" style={{ animation:"spin 1s linear infinite" }} /> Signing in...</> : <><I n="leaf" size={17} color="#fff" /> {L.signIn}</>}
            </button>
            <div style={{ textAlign:"center", marginTop:14, fontSize:14, color:"rgba(255,255,255,0.3)" }}>
              {L.demo} <span style={{ color:"#fbbf24" }}>9999999999</span> / <span style={{ color:"#fbbf24" }}>farmer123</span>
            </div>
          </div>
        )}

        {/* Sign up */}
        {mode === "signup" && (
          <div>
            {[["name",L.fullName,"text","Gaurav"],["ph",L.mobile,"tel","9876543210"],["farm",L.farmName,"text","Gaurav's Farm"],["acres",L.acres,"number","12"]].map(([k,lb,tp,ph]) => (
              <div key={k} style={{ marginBottom:12 }}>
                <label style={lbl}>{lb}</label>
                <input type={tp} value={fm[k]} onChange={e => set(k, k==="ph" ? e.target.value.replace(/\D/g,"").slice(0,10) : e.target.value)} placeholder={ph} style={inputSt} />
              </div>
            ))}
            <div style={{ marginBottom:12 }}>
              <label style={lbl}>{L.district}</label>
              <select value={fm.loc} onChange={e => set("loc", e.target.value)} style={{ ...inputSt, color:"#fff" }}>
                <optgroup label="AP / Telangana">{AP_REG.map(r => <option key={r} style={{ color:"#000" }}>{r}</option>)}</optgroup>
                <optgroup label="Other">{OT_REG.map(r => <option key={r} style={{ color:"#000" }}>{r}</option>)}</optgroup>
              </select>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
              {[["soil",L.soil,["Black","Red","Sandy","Loamy","Alluvial","Clay"]],["wsrc",L.water,["Canal","Borewell","Rain-fed","River","Pond"]]].map(([k,lb,opts]) => (
                <div key={k}>
                  <label style={{ ...lbl, fontSize:13 }}>{lb}</label>
                  <select value={fm[k]} onChange={e => set(k, e.target.value)} style={{ ...inputSt, color:"#fff", fontSize:14, padding:"10px 12px" }}>
                    {opts.map(o => <option key={o} style={{ color:"#000" }}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
            {[["pw",L.pwd],["cpw",L.confirmPwd]].map(([k,lb]) => (
              <div key={k} style={{ marginBottom:12 }}>
                <label style={lbl}>{lb}</label>
                <input type="password" value={fm[k]} onChange={e => set(k, e.target.value)} placeholder="••••••••" style={inputSt} />
              </div>
            ))}
            {err && (
              <div style={{ color:"#f87171", fontSize:14, marginBottom:12, background:"rgba(239,68,68,0.1)", borderRadius:8, padding:"8px 12px", display:"flex", gap:7, alignItems:"center" }}>
                <I n="alert" size={14} color="#f87171" />{err}
              </div>
            )}
            <button onClick={doSignup} disabled={busy} style={{ width:"100%", padding:"13px", background:"linear-gradient(135deg,#1d8a3c,#155e2a)", border:"none", borderRadius:12, color:"#fff", fontWeight:700, fontSize:16, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 4px 14px rgba(29,138,60,0.3)", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              {busy ? <><I n="refresh" size={17} color="#fff" style={{ animation:"spin 1s linear infinite" }} /> Creating...</> : <><I n="user" size={17} color="#fff" /> {L.createAcc}</>}
            </button>
          </div>
        )}
      </div>
      <p style={{ marginTop:20, fontSize:13, color:"rgba(255,255,255,0.2)", textAlign:"center" }}>Secured · Data.gov.in · Made for Indian Farmers</p>
    </div>
  );
}
