

class Component extends DCLogic {
  state = {
    screen: 0,
    selectedProduct: 'ALL',
    demoMode: false,
    demoProgress: 0,
    filter: 'ALL',
    guardrails: true,
    dispatchSent: false,
    workflowTab: 'pipeline',
  };

  _pi = null; // progress interval

  componentWillUnmount() { this._clearDemo(); }

  _clearDemo() {
    if (this._pi) { clearInterval(this._pi); this._pi = null; }
  }

  go(n) {
    const s = ((n % 10) + 10) % 10;
    this.setState({ screen: s, demoProgress: 0 });
  }

  toggleDemo() {
    if (this.state.demoMode) {
      this._clearDemo();
      this.setState({ demoMode: false, demoProgress: 0 });
    } else {
      this.setState({ demoMode: true, demoProgress: 0 });
      let p = 0;
      this._pi = setInterval(() => {
        p += 2;
        if (p >= 100) {
          p = 0;
          this.go(this.state.screen + 1);
        }
        this.setState({ demoProgress: p });
      }, 100);
    }
  }

  renderVals() {
    const { screen, demoMode, demoProgress, filter, guardrails, dispatchSent, selectedProduct } = this.state;

    // screen visibility
    const sv = {};
    for (let i = 0; i < 10; i++) sv[`s${i}`] = screen === i ? 'block' : 'none';

    const titles = [
      { t: 'Executive Dashboard', s: 'Platform overview · Real-time KPIs · CQO view' },
      { t: 'Data Ingestion Hub', s: '7 channels active · 8,361 complaints today · All streaming' },
      { t: 'AI Workflow', s: 'Processing pipeline · Classification · AI operations · Product-reactive' },
      { t: 'AI Workflow', s: 'Processing pipeline · Classification · AI operations · Product-reactive' },
      { t: 'Alert Inbox', s: 'Quality Engineer view · 15 active alerts · Sorted by EWS' },
      { t: 'Alert Investigation — P1-7234', s: 'LG Dual Inverter AC-5T · Compressor Bearing · Batch B240315' },
      { t: 'Root Cause Insights', s: '6-month attribution trends · GNN cross-product detection' },
      { t: 'Manufacturer Alert Trigger', s: 'Guardrail config · Dispatch controls · Routing matrix' },
      { t: 'AI Operations', s: 'Model performance · Champion-challenger · Retraining pipeline' },
      { t: 'Geographic Heatmap', s: 'Defect spread by state · Cluster #7 · LG AC-5T · P1' },
    ];

    const navDef = [
      { label: 'Executive Dashboard', icon: '◼', screen: 0 },
      { label: 'Data Ingestion Hub', icon: '↓', screen: 1 },
      { label: 'Workflow', icon: '⚙', screen: 2 },
      { label: 'Alert Inbox', icon: '●', screen: 4, badge: '3' },
      { label: 'Alert Investigation', icon: '◎', screen: 5 },
      { label: 'Root Cause Insights', icon: '∑', screen: 6 },
      { label: 'Mfr. Alert Trigger', icon: '▸', screen: 7 },
      { label: 'Geographic Heatmap', icon: '◫', screen: 9 },
    ];

    const navItems = navDef.map(n => ({
      ...n,
      onClick: () => this.go(n.screen),
      activeBg: screen === n.screen ? '#2a2825' : 'transparent',
      color: screen === n.screen ? '#F5F4F2' : '#9B9690',
      iconColor: screen === n.screen ? '#93C5FD' : '#6B6660',
      fw: screen === n.screen ? '600' : '400',
      hasBadge: !!n.badge,
    }));

    // filters
    const filters = ['ALL', 'P0', 'P1', 'P2', 'P3'];
    const fColors = { ALL: '#1A1916', P0: '#DC2626', P1: '#EA580C', P2: '#D97706', P3: '#059669' };
    const fBorders = { ALL: '#1A1916', P0: '#FECACA', P1: '#FED7AA', P2: '#FDE68A', P3: '#BBF7D0' };
    const fBgs = { ALL: '#1A1916', P0: '#FEF2F2', P1: '#FFF7ED', P2: '#FFFBEB', P3: '#ECFDF5' };
    const fTextInactive = '#6B6660';
    const filterResult = {};
    filters.forEach(f => {
      const active = filter === f;
      filterResult[`f${f}Bg`] = active ? fBgs[f] : 'white';
      filterResult[`f${f}Col`] = active ? (f === 'ALL' ? 'white' : fColors[f]) : fTextInactive;
      filterResult[`f${f}Bd`] = active ? fBorders[f] : '#E8E5E0';
      filterResult[`f${f}`] = () => this.setState({ filter: f });
    });

    // ── Product filter ──────────────────────────────────────────────
    const productsList = [
      { id: 'ALL',   label: 'All Products' },
      { id: 'AC5T',  label: 'LG AC-5T Dual Inv.' },
      { id: 'WM9KG', label: 'LG WM-9KG Front Load' },
      { id: 'REF380',label: 'LG Ref-380L French Door' },
      { id: 'AC1T',  label: 'LG WAC-1.5T Split' },
      { id: 'DW14S', label: 'LG DW-14S Dishwasher' },
    ];
    const productChips = productsList.map(p => ({
      ...p,
      onClick: () => this.setState({ selectedProduct: p.id }),
      bg: selectedProduct === p.id ? (p.id === 'ALL' ? '#1A1916' : '#EEF2FF') : 'white',
      col: selectedProduct === p.id ? (p.id === 'ALL' ? 'white' : '#2952CC') : '#6B6660',
      bd: selectedProduct === p.id ? (p.id === 'ALL' ? '#1A1916' : '#2952CC') : '#E8E5E0',
    }));
    const selectedProductLabel = (productsList.find(p => p.id === selectedProduct) || {}).label || 'All Products';
    const productFilterActive = selectedProduct !== 'ALL';
    const clearFilter = () => this.setState({ selectedProduct: 'ALL' });

    // Alert card display (grid = visible, none = hidden)
    const p = selectedProduct;
    const a0disp = p === 'ALL' || p === 'WM9KG'  ? 'grid' : 'none';
    const a1disp = p === 'ALL' || p === 'AC5T'   ? 'grid' : 'none';
    const a2disp = p === 'ALL' || p === 'REF380' ? 'grid' : 'none';
    const a3disp = p === 'ALL' || p === 'AC1T'   ? 'grid' : 'none';
    const a4disp = p === 'ALL' || p === 'DW14S'  ? 'grid' : 'none';

    // Defect keywords for Screen 9 — react to selected product
    const kwBase = (kws) => kws.map(k => ({
      text: k[0],
      bg:  k[1] === 'red'  ? '#FEF2F2' : k[1] === 'org' ? '#FFF7ED' : k[1] === 'amb' ? '#FFFBEB' : k[1] === 'blue' ? '#EEF2FF' : '#F0FDF4',
      col: k[1] === 'red'  ? '#DC2626' : k[1] === 'org' ? '#EA580C' : k[1] === 'amb' ? '#D97706' : k[1] === 'blue' ? '#2952CC' : '#059669',
      bd:  k[1] === 'red'  ? '#FECACA' : k[1] === 'org' ? '#FED7AA' : k[1] === 'amb' ? '#FDE68A' : k[1] === 'blue' ? '#BFDBFE' : '#BBF7D0',
    }));
    const kwMap = {
      ALL:   kwBase([['grinding noise \xd7 28','red'],['smoke / burning \xd7 3','red'],['not cooling \xd7 24','org'],['compressor \xd7 21','org'],['bearing failure \xd7 18','amb'],['under warranty \xd7 17','amb'],['batch B240315 \xd7 12','blue'],['vibration \xd7 9','grn']]),
      AC5T:  kwBase([['grinding noise \xd7 28','red'],['not cooling \xd7 24','org'],['compressor \xd7 21','org'],['bearing \xd7 18','amb'],['batch B240315 \xd7 12','blue'],['vibration \xd7 9','grn']]),
      WM9KG: kwBase([['smoke \xd7 3','red'],['burning smell \xd7 2','red'],['PCB fault \xd7 3','red'],['sparking \xd7 1','red'],['batch B240228 \xd7 3','blue']]),
      REF380:kwBase([['overheating \xd7 18','org'],['not cooling \xd7 14','org'],['condenser coil \xd7 12','amb'],['high temperature \xd7 9','amb'],['batch B240102 \xd7 8','blue']]),
      AC1T:  kwBase([['corrosion \xd7 15','org'],['rust marks \xd7 12','amb'],['coil damage \xd7 10','amb'],['coastal humidity \xd7 8','blue'],['batch B240408 \xd7 6','blue']]),
      DW14S: kwBase([['cavitation noise \xd7 6','amb'],['pump noise \xd7 5','amb'],['vibration \xd7 4','grn'],['batch B240315 \xd7 3','blue']]),
    };
    const defectKeywords = kwMap[selectedProduct] || kwMap['ALL'];

    // ── Per-product KPI data (Screens 0, 3) ──────────────────────
    const productData = {
      ALL:   {latency:'4.8', alerts:15, risk:'55', riskBar:'55%', riskGrad:'linear-gradient(90deg,#D97706,#EA580C)', riskLabel:'Moderate — Cross-Product Aggregate', units:'280', clusters:'42', purity:'92.1%', ucr:'18.4M', p0:1,p1:2,p2:4,p3:8},
      AC5T:  {latency:'6.2', alerts:3,  risk:'68', riskBar:'68%', riskGrad:'linear-gradient(90deg,#EA580C,#DC2626)', riskLabel:'High — P1 Critical active',         units:'48',  clusters:'8',  purity:'89.4%', ucr:'3.2M',  p0:0,p1:1,p2:1,p3:1},
      WM9KG: {latency:'0.1', alerts:1,  risk:'94', riskBar:'94%', riskGrad:'linear-gradient(90deg,#DC2626,#DC2626)', riskLabel:'Critical — P0 Safety active',       units:'3',   clusters:'3',  purity:'97.1%', ucr:'1.8M',  p0:1,p1:0,p2:0,p3:0},
      REF380:{latency:'8.1', alerts:2,  risk:'38', riskBar:'38%', riskGrad:'linear-gradient(90deg,#D97706,#EA580C)', riskLabel:'Moderate — P2 Serious active',      units:'23',  clusters:'5',  purity:'88.6%', ucr:'2.4M',  p0:0,p1:0,p2:1,p3:1},
      AC1T:  {latency:'9.4', alerts:2,  risk:'31', riskBar:'31%', riskGrad:'linear-gradient(90deg,#D97706,#D97706)', riskLabel:'Low-Moderate — P2 Serious',         units:'18',  clusters:'4',  purity:'90.2%', ucr:'1.6M',  p0:0,p1:0,p2:1,p3:1},
      DW14S: {latency:'11.2',alerts:1,  risk:'18', riskBar:'18%', riskGrad:'linear-gradient(90deg,#059669,#D97706)', riskLabel:'Low — P3 Emerging',                units:'8',   clusters:'2',  purity:'92.8%', ucr:'0.8M',  p0:0,p1:0,p2:0,p3:1},
    };
    const pd = productData[selectedProduct] || productData.ALL;
    const showP0Badge = pd.p0 > 0; const p0Label = pd.p0 + ' P0';
    const showP1Badge = pd.p1 > 0; const p1Label = pd.p1 + ' P1';
    const showP2Badge = pd.p2 > 0; const p2Label = pd.p2 + ' P2';
    const showP3Badge = pd.p3 > 0; const p3Label = pd.p3 + ' P3';

    // ── Cluster row visibility (Screen 3) ─────────────────────────
    const c0disp = p === 'ALL' || p === 'WM9KG'  ? 'grid' : 'none'; // P0 WM
    const c1disp = p === 'ALL' || p === 'AC5T'   ? 'grid' : 'none'; // P1 AC5T
    const c2disp = p === 'ALL' || p === 'REF380' ? 'grid' : 'none'; // P2 Ref
    const c3disp = p === 'ALL' || p === 'AC1T'   ? 'grid' : 'none'; // P2 WAC
    const c4disp = p === 'ALL' || p === 'DW14S'  ? 'grid' : 'none'; // P3 DW

    // ── Alert investigation context (Screen 5) ────────────────────
    const invMap = {
      ALL:   {tl:'PORTFOLIO VIEW',tbg:'#2952CC',cbg:'#EFF6FF',cBorder:'2px solid #2952CC',ewsCol:'#2952CC',title:'Cross-Product Platform Overview', meta:'15 Active Alerts · 42 Clusters Identified · Portfolio Aggregate',ews:'0.65',thresh:'System Avg'},
      AC5T:  {tl:'P1 CRITICAL',tbg:'#EA580C',cbg:'#FFF7ED',cBorder:'2px solid #EA580C',ewsCol:'#EA580C',title:'LG Dual Inverter AC-5T — Compressor Bearing Failure',   meta:'Alert P1-7234 · Cluster #7 · Batch B240315 · 2h ago · 48 complaints across 4 sources',ews:'0.81',thresh:'Threshold P1: 0.75'},
      WM9KG: {tl:'P0 SAFETY',  tbg:'#DC2626',cbg:'#FEF2F2',cBorder:'2px solid #DC2626',ewsCol:'#DC2626',title:'LG WM-9KG-FLD — PCB Short Circuit · Smoke / Fire',      meta:'Alert P0-1201 · Cluster #12 · Batch B240228 · 8 min ago · 3 complaints across 3 sources',ews:'0.97',thresh:'P0 Safety Bypass'},
      REF380:{tl:'P2 SERIOUS', tbg:'#D97706',cbg:'#FFFBEB',cBorder:'2px solid #D97706',ewsCol:'#D97706',title:'LG Ref-380L-FD — Condenser Coil Overheating',           meta:'Alert P2-4891 · Cluster #18 · Batch B240102 · 6h ago · 23 complaints across 3 sources',ews:'0.61',thresh:'Threshold P2: 0.50'},
      AC1T:  {tl:'P2 SERIOUS', tbg:'#D97706',cbg:'#FFFBEB',cBorder:'2px solid #D97706',ewsCol:'#D97706',title:'LG WAC-1.5T — Condenser Coil Corrosion',                meta:'Alert P2-5234 · Cluster #24 · Batch B240408 · 8h ago · 18 complaints across 2 sources',ews:'0.57',thresh:'Threshold P2: 0.50'},
      DW14S: {tl:'P3 EMERGING',tbg:'#059669',cbg:'#F0FDF4',cBorder:'2px solid #059669',ewsCol:'#059669',title:'LG DW-14S Dishwasher — Water Pump Cavitation Noise',    meta:'Alert P3-6102 · Cluster #31 · Batch B240315 · 1d ago · 8 complaints across 2 sources',ews:'0.31',thresh:'Threshold P3: 0.25'},
    };
    const inv = invMap[selectedProduct] || invMap.ALL;

    // ── Alert Investigation card data (Screen 5) ──────────────────────
    const rcaMap = {
      ALL:   { icon:'📊', label:'Systemic Quality Deviations', sub:'Multiple batches affected across 3 primary product lines', conf:85, confW:'85%', bars:[{t:'Cross-product bearing failure rate',v:'+0.35',w:'65%'},{t:'Coastal corrosion patterns',v:'+0.22',w:'40%'},{t:'PCB thermal runaway (WM)',v:'+0.18',w:'35%'}], cats:[{l:'Manufacturing Batch',w:'35%',c:'#2952CC'},{l:'Design Flaw',w:'28%',c:'#7C3AED'},{l:'Component Supplier',w:'22%',c:'#0D9488'},{l:'Other',w:'15%',c:'#9B9690'}] },{t:'Geographic spread (8 states, North-heavy)',v:'+0.18',w:'34%'},{t:'CUSUM velocity (σ = 8.7, threshold: 5)',v:'+0.15',w:'29%'},{t:'Time-to-complaint peak (45d = mfg pattern)',v:'+0.12',w:'23%'},{t:'SC part replaced: bearing + compressor',v:'+0.09',w:'17%'},{t:'No firmware version change',v:'−0.05',w:'9%',neg:true}], cats:[{l:'Manufacturing Batch',w:'88%',c:'#2952CC'},{l:'Component Supplier',w:'8%',c:'#9B9690'},{l:'Design Flaw',w:'2%',c:'#9B9690'},{l:'Other',w:'2%',c:'#9B9690'}] },
      AC5T:  { icon:'🏭', label:'Manufacturing Batch Defect', sub:'Batch B240315 — Capacitor-grade bearing in compressor sub-assembly', conf:88, confW:'88%', bars:[{t:'Batch B240315 failure rate (8× normal)',v:'+0.42',w:'80%'},{t:'Geographic spread (8 states, North-heavy)',v:'+0.18',w:'34%'},{t:'CUSUM velocity (σ = 8.7, threshold: 5)',v:'+0.15',w:'29%'},{t:'Time-to-complaint peak (45d = mfg pattern)',v:'+0.12',w:'23%'},{t:'SC part replaced: bearing + compressor',v:'+0.09',w:'17%'},{t:'No firmware version change',v:'−0.05',w:'9%',neg:true}], cats:[{l:'Manufacturing Batch',w:'88%',c:'#2952CC'},{l:'Component Supplier',w:'8%',c:'#9B9690'},{l:'Design Flaw',w:'2%',c:'#9B9690'},{l:'Other',w:'2%',c:'#9B9690'}] },
      WM9KG: { icon:'⚡', label:'Component Supplier Defect', sub:'Batch B240228 — Substandard PCB capacitor from supplier CSU-07', conf:94, confW:'94%', bars:[{t:'PCB supplier CSU-07 defect rate (12× normal)',v:'+0.51',w:'97%'},{t:'Safety keywords: smoke / burning (3 posts)',v:'+0.28',w:'53%'},{t:'Batch B240228 correlated across 3 sources',v:'+0.19',w:'36%'},{t:'Time-to-failure < 15 days (component fault)',v:'+0.14',w:'27%'},{t:'No installation quality flag',v:'−0.04',w:'8%',neg:true}], cats:[{l:'Component Supplier',w:'94%',c:'#DC2626'},{l:'Manufacturing Batch',w:'4%',c:'#9B9690'},{l:'Other',w:'2%',c:'#9B9690'}] },
      REF380:{ icon:'🔧', label:'Design Flaw — Thermal Management', sub:'Condenser coil geometry insufficient for sustained 40°C+ ambient', conf:76, confW:'76%', bars:[{t:'Condenser temp delta (28°C above spec)',v:'+0.38',w:'72%'},{t:'Climate zone correlation (South India)',v:'+0.22',w:'42%'},{t:'Multiple batches affected (design-wide)',v:'+0.17',w:'32%'},{t:'Repeat failures at same symptom locus',v:'+0.11',w:'21%'},{t:'No batch anomaly flagged',v:'−0.06',w:'11%',neg:true}], cats:[{l:'Design Flaw',w:'76%',c:'#7C3AED'},{l:'Manufacturing Batch',w:'14%',c:'#9B9690'},{l:'Other',w:'10%',c:'#9B9690'}] },
      AC1T:  { icon:'🌊', label:'Component Supplier — Coil Quality', sub:'Batch B240408 — Aluminium coil with insufficient anti-corrosion coating', conf:71, confW:'71%', bars:[{t:'Coastal district complaint cluster',v:'+0.35',w:'67%'},{t:'Humidity exposure correlation (85%+ RH)',v:'+0.24',w:'46%'},{t:'Coil supplier CSU-11 quality audit gap',v:'+0.18',w:'34%'},{t:'Rapid failure timeline (60–90d)',v:'+0.10',w:'19%'},{t:'No firmware / software change',v:'−0.03',w:'6%',neg:true}], cats:[{l:'Component Supplier',w:'71%',c:'#0D9488'},{l:'Design Flaw',w:'19%',c:'#9B9690'},{l:'Other',w:'10%',c:'#9B9690'}] },
      DW14S: { icon:'💧', label:'Design Flaw — Pump Hydraulics', sub:'Water pump impeller cavitation at low-pressure inlet conditions', conf:58, confW:'58%', bars:[{t:'Cavitation noise pattern at partial load',v:'+0.29',w:'55%'},{t:'Inlet pressure correlation (low-pressure zones)',v:'+0.21',w:'40%'},{t:'Batch-agnostic spread (design-wide)',v:'+0.14',w:'27%'},{t:'Similar pump design flagged in DW-12S',v:'+0.09',w:'17%'},{t:'No supplier lot anomaly',v:'−0.04',w:'8%',neg:true}], cats:[{l:'Design Flaw',w:'58%',c:'#7C3AED'},{l:'Manufacturing Batch',w:'28%',c:'#9B9690'},{l:'Other',w:'14%',c:'#9B9690'}] },
    };
    const rca = rcaMap[selectedProduct] || rcaMap.ALL;

    const evMap = {
      ALL:   { count:102, c1:42, c2:31, c3:20, c4:9, src:'7 sources', q1:{ ch:'CRM',cx:'Customer [C-7834] · AC-5T · Delhi NCR', ct:'"LG AC compressor loud grinding noise, not cooling. Technician: bearing failed."' }, q2:{ ch:'Social Media', cx:'User [@rahul_del] · WM-9KG · Twitter', ct:'"LG washing machine started smoking from the back panel within 2 weeks. Immediate safety hazard."' }, q3:{ ch:'CRM', cx:'Customer [C-6612] · AC-1T · Ratnagiri', ct:'"AC stopped working — technician found coil is heavily corroded. Only 2 months old."' } }, q2:{ ch:'Service Centre', cx:'SC-DL-042 · Technician note · Day 43', ct:'"Bearing replacement. Part: 4681A20173B. Same issue on 6 units from batch B240315 this week."' }, q3:{ ch:'WhatsApp', cx:'Consumer [W-2241] · Chandigarh', ct:'"My LG AC is making a loud grinding noise — still under warranty at 1.5 months. Others in my building are reporting the same issue."' } },
      AC5T:  { count:48, c1:23, c2:14, c3:8, c4:3, src:'4 sources', q1:{ ch:'CRM',cx:'Customer [C-7834] · Delhi NCR · Day 47', ct:'"LG AC compressor loud grinding noise, not cooling. Technician: bearing failed. Only 47 days old. Batch [B240315]."' }, q2:{ ch:'Service Centre', cx:'SC-DL-042 · Technician note · Day 43', ct:'"Bearing replacement. Part: 4681A20173B. Same issue on 6 units from batch B240315 this week."' }, q3:{ ch:'WhatsApp', cx:'Consumer [W-2241] · Chandigarh', ct:'"My LG AC is making a loud grinding noise — still under warranty at 1.5 months."' } },
      WM9KG: { count:3, c1:1, c2:1, c3:1, c4:0, src:'3 sources', q1:{ ch:'Social Media',cx:'User [@rahul_del] · Twitter · Day 14', ct:'"LG washing machine started smoking from the back panel within 2 weeks. Smells like burning plastic. Immediate safety hazard. Batch B240228."' }, q2:{ ch:'CRM', cx:'Customer [C-9912] · Mumbai · Day 11', ct:'"Washing machine has burning smell and visible smoke from PCB area. I switched it off immediately. Filed urgent complaint."' }, q3:{ ch:'Service Centre', cx:'SC-MUM-018 · Engineer note · Day 13', ct:'"PCB capacitor failure — signs of thermal runaway. Component from supplier CSU-07. Part: PCB-ASSY-WM-9K. Safety concern."' } },
      REF380:{ count:23, c1:10, c2:8, c3:5, c4:0, src:'3 sources', q1:{ ch:'CRM',cx:'Customer [C-4421] · Chennai · Day 52', ct:'"Refrigerator not cooling properly, condenser area is very hot to touch. Running in a 40°C room. Still under warranty."' }, q2:{ ch:'Service Centre', cx:'SC-CHN-009 · Technician note · Day 48', ct:'"Condenser coil overheating consistently. Not a batch-specific issue — seen in multiple units across B240102 and B231208. Design-level thermal problem."' }, q3:{ ch:'WhatsApp', cx:'Consumer [W-5534] · Kochi', ct:'"My LG fridge stops cooling every afternoon during peak heat. Technician came twice, says condenser coil overheats in high ambient."' } },
      AC1T:  { count:18, c1:8, c2:6, c3:4, c4:0, src:'2 sources', q1:{ ch:'CRM',cx:'Customer [C-6612] · Ratnagiri · Day 68', ct:'"AC stopped working — technician found coil is heavily corroded. Only 2 months old, coastal area. Batch B240408."' }, q2:{ ch:'Service Centre', cx:'SC-MH-034 · Technician note · Day 71', ct:'"Aluminium coil corrosion due to sea-salt humidity exposure. Anti-corrosion coating insufficient. Seen in 4 units from B240408 along Konkan coast."' }, q3:{ ch:'CRM', cx:'Customer [C-6789] · Alibag · Day 74', ct:'"Rust and corrosion visible on AC coils after just 75 days. Completely failed. All along coastal Maharashtra having same problem."' } },
      DW14S: { count:8, c1:4, c2:3, c3:1, c4:0, src:'2 sources', q1:{ ch:'CRM',cx:'Customer [C-8823] · Bengaluru · Day 30', ct:'"Dishwasher makes loud knocking noise during wash cycle. Sounds like something hitting inside the pump. Batch B240315."' }, q2:{ ch:'Service Centre', cx:'SC-BLR-022 · Technician note · Day 35', ct:'"Pump cavitation noise at partial water load. Hydraulic design issue in impeller — not a manufacturing defect. 3 units from different batches with same symptom."' }, q3:{ ch:'CRM', cx:'Customer [C-9001] · Hyderabad · Day 28', ct:'"LG dishwasher vibrating heavily and noisy from day one. Pump sounds like it\'s struggling. Under warranty."' } },
    };
    const ev = evMap[selectedProduct] || evMap.ALL;
    const evC4show = ev.c4 > 0;

    const actMap = {
      ALL:   { steps:[ {h:'Review active quarantine protocols',d:'multiple product lines'},{h:'Conduct supplier audits',d:'CSU-04 and CSU-07 flagged'},{h:'Coordinate safety recalls',d:'WM-9KG PCB thermal issues'},{h:'Monitor warranty escalations',d:'portfolio-wide'} ] },{h:'Initiate supplier quality investigation',d:'bearing supplier CSU-04 — ThermoTech'},{h:'Pre-position part 4681A20173B',d:'at NCR, UP, Punjab service centres'},{h:'Escalate to Mfg Head + Supplier Quality Mgr',d:'72h SLA'} ] },
      AC5T:  { steps:[ {h:'Quarantine Batch B240315',d:'halt further distribution immediately'},{h:'Initiate supplier quality investigation',d:'bearing supplier CSU-04 — ThermoTech'},{h:'Pre-position part 4681A20173B',d:'at NCR, UP, Punjab service centres'},{h:'Escalate to Mfg Head + Supplier Quality Mgr',d:'72h SLA'} ] },
      WM9KG: { steps:[ {h:'IMMEDIATE: Stop-sale all B240228 units',d:'safety risk confirmed — do not delay'},{h:'Initiate voluntary safety recall',d:'notify CCPA and BIS within 24h'},{h:'Suspend supplier CSU-07 procurement',d:'pending root cause audit completion'},{h:'Proactive customer outreach',d:'all B240228 buyers — safety advisory'} ] },
      REF380:{ steps:[ {h:'R&D design review — condenser coil',d:'thermal capacity for 40°C+ ambient conditions'},{h:'Issue service advisory',d:'recommend ventilated room placement for South India users'},{h:'Expedite FY27 coil redesign',d:'increase surface area by 15% per thermal model'},{h:'Pre-position replacement coils',d:'TN, Kerala, AP service centres before peak summer'} ] },
      AC1T:  { steps:[ {h:'Supplier CSU-11 audit',d:'anti-corrosion coating specification review'},{h:'Proactive replacement programme',d:'all coastal B240408 units — marine-grade coil swap'},{h:'Service bulletin dispatch',d:'mandatory anti-corrosion treatment for coastal installs'},{h:'FY27 design update',d:'marine-grade aluminium coating as standard for coastal SKUs'} ] },
      DW14S: { steps:[ {h:'R&D pump redesign',d:'impeller geometry for low-pressure inlet (< 1.5 bar) operation'},{h:'Monitor complaint velocity',d:'escalate to P2 if > 15 complaints in 7 days'},{h:'Brief service centres',d:'pump replacement SOP for cavitation noise symptoms'},{h:'Cross-check Batch B240315',d:'shared with AC-5T; link supplier audit already in progress'} ] },
    };
    const act = actMap[selectedProduct] || actMap.ALL;

    // ── Geographic page data (Screen 9) ──────────────────────────────
    const geoMap = {
      ALL: {
        spread: { score:'0.57', states:'8 of 28', focus:'North India concentration', weight:'15%', desc:'Distribution from Batch B240315 manufacturing plant in Noida is consistent with North India cluster — confirms manufacturing batch attribution.' },
        rc: { svc:68, eng:32, svcNote:'Bearing swap (Part 4681A20173B) closed on-site · Service bulletin dispatched to NCR, UP, Punjab SCs', engNote:'Factory Correction Insight: Batch B240315 bearing sub-assembly failed across 8 North Indian states. Root cause traced to capacitor-grade bearing used in compressor assembly at Noida plant. North-heavy distribution confirms factory origin, not climate or installation. Further Action: Halt B240315 distribution; initiate R&D investigation on bearing spec CSU-04; escalate to Supplier Quality Manager within 72h.' },
        qc: { batchRate:'0.42%', batchW:'84%', batchCol:'#DC2626', std:'<0.05%', stdW:'10%', hist:'0.12%', histW:'24%', note:'8.4× above QC standard · 3.5× above historical avg', noteSub:'Non-random pattern → consistent with manufacturing batch fault' },
        ch: [{ tag:'SHOWROOM', tagBg:'#2952CC', name:'Vijay Sales, CP Delhi', detail:'Supplier: CSU-04 (ThermoTech) · Batch: B240315 · Delivered: Mar 18, 2026 · Pre-ship QC: Partial pass — vibration test skipped' },{ tag:'E-COMMERCE', tagBg:'#7C3AED', name:'Amazon.in / Flipkart', detail:'Warehouse: FCL Delhi NH-48 · Supplier: CSU-04 · Batch: B240315 · Dispatch: Mar 20, 2026 · QC: Partial pass' },{ tag:'QUICK COMM', tagBg:'#0D9488', name:'Blinkit · Dark Store DS-DL-042, Noida', detail:'Facilitator: Zomato Blinkit · DS-DL-042 · Supplier: CSU-04 · Batch: B240315 · Received: Mar 21, 2026' }],
        parts: [{ part:'Compressor Bearing (4681A20173B)', count:28, pct:'58%', col:'#DC2626', w:'58%' },{ part:'Compressor Assembly (COMP-AC5T)', count:12, pct:'25%', col:'#EA580C', w:'25%' },{ part:'PCB Board (PCB-AC-INV)', count:5, pct:'10%', col:'#D97706', w:'10%' },{ part:'Capacitor Set (CAP-AC5T)', count:3, pct:'7%', col:'#059669', w:'7%' }],
      },
      AC5T: {
        spread: { score:'0.57', states:'8 of 28', focus:'North India concentration', weight:'15%', desc:'Distribution from Batch B240315 manufacturing plant in Noida is consistent with North India cluster — confirms manufacturing batch attribution.' },
        rc: { svc:68, eng:32, svcNote:'Bearing swap (Part 4681A20173B) closed on-site · Service bulletin dispatched to NCR, UP, Punjab SCs', engNote:'Factory Correction Insight: Batch B240315 bearing sub-assembly failed across 8 North Indian states. Root cause traced to capacitor-grade bearing used in compressor assembly at Noida plant. North-heavy distribution confirms factory origin, not climate or installation. Further Action: Halt B240315 distribution; initiate R&D investigation on bearing spec CSU-04; escalate to Supplier Quality Manager within 72h.' },
        qc: { batchRate:'0.42%', batchW:'84%', batchCol:'#DC2626', std:'<0.05%', stdW:'10%', hist:'0.12%', histW:'24%', note:'8.4× above QC standard · 3.5× above historical avg', noteSub:'Non-random pattern → consistent with manufacturing batch fault' },
        ch: [{ tag:'SHOWROOM', tagBg:'#2952CC', name:'Vijay Sales, CP Delhi', detail:'Supplier: CSU-04 (ThermoTech) · Batch: B240315 · Delivered: Mar 18, 2026 · Pre-ship QC: Partial pass — vibration test skipped' },{ tag:'E-COMMERCE', tagBg:'#7C3AED', name:'Amazon.in / Flipkart', detail:'Warehouse: FCL Delhi NH-48 · Supplier: CSU-04 · Batch: B240315 · Dispatch: Mar 20, 2026 · QC: Partial pass' },{ tag:'QUICK COMM', tagBg:'#0D9488', name:'Blinkit · Dark Store DS-DL-042, Noida', detail:'Facilitator: Zomato Blinkit · DS-DL-042 · Supplier: CSU-04 · Batch: B240315 · Received: Mar 21, 2026' }],
        parts: [{ part:'Compressor Bearing (4681A20173B)', count:28, pct:'58%', col:'#DC2626', w:'58%' },{ part:'Compressor Assembly (COMP-AC5T)', count:12, pct:'25%', col:'#EA580C', w:'25%' },{ part:'PCB Board (PCB-AC-INV)', count:5, pct:'10%', col:'#D97706', w:'10%' },{ part:'Capacitor Set (CAP-AC5T)', count:3, pct:'7%', col:'#059669', w:'7%' }],
      },
      WM9KG: {
        spread: { score:'0.12', states:'2 of 28', focus:'Mumbai + Delhi NCR only', weight:'5%', desc:'Extremely localised spread (2 cities) from Batch B240228 — consistent with targeted component supplier fault at specific fulfilment hubs, not factory-wide.' },
        rc: { svc:20, eng:80, svcNote:'PCB replacement (PCB-ASSY-WM-9K) by trained technician · Safety advisory issued to all B240228 buyers', engNote:'Factory Correction Insight: PCB short-circuit (smoke / fire) emerged within 14 days in Mumbai and Delhi NCR — both hubs received stock from the same supplier CSU-07 batch. Localisation to 2 cities confirms supply-chain fault, not design-wide issue. High safety severity mandates immediate factory recall. Further Action: Voluntary safety recall of all B240228 units; suspend CSU-07 procurement; notify CCPA and BIS within 24h; activate customer safety hotline.' },
        qc: { batchRate:'1.20%', batchW:'96%', batchCol:'#DC2626', std:'<0.05%', stdW:'4%', hist:'0.10%', histW:'8%', note:'24× above QC standard · 12× above historical avg', noteSub:'Safety-critical failure → immediate recall threshold exceeded' },
        ch: [{ tag:'E-COMMERCE', tagBg:'#7C3AED', name:'Amazon.in · Mumbai FC', detail:'Supplier: CSU-07 (ElectroParts) · Batch: B240228 · Delivered: Feb 25, 2026 · Pre-ship QC: Fail — returned, re-cleared incorrectly' },{ tag:'SHOWROOM', tagBg:'#2952CC', name:'Croma, Andheri Mumbai', detail:'Supplier: CSU-07 · Batch: B240228 · Delivered: Feb 27, 2026 · QC: Partial pass only' },{ tag:'SERVICE', tagBg:'#DC2626', name:'LG ASC Mumbai MUM-018', detail:'3 safety complaints escalated directly · PCB thermal runaway confirmed · Safety hold applied' }],
        parts: [{ part:'PCB Assembly (PCB-ASSY-WM-9K)', count:3, pct:'100%', col:'#DC2626', w:'100%' }],
      },
      REF380: {
        spread: { score:'0.31', states:'3 of 28', focus:'South India — TN, Kerala, AP', weight:'10%', desc:'South-concentrated spread across high-ambient states (>38°C peak summer) — consistent with thermal design flaw exposed under extreme climate conditions, not batch-specific.' },
        rc: { svc:55, eng:45, svcNote:'Temporary fix: improved ventilation around condenser · Coolant re-charge + thermostat recalibration at SC', engNote:'Factory Correction Insight: Condenser coil overheating observed exclusively in South Indian states with peak summer temperatures above 38°C. The defect appears across multiple batches (B240102, B231208), ruling out a batch fault. This is a thermal design limitation in the condenser geometry for high-ambient conditions. Further Action: Expedite FY27 condenser redesign (target +15% surface area); issue service advisory for high-ambient regions; pre-position replacement coils in TN, Kerala, AP SCs.' },
        qc: { batchRate:'0.28%', batchW:'56%', batchCol:'#D97706', std:'<0.05%', stdW:'10%', hist:'0.12%', histW:'24%', note:'5.6× above QC standard · 2.3× above historical avg', noteSub:'Multi-batch pattern → design flaw rather than batch fault' },
        ch: [{ tag:'SHOWROOM', tagBg:'#2952CC', name:'Viveks, Chennai T.Nagar', detail:'Supplier: Standard MFG · Multi-batch · Pre-ship QC: Pass — no thermal stress test at 40°C ambient' },{ tag:'E-COMMERCE', tagBg:'#7C3AED', name:'Flipkart · Hyderabad FC', detail:'Batches: B240102 + B231208 · Both affected · QC: Standard pass only' },{ tag:'SERVICE', tagBg:'#0D9488', name:'LG ASC Chennai + Kochi', detail:'23 complaints across TN, Kerala, AP · All peak summer months (Apr–Jun)' }],
        parts: [{ part:'Condenser Coil Assembly', count:18, pct:'78%', col:'#D97706', w:'78%' },{ part:'Thermostat Sensor (TS-380)', count:3, pct:'13%', col:'#EA580C', w:'13%' },{ part:'Coolant Refill (R-600a)', count:2, pct:'9%', col:'#059669', w:'9%' }],
      },
      AC1T: {
        spread: { score:'0.22', states:'Coastal Maharashtra only', focus:'Konkan coast — Ratnagiri, Alibag, Raigad', weight:'8%', desc:'Tightly clustered along Konkan coastline (85%+ relative humidity zones) — confirms anti-corrosion coating failure under marine conditions, not factory-wide defect.' },
        rc: { svc:60, eng:40, svcNote:'Coil replacement (aluminium marine-grade) on-site · Anti-corrosion spray treatment at SC', engNote:'Factory Correction Insight: Aluminium coil corrosion from Batch B240408 is geographically confined to coastal Maharashtra — all cases within 15km of coastline with sustained RH above 85%. Standard anti-corrosion coating (applied by supplier CSU-11) failed within 60–90 days of sea-salt exposure. Pattern is batch-specific but failure mode is a coating specification gap. Further Action: Upgrade coating spec to marine-grade for all coastal SKUs; audit CSU-11 coating process; proactive coil replacement programme for all B240408 coastal customers.' },
        qc: { batchRate:'0.35%', batchW:'70%', batchCol:'#D97706', std:'<0.05%', stdW:'10%', hist:'0.12%', histW:'24%', note:'7.0× above QC standard · Coastal region specific', noteSub:'Coating failure confirmed — not applicable to non-coastal deployments' },
        ch: [{ tag:'SHOWROOM', tagBg:'#2952CC', name:'Vijay Sales, Ratnagiri', detail:'Supplier: CSU-11 (CoilTech) · Batch: B240408 · Delivered: Apr 10, 2026 · Coating: Standard only' },{ tag:'SERVICE', tagBg:'#0D9488', name:'LG ASC Ratnagiri + Alibag', detail:'18 complaints along Konkan coast · All B240408 · Avg failure: 70 days post-install' }],
        parts: [{ part:'Aluminium Condenser Coil (AC1T-COIL)', count:15, pct:'83%', col:'#EA580C', w:'83%' },{ part:'Coil Fins (FIN-AC1T)', count:2, pct:'11%', col:'#D97706', w:'11%' },{ part:'Other', count:1, pct:'6%', col:'#059669', w:'6%' }],
      },
      DW14S: {
        spread: { score:'0.09', states:'2 cities', focus:'Bengaluru + Hyderabad', weight:'4%', desc:'Localised to 2 metro cities with known low-pressure water supply zones — strongly correlates with hydraulic design limitation at partial inlet pressure, not a geographic batch fault.' },
        rc: { svc:75, eng:25, svcNote:'Pump pressure adjustment + inlet filter cleaning · Technician advisory on minimum inlet pressure requirements', engNote:'Factory Correction Insight: Water pump cavitation noise in Bengaluru and Hyderabad aligns with low-pressure water supply zones in both cities (recorded inlet pressure 0.8–1.2 bar vs. 2.0 bar design spec). The issue spans multiple batches — confirming this is a hydraulic design limitation, not a manufacturing defect. Further Action: R&D to redesign impeller for 0.8 bar minimum inlet; issue customer advisory on water pressure requirements; monitor for spread to other low-pressure cities.' },
        qc: { batchRate:'0.08%', batchW:'16%', batchCol:'#D97706', std:'<0.05%', stdW:'10%', hist:'0.06%', histW:'12%', note:'1.6× above QC standard · Low severity — P3 monitoring', noteSub:'Design-wide issue at low inlet pressure — not batch-specific' },
        ch: [{ tag:'E-COMMERCE', tagBg:'#7C3AED', name:'Amazon.in · Bengaluru FC', detail:'Batch: B240315 · QC: Pass · Low-pressure zone delivery area' },{ tag:'SERVICE', tagBg:'#0D9488', name:'LG ASC Bengaluru + Hyderabad', detail:'8 complaints · Both low water-pressure zones · Multiple batches' }],
        parts: [{ part:'Water Pump Assembly (WP-DW14)', count:6, pct:'75%', col:'#D97706', w:'75%' },{ part:'Inlet Valve (IV-DW14)', count:2, pct:'25%', col:'#059669', w:'25%' }],
      },
    };
    const geo = geoMap[selectedProduct] || geoMap.ALL;

    // Word-cloud heatmap data per product
    const geoWordsMap = {
      ALL:   [{ state:'Delhi NCR', word:'Grinding', size:22, fill:'#DC2626', bg:'rgba(220,38,38,0.12)', count:12 },{ state:'Uttar Pradesh', word:'Not Cooling', size:19, fill:'#DC2626', bg:'rgba(220,38,38,0.09)', count:9 },{ state:'Punjab', word:'Bearing', size:17, fill:'#EA580C', bg:'rgba(234,88,12,0.10)', count:6 },{ state:'Rajasthan', word:'Compressor', size:16, fill:'#EA580C', bg:'rgba(234,88,12,0.08)', count:5 },{ state:'Haryana', word:'Vibration', size:15, fill:'#EA580C', bg:'rgba(234,88,12,0.08)', count:4 },{ state:'Maharashtra', word:'Smoke', size:15, fill:'#DC2626', bg:'rgba(220,38,38,0.09)', count:4 },{ state:'Gujarat', word:'Overheating', size:13, fill:'#D97706', bg:'rgba(217,119,6,0.09)', count:2 },{ state:'Karnataka', word:'Corrosion', size:12, fill:'#059669', bg:'rgba(5,150,105,0.08)', count:2 },{ state:'Tamil Nadu', word:'Noise', size:11, fill:'#9B9690', bg:'rgba(155,150,144,0.07)', count:0 },{ state:'Himachal Pradesh', word:'Bearing', size:12, fill:'#D97706', bg:'rgba(217,119,6,0.08)', count:3 },{ state:'Madhya Pradesh', word:'Warranty', size:12, fill:'#9B9690', bg:'rgba(155,150,144,0.07)', count:1 },{ state:'Telangana', word:'Overheating', size:11, fill:'#9B9690', bg:'rgba(155,150,144,0.07)', count:1 },{ state:'Andhra Pradesh', word:'Coil Fault', size:11, fill:'#9B9690', bg:'rgba(155,150,144,0.07)', count:1 }],
      AC5T:  [{ state:'Delhi NCR', word:'Grinding', size:22, fill:'#DC2626', bg:'rgba(220,38,38,0.12)', count:12 },{ state:'Uttar Pradesh', word:'Not Cooling', size:19, fill:'#DC2626', bg:'rgba(220,38,38,0.09)', count:9 },{ state:'Punjab', word:'Bearing Fail', size:17, fill:'#EA580C', bg:'rgba(234,88,12,0.10)', count:6 },{ state:'Rajasthan', word:'Compressor', size:16, fill:'#EA580C', bg:'rgba(234,88,12,0.08)', count:5 },{ state:'Haryana', word:'Vibration', size:15, fill:'#EA580C', bg:'rgba(234,88,12,0.08)', count:4 },{ state:'Himachal Pradesh', word:'Grinding', size:13, fill:'#D97706', bg:'rgba(217,119,6,0.08)', count:3 },{ state:'Gujarat', word:'Noise', size:12, fill:'#D97706', bg:'rgba(217,119,6,0.07)', count:2 },{ state:'Karnataka', word:'Not Cooling', size:11, fill:'#059669', bg:'rgba(5,150,105,0.07)', count:1 }],
      WM9KG: [{ state:'Mumbai', word:'Smoke', size:22, fill:'#DC2626', bg:'rgba(220,38,38,0.14)', count:2 },{ state:'Delhi NCR', word:'Burning Smell', size:19, fill:'#DC2626', bg:'rgba(220,38,38,0.11)', count:1 }],
      REF380:[{ state:'Tamil Nadu', word:'Overheating', size:21, fill:'#D97706', bg:'rgba(217,119,6,0.12)', count:10 },{ state:'Kerala', word:'Not Cooling', size:18, fill:'#D97706', bg:'rgba(217,119,6,0.10)', count:8 },{ state:'Andhra Pradesh', word:'Condenser Hot', size:16, fill:'#EA580C', bg:'rgba(234,88,12,0.09)', count:5 },{ state:'Karnataka', word:'High Temp', size:13, fill:'#D97706', bg:'rgba(217,119,6,0.07)', count:3 }],
      AC1T:  [{ state:'Ratnagiri', word:'Corrosion', size:22, fill:'#EA580C', bg:'rgba(234,88,12,0.12)', count:7 },{ state:'Raigad', word:'Rust', size:19, fill:'#EA580C', bg:'rgba(234,88,12,0.10)', count:6 },{ state:'Alibag', word:'Coil Damage', size:17, fill:'#D97706', bg:'rgba(217,119,6,0.09)', count:5 },{ state:'Sindhudurg', word:'Rust Marks', size:14, fill:'#D97706', bg:'rgba(217,119,6,0.08)', count:2 }],
      DW14S: [{ state:'Bengaluru', word:'Cavitation', size:21, fill:'#D97706', bg:'rgba(217,119,6,0.11)', count:5 },{ state:'Hyderabad', word:'Pump Noise', size:18, fill:'#D97706', bg:'rgba(217,119,6,0.09)', count:3 }],
    };
    const geoWords = geoWordsMap[selectedProduct] || geoWordsMap.ALL;

    const geoPos = {
      'Delhi NCR': { top: 30, left: 45 },
      'Uttar Pradesh': { top: 38, left: 58 },
      'Punjab': { top: 18, left: 32 },
      'Haryana': { top: 25, left: 40 },
      'Rajasthan': { top: 42, left: 28 },
      'Himachal Pradesh': { top: 12, left: 38 },
      'Gujarat': { top: 55, left: 18 },
      'Maharashtra': { top: 62, left: 35 },
      'Mumbai': { top: 68, left: 18 },
      'Ratnagiri': { top: 78, left: 22 },
      'Raigad': { top: 68, left: 26 },
      'Alibag': { top: 58, left: 24 },
      'Sindhudurg': { top: 88, left: 25 },
      'Karnataka': { top: 80, left: 35 },
      'Bengaluru': { top: 88, left: 40 },
      'Tamil Nadu': { top: 92, left: 48 },
      'Kerala': { top: 95, left: 35 },
      'Andhra Pradesh': { top: 75, left: 52 },
      'Telangana': { top: 65, left: 48 },
      'Hyderabad': { top: 68, left: 55 },
      'Madhya Pradesh': { top: 52, left: 45 }
    };
    const enhancedGeoWords = geoWords.map(gw => {
      const pos = geoPos[gw.state] || { top: 50, left: 50 };
      const newSize = Math.max(16, gw.size * 1.5);
      return { ...gw, top: pos.top, left: pos.left, size: newSize };
    });


    // ── Manufacturer alert context (Screen 7) ─────────────────────
    const mfrMap = {
      ALL:   {tier:'PORTFOLIO WIDE ALERTS',tbg:'#2952CC',cbg:'#fff',cborder:'1px solid #BFDBFE',title:'Action Required: Multiple Quarantines & Recalls',batch:'Multiple',sku:'All Products Portfolio',scope:'15 Active Alerts Across Lines',root:'Multiple Categories',det:'Continuous Monitoring',units:'~200+'},
      AC5T:  {tier:'P1 CRITICAL — MFR ALERT',tbg:'#EA580C',cbg:'#fff',cborder:'1px solid #FED7AA',title:'Action Required: Batch Quarantine — LG AC-5T',batch:'B240315',sku:'LG Dual Inverter AC-5T (PSKA19ENXF)',scope:'48 complaints · 8 states · 22 cities',root:'Manufacturing Batch (88%)',det:'Day 6.2',units:'~180'},
      WM9KG: {tier:'P0 SAFETY — MFR ALERT',  tbg:'#DC2626',cbg:'#fff',cborder:'2px solid #FECACA', title:'URGENT: Safety Recall — LG WM-9KG-FLD',batch:'B240228',sku:'LG Front Load WM-9KG-FLD (FHV1409ZWB)',scope:'3 complaints · Mumbai, Delhi NCR',root:'Component Supplier (94%)',det:'Day 0.1',units:'~3'},
      REF380:{tier:'P2 SERIOUS — MFR ALERT',  tbg:'#D97706',cbg:'#fff',cborder:'1px solid #FDE68A',title:'Action Required: Design Review — LG Ref-380L-FD',batch:'B240102',sku:'LG French Door Ref-380L-FD (GL-T412VPZX)',scope:'23 complaints · TN, Kerala, AP',root:'Design Flaw (76%)',det:'Day 8.1',units:'~23'},
      AC1T:  {tier:'P2 SERIOUS — MFR ALERT',  tbg:'#D97706',cbg:'#fff',cborder:'1px solid #FDE68A',title:'Action Required: Supplier Audit — LG WAC-1.5T',batch:'B240408',sku:'LG Window AC-1.5T (PS-Q12YNZE)',scope:'18 complaints · Coastal Maharashtra',root:'Component Supplier (71%)',det:'Day 9.4',units:'~18'},
      DW14S: {tier:'P3 EMERGING — MFR ALERT',  tbg:'#059669',cbg:'#fff',cborder:'1px solid #BBF7D0',title:'Monitor: Pump Design — LG DW-14S',batch:'B240315',sku:'LG Dishwasher DW-14S (DFB424FP)',scope:'8 complaints · Bengaluru, Hyderabad',root:'Design Flaw (58%)',det:'Day 11.2',units:'~8'},
    };
    const mfr = mfrMap[selectedProduct] || mfrMap.ALL;

    // ── Ingestion data per product ───────────────────────────────────
    const ingMap = {
      ALL:   { total:'8,361', dedup:'7,024', dedupRate:'16.0%',
        crm:{ vol:'1,842', trend:'▲ +12%', tc:'#059669', alert:null },
        sc: { vol:'634',   trend:'▲ +8%',  tc:'#059669', alert:null },
        app:{ vol:'287',   trend:'▲ +3%',  tc:'#059669', alert:null },
        wa: { vol:'412',   trend:'▲ +21%', tc:'#D97706', alert:null },
        soc:{ vol:'1,203', trend:'▲ +34%', tc:'#DC2626', alert:'Safety: "LG washing machine smoke" — 3 posts in 8 min → P0 alert triggered' },
        ec: { vol:'3,841', trend:'▲ +5%',  tc:'#059669', alert:null },
        doa:'142', batches:'96%' },
      AC5T:  { total:'2,240', dedup:'1,880', dedupRate:'16.1%',
        crm:{ vol:'823',  trend:'▲ +18%', tc:'#EA580C', alert:'Bearing/grinding noise spike: 28 CRM tickets today' },
        sc: { vol:'312',  trend:'▲ +22%', tc:'#EA580C', alert:'48 SC tickets — Part 4681A20173B replacement' },
        app:{ vol:'87',   trend:'▲ +11%', tc:'#059669', alert:null },
        wa: { vol:'218',  trend:'▲ +35%', tc:'#EA580C', alert:'Batch B240315 cluster signal — NCR, UP, Punjab' },
        soc:{ vol:'134',  trend:'▲ +8%',  tc:'#D97706', alert:null },
        ec: { vol:'621',  trend:'▲ +14%', tc:'#D97706', alert:'"Grinding noise" reviews × 21 — Amazon today' },
        doa:'45', batches:'94%' },
      WM9KG: { total:'412', dedup:'352', dedupRate:'14.6%',
        crm:{ vol:'89',  trend:'▲ +41%', tc:'#DC2626', alert:'P0 smoke/fire complaint — escalated to safety track' },
        sc: { vol:'43',  trend:'▲ +28%', tc:'#DC2626', alert:'PCB thermal runaway confirmed — 3 units (B240228)' },
        app:{ vol:'21',  trend:'▲ +15%', tc:'#D97706', alert:null },
        wa: { vol:'12',  trend:'▲ +60%', tc:'#DC2626', alert:null },
        soc:{ vol:'203', trend:'▲ +89%', tc:'#DC2626', alert:'⚡ Safety: "LG washing machine smoke" — 3 posts in 8 min → P0 alert triggered' },
        ec: { vol:'44',  trend:'▲ +22%', tc:'#D97706', alert:'"Burning smell" WM reviews flagged today' },
        doa:'8', batches:'100%' },
      REF380:{ total:'1,820', dedup:'1,533', dedupRate:'15.8%',
        crm:{ vol:'498', trend:'▲ +9%',  tc:'#D97706', alert:'Overheating cluster — TN, Kerala, AP (23 tickets)' },
        sc: { vol:'134', trend:'▲ +14%', tc:'#D97706', alert:'Condenser coil replacement: 23 units (B240102)' },
        app:{ vol:'66',  trend:'▲ +4%',  tc:'#059669', alert:null },
        wa: { vol:'88',  trend:'▲ +11%', tc:'#059669', alert:null },
        soc:{ vol:'212', trend:'▲ +6%',  tc:'#059669', alert:null },
        ec: { vol:'786', trend:'▲ +7%',  tc:'#059669', alert:'"Not cooling" Ref reviews × 18 (South India)' },
        doa:'36', batches:'92%' },
      AC1T:  { total:'1,140', dedup:'956', dedupRate:'16.1%',
        crm:{ vol:'312', trend:'▲ +7%',  tc:'#D97706', alert:'Coastal corrosion cluster — Ratnagiri, Alibag' },
        sc: { vol:'88',  trend:'▲ +19%', tc:'#D97706', alert:'Coil replacement: 18 units (coastal MH, B240408)' },
        app:{ vol:'41',  trend:'▲ +3%',  tc:'#059669', alert:null },
        wa: { vol:'56',  trend:'▲ +8%',  tc:'#059669', alert:null },
        soc:{ vol:'97',  trend:'▲ +4%',  tc:'#059669', alert:null },
        ec: { vol:'501', trend:'▲ +3%',  tc:'#059669', alert:null },
        doa:'21', batches:'91%' },
      DW14S: { total:'380', dedup:'318', dedupRate:'16.3%',
        crm:{ vol:'98',  trend:'▲ +5%',  tc:'#059669', alert:'Pump cavitation — Bengaluru + Hyderabad cluster' },
        sc: { vol:'44',  trend:'▲ +12%', tc:'#059669', alert:'Pump noise confirmed: 8 units (B240315)' },
        app:{ vol:'18',  trend:'▲ +2%',  tc:'#059669', alert:null },
        wa: { vol:'14',  trend:'▲ +4%',  tc:'#059669', alert:null },
        soc:{ vol:'26',  trend:'▲ +1%',  tc:'#059669', alert:null },
        ec: { vol:'178', trend:'▲ +3%',  tc:'#059669', alert:'"Loud pump noise" DW reviews × 5 (Bengaluru)' },
        doa:'12', batches:'97%' },
    };
    const ing = ingMap[selectedProduct] || ingMap.ALL;
    const ingSocAlert = !!ing.soc.alert;
    const ingCrmAlert = !!ing.crm.alert;
    const ingScAlert  = !!ing.sc.alert;
    const ingWaAlert  = !!ing.wa.alert;
    const ingEcAlert  = !!ing.ec.alert;

    // ── Workflow tab logic ───────────────────────────────────────────
    const workflowTab = this.state.workflowTab || 'pipeline';
    const wfTabPipeline  = () => this.setState({ workflowTab: 'pipeline' });
    const wfTabClassify  = () => this.setState({ workflowTab: 'classify' });
    const wfTabAiOps     = () => this.setState({ workflowTab: 'aiops' });
    const wfBgP  = workflowTab === 'pipeline' ? '#1A1916' : 'white';
    const wfColP = workflowTab === 'pipeline' ? 'white'   : '#6B6660';
    const wfBgC  = workflowTab === 'classify' ? '#1A1916' : 'white';
    const wfColC = workflowTab === 'classify' ? 'white'   : '#6B6660';
    const wfBgA  = workflowTab === 'aiops'    ? '#1A1916' : 'white';
    const wfColA = workflowTab === 'aiops'    ? 'white'   : '#6B6660';
    const wfShowP = workflowTab === 'pipeline' ? 'block' : 'none';
    const wfShowC = workflowTab === 'classify' ? 'block' : 'none';
    const wfShowA = workflowTab === 'aiops'    ? 'block' : 'none';

    // Hide S3 and S8 (merged into S2 Workflow)
    sv.s3 = 'none';
    sv.s8 = 'none';

    // ── India map per-state lookup ───────────────────────────────────
    const geoByState = {};
    (geoWords || []).forEach(g => { geoByState[g.state] = g; });
    const gs = (name) => geoByState[name] || { word:'No activity', fill:'#D4D0CA', bg:'rgba(212,208,202,0.15)', count:0 };
    const gmDL  = gs('Delhi NCR');
    const gmUP  = gs('Uttar Pradesh');
    const gmPB  = gs('Punjab');
    const gmHP  = gs('Himachal Pradesh');
    const gmHR  = gs('Haryana');
    const gmRJ  = gs('Rajasthan');
    const gmMP  = gs('Madhya Pradesh');
    const gmGJ  = gs('Gujarat');
    const gmMH  = gs('Maharashtra');
    const gmKA  = gs('Karnataka');
    const gmTN  = gs('Tamil Nadu');
    const gmKL  = gs('Kerala');
    const gmAP  = gs('Andhra Pradesh');
    const gmTG  = gs('Telangana');
    const gmOD  = gs('Odisha');
    const gmWB  = gs('West Bengal');
    const gmBI  = gs('Bihar');
    const gmCG  = gs('Chhattisgarh');
    const gmRN  = gs('Ratnagiri');
    const gmHY  = gs('Hyderabad');
    const gmBLR = gs('Bengaluru');
    const gmMUM = gs('Mumbai');

    
    const rcDistMap = {
      ALL:   [{l:'Manufacturing Batch', w:'35%', c:'#2952CC'},{l:'Design Flaw', w:'28%', c:'#7C3AED'},{l:'Component Supplier', w:'22%', c:'#0D9488'},{l:'Firmware Regression', w:'8%', c:'#EA580C'},{l:'Installation Quality', w:'5%', c:'#D97706'},{l:'Other / Logistics', w:'2%', c:'#9B9690'}],
      AC5T:  [{l:'Manufacturing Batch', w:'55%', c:'#2952CC'},{l:'Component Supplier', w:'25%', c:'#0D9488'},{l:'Installation Quality', w:'15%', c:'#D97706'},{l:'Other / Logistics', w:'5%', c:'#9B9690'}],
      WM9KG: [{l:'Component Supplier', w:'60%', c:'#DC2626'},{l:'Manufacturing Batch', w:'25%', c:'#2952CC'},{l:'Design Flaw', w:'15%', c:'#7C3AED'}],
      REF380:[{l:'Design Flaw', w:'70%', c:'#7C3AED'},{l:'Component Supplier', w:'20%', c:'#0D9488'},{l:'Manufacturing Batch', w:'10%', c:'#2952CC'}],
      AC1T:  [{l:'Component Supplier', w:'65%', c:'#0D9488'},{l:'Design Flaw', w:'25%', c:'#7C3AED'},{l:'Installation Quality', w:'10%', c:'#D97706'}],
      DW14S: [{l:'Design Flaw', w:'50%', c:'#7C3AED'},{l:'Manufacturing Batch', w:'30%', c:'#2952CC'},{l:'Installation Quality', w:'20%', c:'#D97706'}],
    };
    const rcDist = rcDistMap[selectedProduct] || rcDistMap.ALL;

    const s6Map = {
      ALL: {
        gnnDesc: 'Batch B240315 appears in <strong>2 of 5 current alerts</strong> (LG AC-5T + LG DW-14S). Common component: capacitor-grade bearing from Supplier CSU-04. GNN community detection identified this cross-product link.',
        gnnAlert: 'GNN Alert: Shared batch code B240315 across 2 product lines → Supplier audit recommended',
        kpi: { lat:'6.2 days', prec:'91.4%', acc:'83.6%', fcr:'3.8%', recalls:'2 events · ₹42 Cr saved' }
      },
      AC5T: {
        gnnDesc: 'Batch B240315 identified across multiple complaints. Bearing spec CSU-04 strongly correlates with early failures.',
        gnnAlert: 'GNN Alert: Manufacturing batch anomaly detected. Action required on CSU-04 bearing sub-assembly.',
        kpi: { lat:'4.5 days', prec:'94.1%', acc:'88.2%', fcr:'2.1%', recalls:'1 event · ₹20 Cr saved' }
      },
      WM9KG: {
        gnnDesc: 'Safety hazard identified for B240228. Highly localized to PCB supplied by CSU-07.',
        gnnAlert: 'URGENT: Component Supplier defect detected. Stop-sale recommended for B240228.',
        kpi: { lat:'0.1 days', prec:'98.0%', acc:'95.5%', fcr:'1.1%', recalls:'1 safety recall initiated' }
      },
      REF380: {
        gnnDesc: 'Multiple batches showing identical thermal runaway behavior in high-ambient regions.',
        gnnAlert: 'GNN Alert: Systemic design flaw in condenser coil geometry under >40°C load.',
        kpi: { lat:'8.1 days', prec:'85.4%', acc:'78.6%', fcr:'4.8%', recalls:'0 events · R&D pending' }
      },
      AC1T: {
        gnnDesc: 'Corrosion patterns correlate with coastal region deployment (RH >85%).',
        gnnAlert: 'GNN Alert: Component Supplier coating specification failure. Audit CSU-11.',
        kpi: { lat:'9.4 days', prec:'88.2%', acc:'82.1%', fcr:'3.2%', recalls:'0 events' }
      },
      DW14S: {
        gnnDesc: 'Pump cavitation reported strictly in known low-pressure water zones.',
        gnnAlert: 'GNN Alert: Design limitation under sub-nominal inlet pressure. Update SOP.',
        kpi: { lat:'11.2 days', prec:'81.0%', acc:'74.0%', fcr:'6.5%', recalls:'0 events' }
      }
    };
    const s6Data = s6Map[selectedProduct] || s6Map.ALL;

    const svgALL = selectedProduct === 'ALL' ? 'block' : 'none';
    const svgAC5T = selectedProduct === 'AC5T' ? 'block' : 'none';
    const svgWM9KG = selectedProduct === 'WM9KG' ? 'block' : 'none';
    const svgREF380 = selectedProduct === 'REF380' ? 'block' : 'none';
    const svgAC1T = selectedProduct === 'AC1T' ? 'block' : 'none';
    const svgDW14S = selectedProduct === 'DW14S' ? 'block' : 'none';


    return {
      ...sv,
      ...filterResult,
      productChips, selectedProductLabel, productFilterActive, clearFilter,
      a0disp, a1disp, a2disp, a3disp, a4disp,
      defectKeywords,
      pd, showP0Badge, showP1Badge, showP2Badge, showP3Badge,
      p0Label, p1Label, p2Label, p3Label,
      c0disp, c1disp, c2disp, c3disp, c4disp,
      inv, mfr, rca, ev, evC4show, act, geo, geoWords: enhancedGeoWords, s6Data, rcDist, svgALL, svgAC5T, svgWM9KG, svgREF380, svgAC1T, svgDW14S,
      ing, ingSocAlert, ingCrmAlert, ingScAlert, ingWaAlert, ingEcAlert,
      wfTabPipeline, wfTabClassify, wfTabAiOps,
      wfBgP, wfColP, wfBgC, wfColC, wfBgA, wfColA,
      wfShowP, wfShowC, wfShowA, workflowTab,
      gmDL, gmUP, gmPB, gmHP, gmHR, gmRJ, gmMP, gmGJ, gmMH,
      gmKA, gmTN, gmKL, gmAP, gmTG, gmOD, gmWB, gmBI, gmCG,
      gmRN, gmHY, gmBLR, gmMUM,
      // SKU matrix row opacity (Screen 0)
      skuOp0: p==='ALL'||p==='AC5T'  ?'1':'0.28',
      skuOp1: p==='ALL'||p==='WM9KG' ?'1':'0.28',
      skuOp2: p==='ALL'||p==='REF380'?'1':'0.28',
      skuOp3: p==='ALL'||p==='AC1T'  ?'1':'0.28',
      skuOp4: p==='ALL'||p==='DW14S' ?'1':'0.28',
      navItems,
      screenTitle: titles[screen].t,
      screenSub: titles[screen].s,
      screenIdx: `${screen + 1} / 10`,
      nextScreen: () => this.go(screen + 1),
      prevScreen: () => this.go(screen - 1),
      demoMode,
      demoBar: `${demoProgress}%`,
      demoSec: Math.ceil((100 - demoProgress) / 20),
      demoBtnLabel: demoMode ? '⏸  Stop Demo' : '▶  Auto Demo',
      demoBtnBg: demoMode ? '#EA580C' : '#2952CC',
      toggleDemo: () => this.toggleDemo(),
      go0: () => this.go(0), go1: () => this.go(1), go2: () => this.go(2),
      go3: () => this.go(3), go4: () => this.go(4), go5: () => this.go(5),
      go6: () => this.go(6), go7: () => this.go(7), go8: () => this.go(8),
      go9: () => this.go(9),
      guardrailLabel: guardrails ? 'Guardrails Active' : 'Guardrails Off',
      grBg: guardrails ? '#059669' : '#9B9690',
      grLeft: guardrails ? '19px' : '2px',
      toggleGuardrails: () => this.setState({ guardrails: !guardrails }),
      dispatchSent,
      dispatchNotSent: !dispatchSent,
      sendDispatch: () => this.setState({ dispatchSent: true }),
      resetDispatch: () => this.setState({ dispatchSent: false }),
    };
  }
}

