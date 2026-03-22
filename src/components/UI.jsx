import { I } from "./Icons";

export const Modal = ({ title, onClose, children, th }) => (
  <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:3000,display:"flex",alignItems:"flex-end",justifyContent:"center" }} onClick={onClose}>
    <div onClick={e => e.stopPropagation()} style={{ background:th.sf,color:th.tx,borderRadius:"20px 20px 0 0",width:"100%",maxWidth:560,maxHeight:"90vh",overflowY:"auto",fontFamily:"inherit" }}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 20px 14px",borderBottom:`1px solid ${th.br}`,position:"sticky",top:0,background:th.sf }}>
        <span style={{ fontWeight:700,fontSize:17,color:th.tx }}>{title}</span>
        <button onClick={onClose} style={{ background:th.sa,border:"none",borderRadius:8,width:32,height:32,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:th.sub }}>
          <I n="x" size={15} color={th.sub} />
        </button>
      </div>
      <div style={{ padding:"16px 20px 28px" }}>{children}</div>
    </div>
  </div>
);

export const Card = ({ children, th, style = {}, onClick }) => (
  <div onClick={onClick} style={{ background:th.sf,borderRadius:14,padding:18,border:`1px solid ${th.br}`,boxShadow:th.sh,marginBottom:14,...(onClick ? { cursor:"pointer" } : {}),...style }}>
    {children}
  </div>
);

export const Btn = ({ children, onClick, outline = false, color, disabled = false, full = false, style = {} }) => {
  const c = color || "#1d8a3c";
  return (
    <button onClick={disabled ? undefined : onClick} style={{ background:outline?"transparent":c,color:outline?c:"#fff",border:`1.5px solid ${c}`,borderRadius:10,padding:"10px 18px",fontWeight:700,fontSize:15,cursor:disabled?"not-allowed":"pointer",fontFamily:"inherit",transition:"all 0.18s",opacity:disabled?0.55:1,display:"inline-flex",alignItems:"center",gap:7,justifyContent:"center",...(full ? { width:"100%" } : {}),...style }}>
      {children}
    </button>
  );
};

export const Inp = ({ th, ...p }) => (
  <input {...p} style={{ width:"100%",background:th.sa,border:`1px solid ${th.br}`,borderRadius:10,padding:"11px 13px",color:th.tx,fontSize:15,fontFamily:"inherit",outline:"none",boxSizing:"border-box",...p.style }} />
);

export const Sel = ({ th, children, ...p }) => (
  <select {...p} style={{ width:"100%",background:th.sa,border:`1px solid ${th.br}`,borderRadius:10,padding:"11px 13px",color:th.tx,fontSize:15,fontFamily:"inherit",outline:"none",boxSizing:"border-box",...p.style }}>
    {children}
  </select>
);

export const Bdg = ({ children, color = "#1d8a3c" }) => (
  <span style={{ background:color+"20",color,borderRadius:6,padding:"3px 9px",fontSize:13,fontWeight:700,display:"inline-block" }}>
    {children}
  </span>
);

export const Bar = ({ value, color = "#1d8a3c", th }) => (
  <div style={{ height:7,borderRadius:4,background:th.br,overflow:"hidden",marginTop:6 }}>
    <div style={{ height:"100%",width:`${value}%`,background:color,borderRadius:4,transition:"width 0.8s ease" }} />
  </div>
);

export const SL = ({ children, th }) => (
  <div style={{ fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:th.mt,marginBottom:10 }}>
    {children}
  </div>
);

export const FL = ({ label, th, children }) => (
  <div style={{ marginBottom:13 }}>
    <label style={{ fontSize:13,fontWeight:600,color:th.mt,display:"block",marginBottom:6 }}>{label}</label>
    {children}
  </div>
);
