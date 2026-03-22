import { useState } from "react";
import { INS_SCH, LOANS } from "../data/constants";
import { I } from "../components/Icons";
import { Card, Modal, Btn } from "../components/UI";

export default function Health({ th, L, notify }) {
  const [htab, setHtab] = useState("tracker");
  const [insM, setInsM] = useState(null);
  const [loanM, setLoanM] = useState(null);

  return (
    <div>
      <h2 style={{ fontSize:22,fontWeight:700,margin:"0 0 5px",color:th.tx }}>{L.fHealth}</h2>
      <p style={{ fontSize:15,color:th.sub,margin:"0 0 14px" }}>Health tracker, insurance & loan schemes</p>

      <div style={{ display:"flex",gap:7,marginBottom:16 }}>
        {[["tracker",L.tracker,"heart"],["insurance",L.insurance,"shield"],["loan",L.loan,"dollar"]].map(([k,v,ic]) => (
          <button key={k} onClick={() => setHtab(k)} style={{ flex:1,padding:"10px 6px",borderRadius:10,border:`1.5px solid ${htab===k?th.ac:th.br}`,background:htab===k?th.al:"transparent",color:htab===k?th.ac:th.sub,fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit",display:"flex",flexDirection:"column",alignItems:"center",gap:4,transition:"all 0.18s" }}>
            <I n={ic} size={16} color={htab===k?th.ac:th.sub} />{v.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* ── TRACKER ── */}
      {htab === "tracker" && (
        <div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14 }}>
            {[[L.bp,"118/76 mmHg","#dc2626"],[L.sugar,"102 mg/dL","#ea580c"],[L.bmi,"22.4 (Normal)","#16a34a"],[L.checkup,"12 Jul 2025","#2563eb"]].map(([k,v,c]) => (
              <div key={k} style={{ background:c+"0e",borderRadius:13,padding:15,border:`1px solid ${c}28` }}>
                <div style={{ fontSize:13,color:th.mt,marginBottom:6 }}>{k}</div>
                <div style={{ fontWeight:700,color:c,fontSize:16 }}>{v}</div>
              </div>
            ))}
          </div>
          <Card th={th}>
            <div style={{ display:"flex",gap:7,alignItems:"center",marginBottom:12 }}>
              <I n="heart" size={16} color={th.ac} />
              <span style={{ fontWeight:700,fontSize:16,color:th.tx }}>{L.tips}</span>
            </div>
            {["Drink 3 litres of water daily during field work","Wear gloves and mask when applying pesticides","Use proper PPE during all spray operations","Take 30-minute rest after strenuous field activity","Schedule annual eye, hearing and BP checkups","Wash hands thoroughly before eating meals"].map((tip, i) => (
              <div key={i} style={{ fontSize:15,padding:"8px 0",borderBottom:i<5?`1px solid ${th.br}`:"none",display:"flex",gap:9 }}>
                <I n="check" size={14} color={th.ac} /><span style={{ color:th.tx }}>{tip}</span>
              </div>
            ))}
          </Card>
          <Card th={th}>
            <div style={{ display:"flex",gap:7,alignItems:"center",marginBottom:12 }}>
              <I n="activity" size={16} color="#2563eb" />
              <span style={{ fontWeight:700,fontSize:16,color:th.tx }}>Medical Support Schemes</span>
            </div>
            {[
              { name:"PM Jan Arogya Yojana (PMJAY)", benefit:"Free hospital cover up to ₹5 lakh/year", url:"https://pmjay.gov.in" },
              { name:"Ayushman Bharat",               benefit:"₹5L free hospitalization",              url:"https://pmjay.gov.in" },
              { name:"Kisan Suvidha Helpline",        benefit:"24/7 free advisory",                    url:"https://kisansuvidha.gov.in" },
            ].map(sc => (
              <div key={sc.name} style={{ borderBottom:`1px solid ${th.br}`,paddingBottom:12,marginBottom:12 }}>
                <div style={{ fontWeight:700,fontSize:15,color:th.tx,marginBottom:3 }}>{sc.name}</div>
                <div style={{ fontSize:15,color:th.ac,fontWeight:600,marginBottom:8 }}>{sc.benefit}</div>
                <a href={sc.url} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"8px 14px",border:`1.5px solid ${th.ac}`,borderRadius:9,color:th.ac,fontSize:14,fontWeight:700,textDecoration:"none",background:th.al }}>
                  <I n="extLink" size={13} color={th.ac} />{L.official}
                </a>
              </div>
            ))}
          </Card>
          <Btn full onClick={() => notify("Checkup reminder set")}>
            <I n="bell" size={15} color="#fff" />Set Checkup Reminder
          </Btn>
        </div>
      )}

      {/* ── INSURANCE ── */}
      {htab === "insurance" && (
        <div>
          {INS_SCH.map(sc => (
            <Card th={th} key={sc.name} onClick={() => setInsM(sc)} style={{ marginBottom:10,cursor:"pointer" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                <div>
                  <div style={{ fontWeight:700,fontSize:16,color:th.tx,marginBottom:3 }}>{sc.name}</div>
                  <div style={{ fontSize:15,color:th.ac,fontWeight:600,marginBottom:3 }}>{sc.coverage}</div>
                  <div style={{ fontSize:14,color:th.mt }}>Premium: {sc.premium}</div>
                </div>
                <I n="chevRight" size={18} color={th.mt} />
              </div>
            </Card>
          ))}
          {insM && (
            <Modal title={insM.name} onClose={() => setInsM(null)} th={th}>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14 }}>
                {[["Coverage",insM.coverage],["Premium",insM.premium]].map(([k,v]) => (
                  <div key={k} style={{ background:th.sa,borderRadius:11,padding:13,border:`1px solid ${th.br}` }}>
                    <div style={{ fontSize:13,color:th.mt,marginBottom:3 }}>{k}</div>
                    <div style={{ fontWeight:700,color:th.ac,fontSize:16 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ background:th.al,borderRadius:12,padding:14,marginBottom:14,borderLeft:`3px solid ${th.ac}` }}>
                <p style={{ fontSize:15,lineHeight:1.75,margin:0,color:th.tx }}>{insM.desc}</p>
              </div>
              <div style={{ display:"flex",gap:10 }}>
                <Btn full onClick={() => { setInsM(null); notify(`${insM.name} applied`); }}>Apply Now</Btn>
                <a href={insM.url} target="_blank" rel="noopener noreferrer" style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:7,padding:"10px 14px",border:`1.5px solid ${th.ac}`,borderRadius:10,color:th.ac,fontSize:15,fontWeight:700,textDecoration:"none",background:th.al }}>
                  <I n="extLink" size={14} color={th.ac} />{L.official}
                </a>
              </div>
            </Modal>
          )}
        </div>
      )}

      {/* ── LOAN ── */}
      {htab === "loan" && (
        <div>
          {LOANS.map(sc => (
            <Card th={th} key={sc.name} onClick={() => setLoanM(sc)} style={{ marginBottom:10,cursor:"pointer" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                <div>
                  <div style={{ fontWeight:700,fontSize:16,color:th.tx,marginBottom:3 }}>{sc.name}</div>
                  <div style={{ fontSize:15,color:th.ac,fontWeight:600,marginBottom:3 }}>{sc.rate} · Up to {sc.max}</div>
                  <div style={{ fontSize:14,color:th.mt }}>Tenure: {sc.tenure}</div>
                </div>
                <I n="chevRight" size={18} color={th.mt} />
              </div>
            </Card>
          ))}
          {loanM && (
            <Modal title={loanM.name} onClose={() => setLoanM(null)} th={th}>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14 }}>
                {[["Interest",loanM.rate],["Max",loanM.max],["Tenure",loanM.tenure]].map(([k,v]) => (
                  <div key={k} style={{ background:th.sa,borderRadius:11,padding:13,border:`1px solid ${th.br}` }}>
                    <div style={{ fontSize:13,color:th.mt,marginBottom:3 }}>{k}</div>
                    <div style={{ fontWeight:700,color:th.ac,fontSize:15 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ background:th.al,borderRadius:12,padding:14,marginBottom:14,borderLeft:`3px solid ${th.ac}` }}>
                <p style={{ fontSize:15,lineHeight:1.75,margin:0,color:th.tx }}>{loanM.desc}</p>
              </div>
              <div style={{ display:"flex",gap:10 }}>
                <Btn full onClick={() => { setLoanM(null); notify("Application started"); }}>Apply for Loan</Btn>
                <a href={loanM.url} target="_blank" rel="noopener noreferrer" style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:7,padding:"10px 14px",border:`1.5px solid ${th.ac}`,borderRadius:10,color:th.ac,fontSize:15,fontWeight:700,textDecoration:"none",background:th.al }}>
                  <I n="extLink" size={14} color={th.ac} />{L.official}
                </a>
              </div>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
}
