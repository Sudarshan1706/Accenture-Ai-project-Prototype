
class Component extends DCLogic {
  state = { screen:0, selectedProduct:'ALL', demoMode:false, demoProgress:0, filter:'ALL', guardrails:true, dispatchSent:false, workflowTab:0 };
  _pi = null;
  _valid = [0,1,2,4,5,6,7,9];
  componentWillUnmount(){ this._clearDemo(); }
  _clearDemo(){ if(this._pi){ clearInterval(this._pi); this._pi=null; } }
  go(n){ if(this._valid.includes(n)) this.setState({ screen:n, demoProgress:0 }); }
  toggleDemo(){
    if(this.state.demoMode){ this._clearDemo(); this.setState({ demoMode:false, demoProgress:0 }); }
    else {
      this.setState({ demoMode:true, demoProgress:0 }); let p=0;
      this._pi = setInterval(()=>{
        p+=2; if(p>=100){ p=0; const v=this._valid,i=v.indexOf(this.state.screen); this.go(v[(i+1)%v.length]); }
        this.setState({ demoProgress:p });
      },100);
    }
  }
  renderVals(){
    const { screen, demoMode, demoProgress, filter, guardrails, dispatchSent, selectedProduct, workflowTab } = this.state;
    const sv={};
    for(let i=0;i<10;i++) sv[`s${i}`]=screen===i?'block':'none';
    sv.s3='none'; sv.s8='none';
    const wt0=workflowTab===0?'block':'none', wt1=workflowTab===1?'block':'none', wt2=workflowTab===2?'block':'none';
    const wtBg0=workflowTab===0?'#2952CC':'#F5F4F2', wtBg1=workflowTab===1?'#2952CC':'#F5F4F2', wtBg2=workflowTab===2?'#2952CC':'#F5F4F2';
    const wtCol0=workflowTab===0?'white':'#6B6660', wtCol1=workflowTab===1?'white':'#6B6660', wtCol2=workflowTab===2?'white':'#6B6660';
    const titles=[
      {t:'Executive Dashboard',s:'Platform overview · Real-time KPIs · CQO view'},
      {t:'Data Ingestion Hub',s:'7 channels active · Streaming · All sources'},
      {t:'Workflow',s:'Processing Pipeline · Classification Layer · AI Operations'},
      {t:'Workflow',s:'Processing Pipeline · Classification Layer · AI Operations'},
      {t:'Alert Inbox',s:'Quality Engineer view · Active alerts · Sorted by EWS'},
      {t:'Alert Investigation',s:'Root cause · Evidence · Recommended action'},
      {t:'Root Cause Insights',s:'6-month attribution trends · GNN cross-product detection'},
      {t:'Manufacturer Alert Trigger',s:'Safety alert preview · Dispatch controls · History'},
      {t:'Workflow',s:'Processing Pipeline · Classification Layer · AI Operations'},
      {t:'Geographic Defect Intelligence',s:'Defect type · Prevalence · Quantum · Origin'},
    ];
    const navDef=[
      {label:'Executive Dashboard',icon:'◼',screen:0},
      {label:'Data Ingestion Hub',icon:'↓',screen:1},
      {label:'Workflow',icon:'⟳',screen:2},
      {label:'Alert Inbox',icon:'●',screen:4,badge:'3'},
      {label:'Alert Investigation',icon:'◎',screen:5},
      {label:'Root Cause Insights',icon:'∑',screen:6},
      {label:'Mfr. Alert Trigger',icon:'▸',screen:7},
      {label:'Geographic Heatmap',icon:'◫',screen:9},
    ];
    const navItems=navDef.map(n=>({...n,onClick:()=>this.go(n.screen),activeBg:screen===n.screen?'#2a2825':'transparent',color:screen===n.screen?'#F5F4F2':'#9B9690',iconColor:screen===n.screen?'#93C5FD':'#6B6660',fw:screen===n.screen?'600':'400',hasBadge:!!n.badge}));
    const filters=['ALL','P0','P1','P2','P3'];
    const fColors={ALL:'#1A1916',P0:'#DC2626',P1:'#EA580C',P2:'#D97706',P3:'#059669'};
    const fBorders={ALL:'#1A1916',P0:'#FECACA',P1:'#FED7AA',P2:'#FDE68A',P3:'#BBF7D0'};
    const fBgs={ALL:'#1A1916',P0:'#FEF2F2',P1:'#FFF7ED',P2:'#FFFBEB',P3:'#ECFDF5'};
    const filterResult={};
    filters.forEach(f=>{
      const active=filter===f;
      filterResult[`f${f}Bg`]=active?fBgs[f]:'white';
      filterResult[`f${f}Col`]=active?(f==='ALL'?'white':fColors[f]):'#6B6660';
      filterResult[`f${f}Bd`]=active?fBorders[f]:'#E8E5E0';
      filterResult[`f${f}`]=()=>this.setState({filter:f});
    });
    const productsList=[
      {id:'ALL',label:'All Products'},{id:'AC5T',label:'LG AC-5T Dual Inv.'},
      {id:'WM9KG',label:'LG WM-9KG Front Load'},{id:'REF380',label:'LG Ref-380L French Door'},
      {id:'AC1T',label:'LG WAC-1.5T Split'},{id:'DW14S',label:'LG DW-14S Dishwasher'},
    ];
    const productChips=productsList.map(p=>({...p,onClick:()=>this.setState({selectedProduct:p.id}),bg:selectedProduct===p.id?(p.id==='ALL'?'#1A1916':'#EEF2FF'):'white',col:selectedProduct===p.id?(p.id==='ALL'?'white':'#2952CC'):'#6B6660',bd:selectedProduct===p.id?(p.id==='ALL'?'#1A1916':'#2952CC'):'#E8E5E0'}));
    const selectedProductLabel=(productsList.find(p=>p.id===selectedProduct)||{}).label||'All Products';
    const productFilterActive=selectedProduct!=='ALL';
    const clearFilter=()=>this.setState({selectedProduct:'ALL'});
    const p=selectedProduct;
    const a0disp=p==='ALL'||p==='WM9KG'?'grid':'none';
    const a1disp=p==='ALL'||p==='AC5T'?'grid':'none';
    const a2disp=p==='ALL'||p==='REF380'?'grid':'none';
    const a3disp=p==='ALL'||p==='AC1T'?'grid':'none';
    const a4disp=p==='ALL'||p==='DW14S'?'grid':'none';
    const kwBase=(kws)=>kws.map(k=>({text:k[0],bg:k[1]==='red'?'#FEF2F2':k[1]==='org'?'#FFF7ED':k[1]==='amb'?'#FFFBEB':k[1]==='blue'?'#EEF2FF':'#F0FDF4',col:k[1]==='red'?'#DC2626':k[1]==='org'?'#EA580C':k[1]==='amb'?'#D97706':k[1]==='blue'?'#2952CC':'#059669',bd:k[1]==='red'?'#FECACA':k[1]==='org'?'#FED7AA':k[1]==='amb'?'#FDE68A':k[1]==='blue'?'#BFDBFE':'#BBF7D0'}));
    const kwMap={
      ALL:kwBase([['grinding noise × 28','red'],['smoke / burning × 3','red'],['not cooling × 24','org'],['compressor × 21','org'],['bearing failure × 18','amb'],['under warranty × 17','amb'],['batch B240315 × 12','blue'],['vibration × 9','grn']]),
      AC5T:kwBase([['grinding noise × 28','red'],['not cooling × 24','org'],['compressor × 21','org'],['bearing × 18','amb'],['batch B240315 × 12','blue'],['vibration × 9','grn']]),
      WM9KG:kwBase([['smoke × 3','red'],['burning smell × 2','red'],['PCB fault × 3','red'],['sparking × 1','red'],['batch B240228 × 3','blue']]),
      REF380:kwBase([['overheating × 18','org'],['not cooling × 14','org'],['condenser coil × 12','amb'],['high temperature × 9','amb'],['batch B240102 × 8','blue']]),
      AC1T:kwBase([['corrosion × 15','org'],['rust marks × 12','amb'],['coil damage × 10','amb'],['coastal humidity × 8','blue'],['batch B240408 × 6','blue']]),
      DW14S:kwBase([['cavitation noise × 6','amb'],['pump noise × 5','amb'],['vibration × 4','grn'],['batch B240315 × 3','blue']]),
    };
    const defectKeywords=kwMap[selectedProduct]||kwMap['ALL'];
    const productData={
      ALL:  {latency:'6.2',alerts:15,risk:'42',riskBar:'42%',riskGrad:'linear-gradient(90deg,#D97706,#EA580C)',riskLabel:'Elevated — Multiple active alerts',units:'180',clusters:'42',purity:'91.2%',ucr:'12.4M',p0:1,p1:2,p2:4,p3:8,latencyTrend:'{{ pd.latencyTrend }}',latencyNote:'Target <7 days ✓',rcMfg:35,rcDesign:28,rcComp:22,rcFirm:10,rcMfgW:'35%',rcDesignW:'28%',rcCompW:'22%',rcFirmW:'10%',rcConfAlerts:'{{ pd.rcConfAlerts }}',ingTotal:'8,361',ingDedup:'7,024',ingDedupRate:'16.0%',ingCrm:1842,ingSvc:634,ingApp:287,ingWa:412,ingSocial:1203,ingEcomm:3841,ingDealer:142,ingCrmTrend:'▲ +12%',ingCrmTCol:'#059669',ingWaTrend:'▲ +21%',ingWaTCol:'#D97706',ingSocTrend:'▲ +34%',ingSocTCol:'#DC2626'},
      AC5T: {latency:'6.2',alerts:3,risk:'68',riskBar:'68%',riskGrad:'linear-gradient(90deg,#EA580C,#DC2626)',riskLabel:'High — P1 Critical active',units:'48',clusters:'8',purity:'89.4%',ucr:'3.2M',p0:0,p1:1,p2:1,p3:1,latencyTrend:'▼ 89% vs 90d baseline',latencyNote:'Target <7 days ✓',rcMfg:88,rcDesign:2,rcComp:8,rcFirm:2,rcMfgW:'88%',rcDesignW:'2%',rcCompW:'8%',rcFirmW:'2%',rcConfAlerts:'3 confirmed alerts · Last 30 days',ingTotal:'1,240',ingDedup:'1,048',ingDedupRate:'15.5%',ingCrm:320,ingSvc:180,ingApp:72,ingWa:148,ingSocial:280,ingEcomm:240,ingDealer:0,ingCrmTrend:'▲ +18%',ingCrmTCol:'#EA580C',ingWaTrend:'▲ +28%',ingWaTCol:'#D97706',ingSocTrend:'▲ +42%',ingSocTCol:'#DC2626'},
      WM9KG:{latency:'0.1',alerts:1,risk:'94',riskBar:'94%',riskGrad:'linear-gradient(90deg,#DC2626,#DC2626)',riskLabel:'Critical — P0 Safety active',units:'3',clusters:'3',purity:'97.1%',ucr:'1.8M',p0:1,p1:0,p2:0,p3:0,latencyTrend:'⚡ Safety bypass — instant',latencyNote:'P0 Safety: no threshold',rcMfg:6,rcDesign:0,rcComp:94,rcFirm:0,rcMfgW:'6%',rcDesignW:'0%',rcCompW:'94%',rcFirmW:'0%',rcConfAlerts:'1 P0 safety alert · Last 30 days',ingTotal:'284',ingDedup:'281',ingDedupRate:'1.1%',ingCrm:0,ingSvc:0,ingApp:0,ingWa:0,ingSocial:3,ingEcomm:0,ingDealer:0,ingCrmTrend:'—',ingCrmTCol:'#9B9690',ingWaTrend:'—',ingWaTCol:'#9B9690',ingSocTrend:'⚡ P0',ingSocTCol:'#DC2626'},
      REF380:{latency:'8.1',alerts:2,risk:'38',riskBar:'38%',riskGrad:'linear-gradient(90deg,#D97706,#EA580C)',riskLabel:'Moderate — P2 Serious active',units:'23',clusters:'5',purity:'88.6%',ucr:'2.4M',p0:0,p1:0,p2:1,p3:1,latencyTrend:'▼ 81% vs 90d baseline',latencyNote:'Target <7 days ✗ (8.1d)',rcMfg:18,rcDesign:76,rcComp:4,rcFirm:2,rcMfgW:'18%',rcDesignW:'76%',rcCompW:'4%',rcFirmW:'2%',rcConfAlerts:'2 confirmed alerts · Last 30 days',ingTotal:'892',ingDedup:'756',ingDedupRate:'15.2%',ingCrm:180,ingSvc:120,ingApp:55,ingWa:82,ingSocial:145,ingEcomm:174,ingDealer:0,ingCrmTrend:'▲ +8%',ingCrmTCol:'#059669',ingWaTrend:'▲ +12%',ingWaTCol:'#059669',ingSocTrend:'▲ +18%',ingSocTCol:'#D97706'},
      AC1T: {latency:'9.4',alerts:2,risk:'31',riskBar:'31%',riskGrad:'linear-gradient(90deg,#D97706,#D97706)',riskLabel:'Low-Moderate — P2 Serious',units:'18',clusters:'4',purity:'90.2%',ucr:'1.6M',p0:0,p1:0,p2:1,p3:1,latencyTrend:'▼ 72% vs 90d baseline',latencyNote:'Target <7 days ✗ (9.4d)',rcMfg:14,rcDesign:12,rcComp:71,rcFirm:3,rcMfgW:'14%',rcDesignW:'12%',rcCompW:'71%',rcFirmW:'3%',rcConfAlerts:'2 confirmed alerts · Last 30 days',ingTotal:'634',ingDedup:'540',ingDedupRate:'14.8%',ingCrm:120,ingSvc:98,ingApp:45,ingWa:72,ingSocial:102,ingEcomm:127,ingDealer:16,ingCrmTrend:'▲ +5%',ingCrmTCol:'#059669',ingWaTrend:'▲ +9%',ingWaTCol:'#059669',ingSocTrend:'▲ +14%',ingSocTCol:'#D97706'},
      DW14S:{latency:'11.2',alerts:1,risk:'18',riskBar:'18%',riskGrad:'linear-gradient(90deg,#059669,#D97706)',riskLabel:'Low — P3 Emerging',units:'8',clusters:'2',purity:'92.8%',ucr:'0.8M',p0:0,p1:0,p2:0,p3:1,latencyTrend:'▼ 65% vs 90d baseline',latencyNote:'Target <7 days ✗ (11.2d)',rcMfg:28,rcDesign:58,rcComp:12,rcFirm:2,rcMfgW:'28%',rcDesignW:'58%',rcCompW:'12%',rcFirmW:'2%',rcConfAlerts:'1 confirmed alert · Last 30 days',ingTotal:'311',ingDedup:'265',ingDedupRate:'14.8%',ingCrm:54,ingSvc:42,ingApp:28,ingWa:36,ingSocial:48,ingEcomm:92,ingDealer:11,ingCrmTrend:'▲ +3%',ingCrmTCol:'#059669',ingWaTrend:'▲ +5%',ingWaTCol:'#059669',ingSocTrend:'▲ +8%',ingSocTCol:'#059669'},
    };
    const pd=productData[selectedProduct]||productData.ALL;
    const showP0Badge=pd.p0>0; const p0Label=pd.p0+' P0';
    const showP1Badge=pd.p1>0; const p1Label=pd.p1+' P1';
    const showP2Badge=pd.p2>0; const p2Label=pd.p2+' P2';
    const showP3Badge=pd.p3>0; const p3Label=pd.p3+' P3';
    const c0disp=p==='ALL'||p==='WM9KG'?'grid':'none';
    const c1disp=p==='ALL'||p==='AC5T'?'grid':'none';
    const c2disp=p==='ALL'||p==='REF380'?'grid':'none';
    const c3disp=p==='ALL'||p==='AC1T'?'grid':'none';
    const c4disp=p==='ALL'||p==='DW14S'?'grid':'none';
    // Alert Investigation
    const _sf=(l,v,w,c)=>({l,v,w,c});
    const _rc=(l,pct,w,c,fw)=>({l,pct,w,c,fw});
    const _es=(l,c)=>({l,c});
    const _cm=(s,t)=>({s,t});
    const invMap={
      ALL:{tl:'P1 CRITICAL',tbg:'#EA580C',cbg:'#FFF7ED',cBorder:'2px solid #EA580C',ewsCol:'#EA580C',title:'LG Dual Inverter AC-5T — Compressor Bearing Failure',meta:'Alert P1-7234 · Cluster #7 · Batch B240315 · 2h ago · 48 complaints across 4 sources',ews:'0.81',thresh:'Threshold P1: 0.75',rcIcon:'🏭',rcTitle:'Manufacturing Batch Defect',rcBatch:'Batch B240315 — Capacitor-grade bearing in compressor sub-assembly',rcConf:88,rcConfWidth:'88%',rcColor:'#2952CC',shapFs:[_sf('Batch B240315 failure rate (8× normal)','+0.42','80%','#2952CC'),_sf('Geographic spread (8 states, North-heavy)','+0.18','34%','#2952CC'),_sf('CUSUM velocity (σ = 8.7, threshold: 5)','+0.15','29%','#2952CC'),_sf('Time-to-complaint peak (45d = mfg pattern)','+0.12','23%','#2952CC'),_sf('SC part replaced: bearing + compressor','+0.09','17%','#2952CC'),_sf('No firmware version change','−0.05','9%','#9B9690')],rcClasses:[_rc('Manufacturing Batch','88%','88%','#2952CC','700'),_rc('Component Supplier','8%','8%','#9B9690','400'),_rc('Design Flaw','2%','2%','#9B9690','400'),_rc('Other','2%','2%','#9B9690','400')],evidenceTotal:'48 Complaints',evidenceSources:[_es('CRM / Call Centre — 23','#2952CC'),_es('Service Centres — 14','#7C3AED'),_es('WhatsApp — 8','#059669'),_es('Social Media — 3','#EA580C')],mscs:'4/7 sources = 0.71',cmpls:[_cm('CRM · Customer [C-7834] · Delhi NCR · Day 47','"LG AC compressor loud grinding noise, not cooling. Technician: bearing failed. Only 47 days old. Batch [B240315]."'),_cm('Service Centre SC-DL-042 · Technician note · Day 43','"Bearing replacement. Part: 4681A20173B. Same issue on 6 units from batch B240315 this week."'),_cm('WhatsApp · Consumer [W-2241] · Chandigarh','"My LG AC making loud grinding noise — under warranty at 1.5 months. Others in my building have the same issue."')],actions:['1. Quarantine Batch B240315 — halt further distribution.','2. Initiate supplier quality investigation — bearing supplier CSU-04.','3. Pre-position part 4681A20173B at NCR, UP, Punjab service centres.','4. Escalate to Manufacturing Head + Supplier Quality Mgr — 72h SLA.'],actionBtn:'Trigger Manufacturer Alert →'},
      WM9KG:{tl:'P0 SAFETY',tbg:'#DC2626',cbg:'#FEF2F2',cBorder:'2px solid #DC2626',ewsCol:'#DC2626',title:'LG WM-9KG-FLD — PCB Short Circuit · Smoke / Fire',meta:'Alert P0-1201 · Cluster #12 · Batch B240228 · 8 min ago · 3 complaints across 3 sources',ews:'0.97',thresh:'P0 Safety Bypass',rcIcon:'⚡',rcTitle:'Component Supplier Fault — PCB Short',rcBatch:'Batch B240228 — PCB capacitor failure from Supplier CSU-07',rcConf:94,rcConfWidth:'94%',rcColor:'#DC2626',shapFs:[_sf('Safety signal: smoke/fire — 3 reports in 8 min','+0.61','95%','#DC2626'),_sf('P0 safety bypass — no threshold required','+0.22','42%','#DC2626'),_sf('Batch B240228 concentration (all 3 complaints)','+0.08','15%','#DC2626'),_sf('PCB capacitor — single supplier CSU-07','+0.03','6%','#DC2626')],rcClasses:[_rc('Component Supplier','94%','94%','#DC2626','700'),_rc('Manufacturing Batch','4%','4%','#9B9690','400'),_rc('Other','2%','2%','#9B9690','400')],evidenceTotal:'3 Complaints',evidenceSources:[_es('Social Media — 3','#DC2626')],mscs:'1/7 sources (Safety bypass)',cmpls:[_cm('X/Twitter · User [T-4821] · Mumbai · 8 min ago','"LG washing machine suddenly smoking and caught fire! 2 months old. Batch [B240228]. URGENT."'),_cm('Instagram · User [I-2031] · Delhi NCR · 9 min ago','"My LG front load smoking from back panel. Switched off. Batch B240228."'),_cm('Facebook · User [F-9123] · Bengaluru · 11 min ago','"LG washing machine smoke and burning smell. Service centre said stop using immediately."')],actions:['1. IMMEDIATE: P0 Safety recall — Batch B240228 all WM-9KG-FLD units.','2. Contact all 3 affected customers — urgent safety inspection within 4h.','3. Notify CCPA + BIS safety regulator within 24h.','4. Escalate to CEO, CQO, Legal, PR — zero delay.'],actionBtn:'Trigger P0 Safety Recall →'},
      REF380:{tl:'P2 SERIOUS',tbg:'#D97706',cbg:'#FFFBEB',cBorder:'2px solid #D97706',ewsCol:'#D97706',title:'LG Ref-380L-FD — Condenser Coil Overheating',meta:'Alert P2-4891 · Cluster #18 · Batch B240102 · 6h ago · 23 complaints across 3 sources',ews:'0.61',thresh:'Threshold P2: 0.50',rcIcon:'🔧',rcTitle:'Design Flaw — Condenser Coil Routing',rcBatch:'Batch B240102 — Coil routing insufficient for ambient temp >40°C',rcConf:76,rcConfWidth:'76%',rcColor:'#D97706',shapFs:[_sf('Temperature correlation >40°C (South India summer)','+0.38','72%','#D97706'),_sf('Geographic pattern: TN, Kerala, AP (climate)','+0.21','40%','#D97706'),_sf('CUSUM velocity (σ = 4.8, threshold: 3)','+0.11','21%','#D97706'),_sf('Multiple batches affected (design-wide issue)','+0.06','11%','#D97706'),_sf('No single supplier link found','−0.04','8%','#9B9690')],rcClasses:[_rc('Design Flaw','76%','76%','#D97706','700'),_rc('Manufacturing Batch','18%','18%','#9B9690','400'),_rc('Other','6%','6%','#9B9690','400')],evidenceTotal:'23 Complaints',evidenceSources:[_es('CRM / Call Centre — 12','#2952CC'),_es('E-commerce Reviews — 7','#0D9488'),_es('WhatsApp — 4','#059669')],mscs:'3/7 sources = 0.43',cmpls:[_cm('CRM · Customer [C-4421] · Chennai · Day 62','"LG fridge not cooling, condenser overheating. Technician says coil routing issue. TN summer too hot?"'),_cm('Amazon Review · Verified Purchase · Kerala','"Refrigerator overheating at back. Compressor running constantly. Coil routing issue per AC mechanic."'),_cm('WhatsApp · Consumer [W-8812] · Hyderabad','"LG Ref 380L running very hot, fan never stops. Getting worse with summer. Batch B240102."')],actions:['1. Issue service advisory to TN, Kerala, AP service centres.','2. Initiate R&D design review for condenser coil routing.','3. Offer free inspection + coil cleaning for Batch B240102 customers.','4. Escalate to Chief Engineer + R&D Lead — 5-day design review SLA.'],actionBtn:'Trigger Manufacturer Alert →'},
      AC1T:{tl:'P2 SERIOUS',tbg:'#D97706',cbg:'#FFFBEB',cBorder:'2px solid #D97706',ewsCol:'#D97706',title:'LG WAC-1.5T — Condenser Coil Corrosion',meta:'Alert P2-5234 · Cluster #24 · Batch B240408 · 8h ago · 18 complaints across 2 sources',ews:'0.57',thresh:'Threshold P2: 0.50',rcIcon:'🌊',rcTitle:'Component Supplier — Non-Marine-Grade Coil',rcBatch:'Batch B240408 — Standard coating corrodes in coastal humidity >75% RH',rcConf:71,rcConfWidth:'71%',rcColor:'#D97706',shapFs:[_sf('Coastal geography (Mumbai, Goa, Konkan)','+0.35','67%','#D97706'),_sf('Humidity correlation (>75% RH environments)','+0.24','46%','#D97706'),_sf('Coil material: standard vs marine-grade expected','+0.09','17%','#D97706'),_sf('Batch B240408 — single supplier CSU-11','+0.03','6%','#D97706')],rcClasses:[_rc('Component Supplier','71%','71%','#D97706','700'),_rc('Manufacturing Batch','14%','14%','#9B9690','400'),_rc('Design Flaw','12%','12%','#9B9690','400'),_rc('Other','3%','3%','#9B9690','400')],evidenceTotal:'18 Complaints',evidenceSources:[_es('CRM / Call Centre — 9','#2952CC'),_es('Service Centres — 7','#7C3AED'),_es('WhatsApp — 2','#059669')],mscs:'3/7 sources = 0.43',cmpls:[_cm('CRM · Customer [C-5512] · Mumbai · Day 78','"LG window AC stopped cooling. Technician found rust/corrosion on coil. Only 2.5 months old. Near sea."'),_cm('Service Centre SC-MH-018 · Technician · Day 71','"Condenser coil heavily corroded — coastal unit. Batch B240408 coil has standard (not marine-grade) coating."'),_cm('WhatsApp · Consumer [W-3341] · Alibaug','"LG AC rust marks, stopped cooling. Living 200m from sea. Batch B240408."')],actions:['1. Audit Supplier CSU-11 — marine-grade coil coating specification.','2. Issue service advisory for coastal Maharashtra service centres.','3. Offer coil replacement for Batch B240408 in humidity-prone zones.','4. Update product spec for WAC-1.5T coastal variants.'],actionBtn:'Trigger Manufacturer Alert →'},
      DW14S:{tl:'P3 EMERGING',tbg:'#059669',cbg:'#F0FDF4',cBorder:'2px solid #059669',ewsCol:'#059669',title:'LG DW-14S Dishwasher — Water Pump Cavitation Noise',meta:'Alert P3-6102 · Cluster #31 · Batch B240315 · 1d ago · 8 complaints across 2 sources',ews:'0.31',thresh:'Threshold P3: 0.25',rcIcon:'🔩',rcTitle:'Design Flaw — Pump Impeller Cavitation',rcBatch:'Batch B240315 — Impeller cavitation under low inlet pressure (<1.5 bar)',rcConf:58,rcConfWidth:'58%',rcColor:'#059669',shapFs:[_sf('Low inlet pressure (urban high-rise apartments)','+0.28','53%','#059669'),_sf('Cavitation pattern in noise FFT analysis','+0.18','34%','#059669'),_sf('CUSUM velocity (σ = 2.1, threshold: 2)','+0.08','15%','#059669'),_sf('Multiple batches affected (design issue)','+0.04','8%','#059669')],rcClasses:[_rc('Design Flaw','58%','58%','#059669','700'),_rc('Manufacturing Batch','28%','28%','#9B9690','400'),_rc('Component Supplier','12%','12%','#9B9690','400'),_rc('Other','2%','2%','#9B9690','400')],evidenceTotal:'8 Complaints',evidenceSources:[_es('CRM / Call Centre — 4','#2952CC'),_es('E-commerce Reviews — 3','#0D9488'),_es('WhatsApp — 1','#059669')],mscs:'3/7 sources = 0.43',cmpls:[_cm('CRM · Customer [C-6201] · Bengaluru · Day 42','"LG dishwasher loud grinding/humming during wash. Varies with water pressure. Only 6 weeks old."'),_cm('Amazon Review · Verified Purchase · Hyderabad','"Noisy pump during wash — sounds like cavitation. Water pressure fluctuates in building. 3-star."'),_cm('WhatsApp · Consumer [W-7723] · Mumbai','"Dishwasher very noisy — pump rattling. Technician said it's the impeller. Batch B240315."')],actions:['1. Monitor cluster — not yet at P2 threshold (EWS 0.31 < 0.50).','2. Log in AI system for FY27 DW-14S pump redesign review.','3. Issue optional service advisory for low water pressure regions.','4. Escalate to R&D if complaints reach 15 within 30 days.'],actionBtn:'Monitor & Log →'},
    };
    invMap.AC5T=invMap.ALL;
    const inv=invMap[selectedProduct]||invMap.ALL;
    // Root Cause Insights
    const _kpi=(l,v,c)=>({l,v,c});
    const rcInsightMap={
      ALL:{gnnText:'Batch B240315 appears in 2 of 5 current alerts (LG AC-5T + LG DW-14S). Common component: capacitor-grade bearing from Supplier CSU-04. GNN community detection identified this cross-product link.',gnnAlert:'{{ rci.gnnAlert }}',kpis:[_kpi('Avg detection latency (30d)','6.2 days','#059669'),_kpi('Alert precision (P2+)','91.4%','#059669'),_kpi('Root cause top-1 accuracy','83.6%','#059669'),_kpi('False cluster rate','3.8%','#059669'),_kpi('Est. recalls averted (6mo)','2 events · ₹42 Cr saved','#2952CC')]},
      AC5T:{gnnText:'Batch B240315 shared with LG DW-14S Cluster #31. Supplier CSU-04 bearing component linked across both product lines. GNN graph: AC-5T Cluster #7 ↔ DW-14S Cluster #31.',gnnAlert:'⚠ Cross-product: B240315 in AC-5T (P1) and DW-14S (P3) → Audit Supplier CSU-04 immediately',kpis:[_kpi('Detection latency — AC-5T','6.2 days','#059669'),_kpi('Alert precision','89.4%','#059669'),_kpi('Root cause confidence','88% Mfg Batch','#059669'),_kpi('EWS score','0.81 (thresh: 0.75)','#EA580C'),_kpi('Units at risk','~180 · Batch B240315','#EA580C')]},
      WM9KG:{gnnText:'P0 Safety — Batch B240228 unique to WM-9KG-FLD. PCB capacitor from Supplier CSU-07. No cross-product GNN link detected. Isolated safety incident requiring immediate action.',gnnAlert:'⚡ P0 SAFETY: Isolated to WM-9KG Batch B240228 → Immediate recall, no cross-product risk',kpis:[_kpi('Detection latency — WM-9KG','0.1 days','#059669'),_kpi('Safety bypass triggered','Yes — P0','#DC2626'),_kpi('Root cause confidence','94% Component Supplier','#DC2626'),_kpi('EWS score','0.97 (P0 bypass)','#DC2626'),_kpi('Units at risk','3 confirmed · ~500 at risk','#DC2626')]},
      REF380:{gnnText:'Design flaw in Ref-380L-FD — South India high ambient temperature cluster. No shared batch cross-product. Consistent with design issue rather than manufacturing or supplier fault.',gnnAlert:'⚠ Design review: Condenser coil routing inadequate for TN/Kerala climate → R&D action',kpis:[_kpi('Detection latency — Ref-380L','8.1 days','#D97706'),_kpi('Alert precision','88.6%','#059669'),_kpi('Root cause confidence','76% Design Flaw','#D97706'),_kpi('EWS score','0.61 (thresh: 0.50)','#D97706'),_kpi('Units at risk','~23 · Design-wide','#D97706')]},
      AC1T:{gnnText:'Coil corrosion in WAC-1.5T concentrated in coastal Maharashtra. Supplier CSU-11 coil spec mismatch with high-humidity requirements. No cross-product overlap detected.',gnnAlert:'⚠ Coastal risk: Supplier CSU-11 coating insufficient for >75% RH → Spec update required',kpis:[_kpi('Detection latency — WAC-1.5T','9.4 days','#D97706'),_kpi('Alert precision','90.2%','#059669'),_kpi('Root cause confidence','71% Component Supplier','#D97706'),_kpi('EWS score','0.57 (thresh: 0.50)','#D97706'),_kpi('Units at risk','~18 · Coastal zones','#D97706')]},
      DW14S:{gnnText:'Pump cavitation in DW-14S at P3 monitoring. Batch B240315 shared with AC-5T but different component (pump impeller vs bearing). GNN: no active cross-product risk.',gnnAlert:'📊 Emerging signal: DW-14S pump at P3 monitoring — watch for velocity increase',kpis:[_kpi('Detection latency — DW-14S','11.2 days','#D97706'),_kpi('Alert precision','92.8%','#059669'),_kpi('Root cause confidence','58% Design Flaw','#059669'),_kpi('EWS score','0.31 (thresh: 0.25)','#059669'),_kpi('Units at risk','~8 · Bengaluru + Hyd','#059669')]},
    };
    const rci=rcInsightMap[selectedProduct]||rcInsightMap.ALL;
    // Mfr Alert
    const mfrMap={
      ALL:{tier:'P1 CRITICAL — MFR ALERT',tbg:'#EA580C',cbg:'#fff',cborder:'1px solid #FED7AA',title:'Action Required: Batch Quarantine — LG AC-5T',batch:'B240315',sku:'LG Dual Inverter AC-5T (PSKA19ENXF)',scope:'48 complaints · 8 states · 22 cities',root:'Manufacturing Batch (88%)',det:'Day 6.2',units:'~180',dispatchHistory:[{l:'P2-6891: LG Ref-380L condenser',s:'Confirmed ✓',c:'#059669'},{l:'P1-6742: LG WAC-1.5T corrosion',s:'In progress',c:'#D97706'},{l:'P1-6603: Haier WM PCB failure',s:'Resolved ✓',c:'#059669'}]},
      AC5T:{tier:'P1 CRITICAL — MFR ALERT',tbg:'#EA580C',cbg:'#fff',cborder:'1px solid #FED7AA',title:'Action Required: Batch Quarantine — LG AC-5T',batch:'B240315',sku:'LG Dual Inverter AC-5T (PSKA19ENXF)',scope:'48 complaints · 8 states · 22 cities',root:'Manufacturing Batch (88%)',det:'Day 6.2',units:'~180',dispatchHistory:[{l:'P1-7234: LG AC-5T B240315 bearing',s:'Pending dispatch',c:'#EA580C'},{l:'P1-6742: LG AC-5T corrosion',s:'Resolved ✓',c:'#059669'},{l:'P2-6201: LG AC-5T firmware fix',s:'Resolved ✓',c:'#059669'}]},
      WM9KG:{tier:'P0 SAFETY — MFR ALERT',tbg:'#DC2626',cbg:'#fff',cborder:'2px solid #FECACA',title:'URGENT: Safety Recall — LG WM-9KG-FLD',batch:'B240228',sku:'LG Front Load WM-9KG-FLD (FHV1409ZWB)',scope:'3 complaints · Mumbai, Delhi NCR',root:'Component Supplier (94%)',det:'Day 0.1',units:'~3 confirmed · ~500 at risk',dispatchHistory:[{l:'P0-1201: LG WM-9KG PCB smoke — NEW',s:'URGENT',c:'#DC2626'},{l:'No prior history for this model',s:'—',c:'#9B9690'}]},
      REF380:{tier:'P2 SERIOUS — MFR ALERT',tbg:'#D97706',cbg:'#fff',cborder:'1px solid #FDE68A',title:'Action Required: Design Review — LG Ref-380L-FD',batch:'B240102',sku:'LG French Door Ref-380L-FD (GL-T412VPZX)',scope:'23 complaints · TN, Kerala, AP',root:'Design Flaw (76%)',det:'Day 8.1',units:'~23',dispatchHistory:[{l:'P2-4891: LG Ref-380L condenser OH',s:'In progress',c:'#D97706'},{l:'P2-4201: LG Ref-380L cooling slow',s:'Resolved ✓',c:'#059669'},{l:'P3-3982: LG Ref-380L door seal',s:'Resolved ✓',c:'#059669'}]},
      AC1T:{tier:'P2 SERIOUS — MFR ALERT',tbg:'#D97706',cbg:'#fff',cborder:'1px solid #FDE68A',title:'Action Required: Supplier Audit — LG WAC-1.5T',batch:'B240408',sku:'LG Window AC-1.5T (PS-Q12YNZE)',scope:'18 complaints · Coastal Maharashtra',root:'Component Supplier (71%)',det:'Day 9.4',units:'~18',dispatchHistory:[{l:'P2-5234: LG WAC-1.5T coil corrosion',s:'In progress',c:'#D97706'},{l:'P2-4891: LG WAC-1.5T coastal batch',s:'Closed ✓',c:'#059669'}]},
      DW14S:{tier:'P3 EMERGING — MFR ALERT',tbg:'#059669',cbg:'#fff',cborder:'1px solid #BBF7D0',title:'Monitor: Pump Design — LG DW-14S',batch:'B240315',sku:'LG Dishwasher DW-14S (DFB424FP)',scope:'8 complaints · Bengaluru, Hyderabad',root:'Design Flaw (58%)',det:'Day 11.2',units:'~8',dispatchHistory:[{l:'P3-6102: LG DW-14S pump cavitation',s:'Monitoring',c:'#059669'},{l:'P3-5821: LG DW-14S noise vibration',s:'Resolved ✓',c:'#059669'}]},
    };
    const mfr=mfrMap[selectedProduct]||mfrMap.ALL;
    // Geographic Defect Intelligence
    const geoMap={
      ALL:{defectType:'Multiple Defect Types Active',defectDesc:'Compressor bearing failure (AC-5T P1), PCB short circuit (WM-9KG P0), condenser overheating (Ref-380L P2), coil corrosion (WAC-1.5T P2), pump cavitation (DW-14S P3)',prevalenceRate:'0.18% avg',prevalenceNote:'Across all 5 active product lines · Weighted by complaint volume',prevalenceCol:'#D97706',quantum:'~280 units',quantumNote:'Combined portfolio · 82 confirmed complaints across all products',quantumCol:'#EA580C',origin:'Multi-source: B240315, B240228, B240102, B240408',originNote:'Factories: Noida, Mumbai, Chennai · Suppliers: CSU-04, CSU-07, CSU-11',originCol:'#2952CC',mapNote:'Showing AC-5T Cluster #7 (P1 — highest severity active alert)',qcBatch:'B240315 (AC-5T)',qcRate:'0.42%',qcRateW:'84%',qcQcStd:'<0.05%',qcStdW:'10%',qcHistAvg:'0.12%',qcHistW:'24%',qcRateCol:'#DC2626',qcAlert:'8.4× above QC standard · Most severe active batch'},
      AC5T:{defectType:'Compressor Bearing Failure',defectDesc:'Grinding noise and cooling failure. Capacitor-grade bearing used in compressor sub-assembly instead of required motor-grade bearing.',prevalenceRate:'0.42%',prevalenceNote:'8.4× above LG QC standard (<0.05%) — critical defect rate',prevalenceCol:'#DC2626',quantum:'~180 units at risk',quantumNote:'48 confirmed complaints · Batch B240315 · 22 cities · 8 states',quantumCol:'#EA580C',origin:'Noida Factory · Supplier CSU-04 (ThermoTech)',originNote:'Batch B240315 · Mar 15, 2026 · Vibration test skipped in pre-ship QC',originCol:'#2952CC',mapNote:'North India concentration — consistent with Noida factory distribution routes',qcBatch:'B240315 (bearing sub-assembly)',qcRate:'0.42%',qcRateW:'84%',qcQcStd:'<0.05%',qcStdW:'10%',qcHistAvg:'0.12%',qcHistW:'24%',qcRateCol:'#DC2626',qcAlert:'8.4× above QC standard · 3.5× historical avg — manufacturing fault confirmed'},
      WM9KG:{defectType:'PCB Short Circuit — Fire / Smoke Risk',defectDesc:'Electrical capacitor failure in PCB causing smoke and potential fire. P0 Safety — any occurrence triggers immediate recall.',prevalenceRate:'P0 Safety',prevalenceNote:'3 incidents in 8 min — immediate recall threshold exceeded',prevalenceCol:'#DC2626',quantum:'~500 units at risk',quantumNote:'3 confirmed complaints · Batch B240228 · Mumbai & Delhi NCR',quantumCol:'#DC2626',origin:'Component Supplier CSU-07 (PCB capacitor)',originNote:'Batch B240228 · Feb 28, 2026 · Capacitor voltage spec mismatch',originCol:'#DC2626',mapNote:'Metro city concentration — Mumbai and Delhi NCR P0 safety incidents',qcBatch:'B240228 (PCB capacitor)',qcRate:'P0 Safety',qcRateW:'100%',qcQcStd:'0 defects',qcStdW:'0%',qcHistAvg:'0.00%',qcHistW:'0%',qcRateCol:'#DC2626',qcAlert:'P0 Safety — any smoke/fire incident triggers immediate recall'},
      REF380:{defectType:'Condenser Coil Overheating',defectDesc:'Condenser coil routing design insufficient for ambient temperatures >40°C. Design flaw affecting South India installations in summer.',prevalenceRate:'0.18%',prevalenceNote:'3.6× above QC standard — South India summer temperature correlation',prevalenceCol:'#D97706',quantum:'~23 units',quantumNote:'23 confirmed complaints · Batch B240102 · TN, Kerala, Andhra Pradesh',quantumCol:'#D97706',origin:'Design Flaw — R&D Review Required',originNote:'Coil routing design · Multiple batches post-B240102 · All South India units',originCol:'#7C3AED',mapNote:'South India concentration — high ambient temperature climate correlation',qcBatch:'B240102 (design-wide)',qcRate:'0.18%',qcRateW:'36%',qcQcStd:'<0.05%',qcStdW:'10%',qcHistAvg:'0.08%',qcHistW:'16%',qcRateCol:'#D97706',qcAlert:'3.6× above QC standard — design flaw affects all South India units'},
      AC1T:{defectType:'Condenser Coil Corrosion',defectDesc:'Standard aluminium coil corrodes in high humidity coastal environments. Marine-grade coating required for installations within 5km of sea.',prevalenceRate:'0.14%',prevalenceNote:'2.8× above QC standard — coastal humidity correlation confirmed',prevalenceCol:'#D97706',quantum:'~18 units',quantumNote:'18 confirmed complaints · Batch B240408 · Coastal Maharashtra',quantumCol:'#D97706',origin:'Supplier CSU-11 (Coil Coating Spec)',originNote:'Batch B240408 · Apr 8, 2026 · Standard vs. marine-grade coating mismatch',originCol:'#0D9488',mapNote:'Coastal Maharashtra — Mumbai, Alibaug, Ratnagiri belt',qcBatch:'B240408 (coil coating)',qcRate:'0.14%',qcRateW:'28%',qcQcStd:'<0.05%',qcStdW:'10%',qcHistAvg:'0.06%',qcHistW:'12%',qcRateCol:'#D97706',qcAlert:'2.8× above QC standard — concentrated in coastal installations only'},
      DW14S:{defectType:'Water Pump Cavitation Noise',defectDesc:'Pump impeller design causes audible cavitation under low inlet water pressure (<1.5 bar). Common in urban high-rise apartments.',prevalenceRate:'0.06%',prevalenceNote:'1.2× above QC standard — emerging P3 signal, monitor closely',prevalenceCol:'#059669',quantum:'~8 units',quantumNote:'8 confirmed complaints · Batch B240315 · Bengaluru & Hyderabad',quantumCol:'#059669',origin:'Design Flaw — Pump Impeller Geometry',originNote:'Impeller cavitation under <1.5 bar inlet · FY27 redesign required',originCol:'#059669',mapNote:'Urban metro concentration — high-rise apartments with low water pressure',qcBatch:'B240315 (pump impeller)',qcRate:'0.06%',qcRateW:'12%',qcQcStd:'<0.05%',qcStdW:'10%',qcHistAvg:'0.04%',qcHistW:'8%',qcRateCol:'#059669',qcAlert:'1.2× above QC standard — emerging signal; monitor for velocity increase'},
    };
    const geo=geoMap[selectedProduct]||geoMap.ALL;
    const valid=this._valid;
    const sIdx=valid.indexOf(screen);
    return {
      ...sv, wt0,wt1,wt2,wtBg0,wtBg1,wtBg2,wtCol0,wtCol1,wtCol2,
      setWt0:()=>this.setState({workflowTab:0}),
      setWt1:()=>this.setState({workflowTab:1}),
      setWt2:()=>this.setState({workflowTab:2}),
      ...filterResult,
      productChips,selectedProductLabel,productFilterActive,clearFilter,
      a0disp,a1disp,a2disp,a3disp,a4disp,
      defectKeywords,pd,
      showP0Badge,showP1Badge,showP2Badge,showP3Badge,
      p0Label,p1Label,p2Label,p3Label,
      c0disp,c1disp,c2disp,c3disp,c4disp,
      inv,mfr,rci,geo,
      skuOp0:p==='ALL'||p==='AC5T'?'1':'0.28',
      skuOp1:p==='ALL'||p==='WM9KG'?'1':'0.28',
      skuOp2:p==='ALL'||p==='REF380'?'1':'0.28',
      skuOp3:p==='ALL'||p==='AC1T'?'1':'0.28',
      skuOp4:p==='ALL'||p==='DW14S'?'1':'0.28',
      navItems,
      screenTitle:titles[screen].t,
      screenSub:titles[screen].s,
      screenIdx:`${sIdx+1} / 8`,
      nextScreen:()=>{const i=valid.indexOf(screen);this.go(valid[(i+1)%valid.length]);},
      prevScreen:()=>{const i=valid.indexOf(screen);this.go(valid[(i-1+valid.length)%valid.length]);},
      demoMode,demoBar:`${demoProgress}%`,demoSec:Math.ceil((100-demoProgress)/20),
      demoBtnLabel:demoMode?'⏸  Stop Demo':'▶  Auto Demo',
      demoBtnBg:demoMode?'#EA580C':'#2952CC',
      toggleDemo:()=>this.toggleDemo(),
      go0:()=>this.go(0),go1:()=>this.go(1),go2:()=>this.go(2),
      go4:()=>this.go(4),go5:()=>this.go(5),go6:()=>this.go(6),
      go7:()=>this.go(7),go9:()=>this.go(9),
      guardrailLabel:guardrails?'Guardrails Active':'Guardrails Off',
      grBg:guardrails?'#059669':'#9B9690',
      grLeft:guardrails?'19px':'2px',
      toggleGuardrails:()=>this.setState({guardrails:!guardrails}),
      dispatchSent,dispatchNotSent:!dispatchSent,
      sendDispatch:()=>this.setState({dispatchSent:true}),
      resetDispatch:()=>this.setState({dispatchSent:false}),
    };
  }
}
