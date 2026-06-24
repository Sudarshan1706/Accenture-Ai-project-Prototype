const fs = require('fs');

const templateData = JSON.parse(fs.readFileSync('uploads/extracted_template.json', 'utf-8'));
let html = templateData.pages['Defect Intelligence Platform.dc'];

// 1. S0: Root Cause Distribution
const s0RootCauseReplacement = `
            <div style="display:flex;flex-direction:column;gap:9px;">
              <sc-for list="{{ rcDist }}" as="rcd" hint-placeholder-count="6">
                <div><div style="display:flex;justify-content:space-between;margin-bottom:3px;font-size:11.5px;"><span>{{ rcd.l }}</span><span style="font-weight:700;color:{{ rcd.c }};">{{ rcd.w }}</span></div><div style="height:5px;background:#F0EDE8;border-radius:3px;"><div style="height:100%;width:{{ rcd.w }};background:{{ rcd.c }};border-radius:3px;"></div></div></div>
              </sc-for>
            </div>
`;
html = html.replace(/<div style="display:flex;flex-direction:column;gap:9px;">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<!-- SKU Health Matrix -->/, s0RootCauseReplacement + '          </div>\n        </div>\n\n        <!-- SKU Health Matrix -->');


// 2. S6: Root Cause Insights reactivity
// Use display blocks instead of inner-h-t-m-l since the framework apparently doesn't render HTML string bindings.
// IMPORTANT: Use s6Data instead of s6 to prevent overriding the screen visibility flag sv.s6
const s6Replacement = `
      <!-- ══ S6: ROOT CAUSE INSIGHTS ══ -->
      <div style="display:{{ s6 }};padding:24px;animation:fadeSlide .3s ease;">
        <div style="display:grid;grid-template-columns:3fr 2fr;gap:14px;margin-bottom:14px;">
          <div style="background:#fff;border:1px solid #E8E5E0;border-radius:12px;padding:18px;">
            <div style="font-size:13.5px;font-weight:600;margin-bottom:2px;">Root Cause Trend — 6 Months · {{ selectedProductLabel }}</div>
            <div style="font-size:11px;color:#9B9690;margin-bottom:14px;">Confirmed alert attributions by category · Stacked</div>
            <!-- Dynamic SVG display -->
            <div style="display:{{ svgALL }};"><svg viewBox="0 0 420 170" style="width:100%;height:170px;"><rect x="20" y="100" width="42" height="50" fill="#2952CC" opacity=".85" rx="2"></rect><rect x="20" y="70" width="42" height="30" fill="#7C3AED" opacity=".85" rx="2"></rect><rect x="20" y="52" width="42" height="18" fill="#0D9488" opacity=".85" rx="2"></rect><rect x="20" y="44" width="42" height="8" fill="#EA580C" opacity=".85" rx="2"></rect><rect x="78" y="93" width="42" height="57" fill="#2952CC" opacity=".85" rx="2"></rect><rect x="78" y="61" width="42" height="32" fill="#7C3AED" opacity=".85" rx="2"></rect><rect x="78" y="42" width="42" height="19" fill="#0D9488" opacity=".85" rx="2"></rect><rect x="78" y="34" width="42" height="8" fill="#EA580C" opacity=".85" rx="2"></rect><rect x="136" y="86" width="42" height="64" fill="#2952CC" opacity=".85" rx="2"></rect><rect x="136" y="58" width="42" height="28" fill="#7C3AED" opacity=".85" rx="2"></rect><rect x="136" y="40" width="42" height="18" fill="#0D9488" opacity=".85" rx="2"></rect><rect x="136" y="32" width="42" height="8" fill="#EA580C" opacity=".85" rx="2"></rect><rect x="194" y="88" width="42" height="62" fill="#2952CC" opacity=".85" rx="2"></rect><rect x="194" y="62" width="42" height="26" fill="#7C3AED" opacity=".85" rx="2"></rect><rect x="194" y="45" width="42" height="17" fill="#0D9488" opacity=".85" rx="2"></rect><rect x="194" y="37" width="42" height="8" fill="#EA580C" opacity=".85" rx="2"></rect><rect x="252" y="80" width="42" height="70" fill="#2952CC" opacity=".85" rx="2"></rect><rect x="252" y="54" width="42" height="26" fill="#7C3AED" opacity=".85" rx="2"></rect><rect x="252" y="36" width="42" height="18" fill="#0D9488" opacity=".85" rx="2"></rect><rect x="252" y="28" width="42" height="8" fill="#EA580C" opacity=".85" rx="2"></rect><rect x="310" y="85" width="42" height="65" fill="#2952CC" opacity=".85" rx="2"></rect><rect x="310" y="58" width="42" height="27" fill="#7C3AED" opacity=".85" rx="2"></rect><rect x="310" y="40" width="42" height="18" fill="#0D9488" opacity=".85" rx="2"></rect><rect x="310" y="33" width="42" height="7" fill="#EA580C" opacity=".85" rx="2"></rect><text x="41" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">Jan</text><text x="99" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">Feb</text><text x="157" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">Mar</text><text x="215" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">Apr</text><text x="273" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">May</text><text x="331" y="162" fill="#1A1916" font-size="9" text-anchor="middle" font-family="DM Sans" font-weight="600">Jun</text><rect x="10" y="168" width="8" height="8" fill="#2952CC" rx="1"></rect><text x="22" y="176" fill="#6B6660" font-size="8" font-family="DM Sans">Mfg Batch</text><rect x="80" y="168" width="8" height="8" fill="#7C3AED" rx="1"></rect><text x="92" y="176" fill="#6B6660" font-size="8" font-family="DM Sans">Design Flaw</text><rect x="155" y="168" width="8" height="8" fill="#0D9488" rx="1"></rect><text x="167" y="176" fill="#6B6660" font-size="8" font-family="DM Sans">Component</text><rect x="230" y="168" width="8" height="8" fill="#EA580C" rx="1"></rect><text x="242" y="176" fill="#6B6660" font-size="8" font-family="DM Sans">Firmware</text></svg></div>
            <div style="display:{{ svgAC5T }};"><svg viewBox="0 0 420 170" style="width:100%;height:170px;"><rect x="20" y="80" width="42" height="70" fill="#2952CC" opacity=".85" rx="2"></rect><rect x="20" y="60" width="42" height="20" fill="#0D9488" opacity=".85" rx="2"></rect><rect x="78" y="75" width="42" height="75" fill="#2952CC" opacity=".85" rx="2"></rect><rect x="78" y="55" width="42" height="20" fill="#0D9488" opacity=".85" rx="2"></rect><rect x="136" y="60" width="42" height="90" fill="#2952CC" opacity=".85" rx="2"></rect><rect x="136" y="40" width="42" height="20" fill="#0D9488" opacity=".85" rx="2"></rect><rect x="194" y="50" width="42" height="100" fill="#2952CC" opacity=".85" rx="2"></rect><rect x="194" y="30" width="42" height="20" fill="#0D9488" opacity=".85" rx="2"></rect><rect x="252" y="40" width="42" height="110" fill="#2952CC" opacity=".85" rx="2"></rect><rect x="252" y="20" width="42" height="20" fill="#0D9488" opacity=".85" rx="2"></rect><rect x="310" y="30" width="42" height="120" fill="#2952CC" opacity=".85" rx="2"></rect><rect x="310" y="10" width="42" height="20" fill="#0D9488" opacity=".85" rx="2"></rect><text x="41" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">Jan</text><text x="99" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">Feb</text><text x="157" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">Mar</text><text x="215" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">Apr</text><text x="273" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">May</text><text x="331" y="162" fill="#1A1916" font-size="9" text-anchor="middle" font-family="DM Sans" font-weight="600">Jun</text></svg></div>
            <div style="display:{{ svgWM9KG }};"><svg viewBox="0 0 420 170" style="width:100%;height:170px;"><rect x="20" y="80" width="42" height="70" fill="#DC2626" opacity=".85" rx="2"></rect><rect x="78" y="75" width="42" height="75" fill="#DC2626" opacity=".85" rx="2"></rect><rect x="136" y="60" width="42" height="90" fill="#DC2626" opacity=".85" rx="2"></rect><rect x="194" y="50" width="42" height="100" fill="#DC2626" opacity=".85" rx="2"></rect><rect x="252" y="40" width="42" height="110" fill="#DC2626" opacity=".85" rx="2"></rect><rect x="310" y="30" width="42" height="120" fill="#DC2626" opacity=".85" rx="2"></rect><text x="41" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">Jan</text><text x="99" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">Feb</text><text x="157" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">Mar</text><text x="215" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">Apr</text><text x="273" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">May</text><text x="331" y="162" fill="#1A1916" font-size="9" text-anchor="middle" font-family="DM Sans" font-weight="600">Jun</text></svg></div>
            <div style="display:{{ svgREF380 }};"><svg viewBox="0 0 420 170" style="width:100%;height:170px;"><rect x="20" y="60" width="42" height="90" fill="#7C3AED" opacity=".85" rx="2"></rect><rect x="78" y="55" width="42" height="95" fill="#7C3AED" opacity=".85" rx="2"></rect><rect x="136" y="50" width="42" height="100" fill="#7C3AED" opacity=".85" rx="2"></rect><rect x="194" y="45" width="42" height="105" fill="#7C3AED" opacity=".85" rx="2"></rect><rect x="252" y="40" width="42" height="110" fill="#7C3AED" opacity=".85" rx="2"></rect><rect x="310" y="35" width="42" height="115" fill="#7C3AED" opacity=".85" rx="2"></rect><text x="41" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">Jan</text><text x="99" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">Feb</text><text x="157" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">Mar</text><text x="215" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">Apr</text><text x="273" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">May</text><text x="331" y="162" fill="#1A1916" font-size="9" text-anchor="middle" font-family="DM Sans" font-weight="600">Jun</text></svg></div>
            <div style="display:{{ svgAC1T }};"><svg viewBox="0 0 420 170" style="width:100%;height:170px;"><rect x="20" y="70" width="42" height="80" fill="#0D9488" opacity=".85" rx="2"></rect><rect x="78" y="65" width="42" height="85" fill="#0D9488" opacity=".85" rx="2"></rect><rect x="136" y="60" width="42" height="90" fill="#0D9488" opacity=".85" rx="2"></rect><rect x="194" y="55" width="42" height="95" fill="#0D9488" opacity=".85" rx="2"></rect><rect x="252" y="50" width="42" height="100" fill="#0D9488" opacity=".85" rx="2"></rect><rect x="310" y="45" width="42" height="105" fill="#0D9488" opacity=".85" rx="2"></rect><text x="41" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">Jan</text><text x="99" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">Feb</text><text x="157" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">Mar</text><text x="215" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">Apr</text><text x="273" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">May</text><text x="331" y="162" fill="#1A1916" font-size="9" text-anchor="middle" font-family="DM Sans" font-weight="600">Jun</text></svg></div>
            <div style="display:{{ svgDW14S }};"><svg viewBox="0 0 420 170" style="width:100%;height:170px;"><rect x="20" y="50" width="42" height="100" fill="#7C3AED" opacity=".85" rx="2"></rect><rect x="78" y="50" width="42" height="100" fill="#7C3AED" opacity=".85" rx="2"></rect><rect x="136" y="50" width="42" height="100" fill="#7C3AED" opacity=".85" rx="2"></rect><rect x="194" y="50" width="42" height="100" fill="#7C3AED" opacity=".85" rx="2"></rect><rect x="252" y="50" width="42" height="100" fill="#7C3AED" opacity=".85" rx="2"></rect><rect x="310" y="50" width="42" height="100" fill="#7C3AED" opacity=".85" rx="2"></rect><text x="41" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">Jan</text><text x="99" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">Feb</text><text x="157" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">Mar</text><text x="215" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">Apr</text><text x="273" y="162" fill="#9B9690" font-size="9" text-anchor="middle" font-family="DM Sans">May</text><text x="331" y="162" fill="#1A1916" font-size="9" text-anchor="middle" font-family="DM Sans" font-weight="600">Jun</text></svg></div>
          </div>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="background:#fff;border:1px solid #E8E5E0;border-radius:12px;padding:16px;">
              <div style="font-size:13px;font-weight:600;margin-bottom:6px;">GNN Cross-Product Insight</div>
              <div style="font-size:11.5px;color:#6B6660;line-height:1.55;margin-bottom:8px;">{{ s6Data.gnnDesc }}</div>
              <div style="background:#FFF7ED;border-radius:6px;padding:8px 10px;font-size:11px;color:#EA580C;font-weight:600;line-height:1.4;">⚠ {{ s6Data.gnnAlert }}</div>
            </div>
            <div style="background:#fff;border:1px solid #E8E5E0;border-radius:12px;padding:16px;">
              <div style="font-size:13px;font-weight:600;margin-bottom:10px;">Platform KPIs — {{ selectedProductLabel }} · Jun 2026</div>
              <div style="display:flex;flex-direction:column;gap:7px;font-size:12px;">
                <div style="display:flex;justify-content:space-between;align-items:center;"><span style="color:#6B6660;">Avg detection latency (30d)</span><span style="font-weight:700;color:#059669;">{{ s6Data.kpi.lat }}</span></div>
                <div style="display:flex;justify-content:space-between;align-items:center;"><span style="color:#6B6660;">Alert precision (P2+)</span><span style="font-weight:700;color:#059669;">{{ s6Data.kpi.prec }}</span></div>
                <div style="display:flex;justify-content:space-between;align-items:center;"><span style="color:#6B6660;">Root cause top-1 accuracy</span><span style="font-weight:700;color:#059669;">{{ s6Data.kpi.acc }}</span></div>
                <div style="display:flex;justify-content:space-between;align-items:center;"><span style="color:#6B6660;">False cluster rate</span><span style="font-weight:700;color:#059669;">{{ s6Data.kpi.fcr }}</span></div>
                <div style="display:flex;justify-content:space-between;align-items:center;"><span style="color:#6B6660;">Est. recalls averted (6mo)</span><span style="font-weight:700;color:#2952CC;">{{ s6Data.kpi.recalls }}</span></div>
              </div>
            </div>
          </div>
        </div>
        <!-- Velocity by product -->
        <div style="background:#fff;border:1px solid #E8E5E0;border-radius:12px;padding:18px;">
          <div style="font-size:13.5px;font-weight:600;margin-bottom:2px;">Complaint Velocity by Product — Last 30 Days</div>
          <div style="font-size:11px;color:#9B9690;margin-bottom:12px;">CUSUM-normalised complaint rate per 10,000 fielded units</div>
          
          <div style="display:{{ svgALL }};"><svg viewBox="0 0 640 90" style="width:100%;height:90px;"><line x1="0" y1="45" x2="640" y2="45" stroke="#F0EDE8" stroke-width=".5"></line><line x1="0" y1="22" x2="640" y2="22" stroke="#F0EDE8" stroke-width=".5"></line><line x1="0" y1="68" x2="640" y2="68" stroke="#F0EDE8" stroke-width=".5"></line><path d="M 10,72 L 70,68 L 130,62 L 195,55 L 260,47 L 325,38 L 385,30 L 445,22 L 505,14 L 565,8 L 615,5" fill="none" stroke="#EA580C" stroke-width="2.5" stroke-linecap="round"></path><path d="M 10,82 L 70,80 L 130,79 L 195,79 L 260,78 L 325,78 L 385,76 L 445,72 L 505,62 L 565,44 L 615,12" fill="none" stroke="#DC2626" stroke-width="2.5" stroke-linecap="round"></path><path d="M 10,78 L 70,76 L 130,73 L 195,70 L 260,65 L 325,60 L 385,56 L 445,50 L 505,46 L 565,43 L 615,41" fill="none" stroke="#D97706" stroke-width="1.8" stroke-linecap="round"></path><path d="M 10,82 L 70,80 L 130,79 L 195,77 L 260,74 L 325,70 L 385,67 L 445,63 L 505,60 L 565,57 L 615,55" fill="none" stroke="#D97706" stroke-width="1.5" stroke-dasharray="4,3" stroke-linecap="round"></path><path d="M 10,86 L 70,85 L 130,85 L 195,84 L 260,83 L 325,82 L 385,81 L 445,80 L 505,79 L 565,78 L 615,78" fill="none" stroke="#059669" stroke-width="1.5" stroke-linecap="round"></path><text x="620" y="8" fill="#EA580C" font-size="8.5" font-family="DM Sans" font-weight="600">LG AC ▲</text><text x="620" y="15" fill="#DC2626" font-size="8.5" font-family="DM Sans" font-weight="600">LG WM ⚡</text><text x="620" y="44" fill="#D97706" font-size="8" font-family="DM Sans">LG Ref</text><text x="620" y="57" fill="#D97706" font-size="8" font-family="DM Sans">LG AC-1T</text><text x="620" y="80" fill="#059669" font-size="8" font-family="DM Sans">LG DW</text><text x="8" y="88" fill="#9B9690" font-size="8" font-family="DM Sans">May 24</text><text x="600" y="88" fill="#1A1916" font-size="8" font-family="DM Sans" font-weight="600">Jun 23</text></svg></div>
          <div style="display:{{ svgAC5T }};"><svg viewBox="0 0 640 90" style="width:100%;height:90px;"><path d="M 10,72 L 70,68 L 130,62 L 195,55 L 260,47 L 325,38 L 385,30 L 445,22 L 505,14 L 565,8 L 615,5" fill="none" stroke="#EA580C" stroke-width="2.5" stroke-linecap="round"></path></svg></div>
          <div style="display:{{ svgWM9KG }};"><svg viewBox="0 0 640 90" style="width:100%;height:90px;"><path d="M 10,82 L 70,80 L 130,79 L 195,79 L 260,78 L 325,78 L 385,76 L 445,72 L 505,62 L 565,44 L 615,12" fill="none" stroke="#DC2626" stroke-width="2.5" stroke-linecap="round"></path></svg></div>
          <div style="display:{{ svgREF380 }};"><svg viewBox="0 0 640 90" style="width:100%;height:90px;"><path d="M 10,78 L 70,76 L 130,73 L 195,70 L 260,65 L 325,60 L 385,56 L 445,50 L 505,46 L 565,43 L 615,41" fill="none" stroke="#D97706" stroke-width="1.8" stroke-linecap="round"></path></svg></div>
          <div style="display:{{ svgAC1T }};"><svg viewBox="0 0 640 90" style="width:100%;height:90px;"><path d="M 10,82 L 70,80 L 130,79 L 195,77 L 260,74 L 325,70 L 385,67 L 445,63 L 505,60 L 565,57 L 615,55" fill="none" stroke="#D97706" stroke-width="1.5" stroke-dasharray="4,3" stroke-linecap="round"></path></svg></div>
          <div style="display:{{ svgDW14S }};"><svg viewBox="0 0 640 90" style="width:100%;height:90px;"><path d="M 10,86 L 70,85 L 130,85 L 195,84 L 260,83 L 325,82 L 385,81 L 445,80 L 505,79 L 565,78 L 615,78" fill="none" stroke="#059669" stroke-width="1.5" stroke-linecap="round"></path></svg></div>
        </div>
      </div>
`;
// Do not rename s6 variable to s6disp here, let it be just s6 as it is naturally in s6Replacement block
html = html.replace(/<!-- ══ S6: ROOT CAUSE INSIGHTS ══ -->[\s\S]*?<!-- ══ S7: MANUFACTURER ALERT TRIGGER ══ -->/, s6Replacement + '\n      <!-- ══ S7: MANUFACTURER ALERT TRIGGER ══ -->');


// 3. S7: Manufacturer Alert Trigger - Remove guardrail and routing cards
const s7Replacement = `
      <!-- ══ S7: MANUFACTURER ALERT TRIGGER ══ -->
      <div style="display:{{ s7 }};padding:24px;animation:fadeSlide .3s ease;">
        <div style="display:flex;flex-direction:column;gap:16px;max-width:800px;margin:0 auto;">
          <!-- Alert preview + dispatch -->
            <div style="background:{{ mfr.cbg }};border:{{ mfr.cborder }};border-left:4px solid {{ mfr.tbg }};border-radius:12px;padding:18px;">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
                <div style="background:{{ mfr.tbg }};color:white;font-size:10.5px;font-weight:700;padding:3px 10px;border-radius:5px;">{{ mfr.tier }}</div>
                <div style="font-size:10px;color:#9B9690;">Preview</div>
              </div>
              <div style="font-size:14px;font-weight:700;color:#1A1916;margin-bottom:6px;">{{ mfr.title }}</div>
              <div style="font-size:11.5px;color:#6B6660;margin-bottom:10px;line-height:1.6;"><strong>Batch:</strong> {{ mfr.batch }} · <strong>SKU:</strong> {{ mfr.sku }}<br><strong>Scope:</strong> {{ mfr.scope }}<br><strong>Root cause:</strong> {{ mfr.root }}<br><strong>Detected:</strong> {{ mfr.det }} (vs. 90d baseline)<br><strong>Units at detection:</strong> {{ mfr.units }} (vs. 50,000 baseline)</div>
              <div style="background:#FFF7ED;border-radius:6px;padding:9px 11px;font-size:11px;color:#EA580C;margin-bottom:10px;line-height:1.6;"><strong>Required:</strong><br>1. Quarantine Batch B240315<br>2. Audit Supplier CSU-04 (bearing sub-assembly)<br>3. Pre-position part 4681A20173B — NCR centres<br>4. Confirm response within 72 hours</div>
              <div style="font-size:10.5px;color:#9B9690;display:flex;justify-content:space-between;"><span>DIAP · Alert P1-7234</span><span>EWS: 0.81</span></div>
            </div>
            <!-- Dispatch channels -->
            <div style="background:#fff;border:1px solid #E8E5E0;border-radius:12px;padding:16px;">
              <div style="font-size:12.5px;font-weight:600;margin-bottom:10px;">Dispatch Channels</div>
              <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:14px;">
                <div style="display:flex;align-items:center;gap:9px;padding:7px;background:#F5F4F2;border-radius:6px;font-size:11.5px;"><div style="width:7px;height:7px;background:#059669;border-radius:50%;flex:none;"></div><span style="flex:1;">ServiceNow — Incident Ticket</span><span style="color:#059669;font-weight:600;font-size:11px;">Ready</span></div>
                <div style="display:flex;align-items:center;gap:9px;padding:7px;background:#F5F4F2;border-radius:6px;font-size:11.5px;"><div style="width:7px;height:7px;background:#059669;border-radius:50%;flex:none;"></div><span style="flex:1;">Slack — Manufacturing Head channel</span><span style="color:#059669;font-weight:600;font-size:11px;">Ready</span></div>
                <div style="display:flex;align-items:center;gap:9px;padding:7px;background:#F5F4F2;border-radius:6px;font-size:11.5px;"><div style="width:7px;height:7px;background:#059669;border-radius:50%;flex:none;"></div><span style="flex:1;">Email — Production QA + Supplier Quality</span><span style="color:#059669;font-weight:600;font-size:11px;">Ready</span></div>
                <div style="display:flex;align-items:center;gap:9px;padding:7px;background:#F5F4F2;border-radius:6px;font-size:11.5px;"><div style="width:7px;height:7px;background:#059669;border-radius:50%;flex:none;"></div><span style="flex:1;">Jira — Engineering Issue (P1)</span><span style="color:#059669;font-weight:600;font-size:11px;">Ready</span></div>
              </div>
              <sc-if value="{{ dispatchSent }}" hint-placeholder-val="{{ false }}">
                <div style="background:#ECFDF5;border:1px solid #BBF7D0;border-radius:10px;padding:16px;text-align:center;">
                  <div style="font-size:22px;margin-bottom:4px;">✓</div>
                  <div style="font-size:14px;font-weight:700;color:#059669;">Alert Dispatched Successfully</div>
                  <div style="font-size:11.5px;color:#6B6660;margin-top:3px;">Tickets created · Notifications sent · 72h SLA clock started</div>
                  <div onclick="{{ resetDispatch }}" style="margin-top:10px;font-size:11px;color:#9B9690;cursor:pointer;text-decoration:underline;">Reset demo</div>
                </div>
              </sc-if>
              <sc-if value="{{ dispatchNotSent }}" hint-placeholder-val="{{ true }}">
                <div onclick="{{ sendDispatch }}" style="background:#EA580C;color:white;border-radius:10px;padding:13px;text-align:center;cursor:pointer;font-size:13.5px;font-weight:700;" style-hover="background:#DC2626;">Dispatch Alert to Manufacturer →</div>
                <div style="font-size:10.5px;color:#9B9690;text-align:center;margin-top:6px;">Guardrails verified · Human approval confirmed</div>
              </sc-if>
            </div>
            <!-- History -->
            <div style="background:#fff;border:1px solid #E8E5E0;border-radius:12px;padding:14px;">
              <div style="font-size:12px;font-weight:600;margin-bottom:8px;">Recent Dispatch History</div>
              <div style="display:flex;flex-direction:column;gap:5px;font-size:11px;color:#6B6660;">
                <div style="display:flex;justify-content:space-between;"><span>P2-6891: LG Ref-380L condenser</span><span style="color:#059669;font-weight:600;">Confirmed ✓</span></div>
                <div style="display:flex;justify-content:space-between;"><span>P1-6742: LG WAC-1.5T corrosion</span><span style="color:#D97706;font-weight:600;">In progress</span></div>
                <div style="display:flex;justify-content:space-between;"><span>P1-6603: Haier WM PCB failure</span><span style="color:#059669;font-weight:600;">Resolved ✓</span></div>
              </div>
            </div>
        </div>
      </div>
`;
html = html.replace(/<!-- ══ S7: MANUFACTURER ALERT TRIGGER ══ -->[\s\S]*?<!-- ══ S9: GEOGRAPHIC DEFECT INTELLIGENCE ══ -->/, s7Replacement + '\n\n      <!-- ══ S9: GEOGRAPHIC DEFECT INTELLIGENCE ══ -->');


// 4. S9: Geographic word cloud -> Remove map, remove frost blur, make height larger
const indiaMapReplacement = `
            <!-- Stylized India Map Word Cloud -->
            <div style="position:relative;width:100%;height:650px;background:#fff;border:1px solid #E8E5E0;border-radius:12px;overflow:hidden;margin:10px 0;">
              
              <sc-for list="{{ geoWords }}" as="gw" hint-placeholder-count="10">
                <div style="position:absolute;top:{{ gw.top }}%;left:{{ gw.left }}%;transform:translate(-50%, -50%);background:#ffffff;border:2px solid {{ gw.fill }};border-radius:12px;padding:8px 12px;text-align:center;box-shadow:0 3px 10px rgba(0,0,0,0.08);min-width:100px;z-index:2;">
                  <div style="font-size:9.5px;color:#6B6660;font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:3px;">{{ gw.state }}</div>
                  <div style="font-size:{{ gw.size }}px;font-weight:800;color:{{ gw.fill }};line-height:1.1;margin-bottom:3px;">{{ gw.word }}</div>
                  <div style="font-size:10.5px;color:#1A1916;font-weight:600;">{{ gw.count }} Complaints</div>
                </div>
              </sc-for>
            </div>
`;
html = html.replace(/<!-- State word cloud grid -->[\s\S]*?<!-- placeholder closing tag to replace SVG end -->/, indiaMapReplacement);

// 5. Inject RC Dist and S6 variables before return
const jsDataInjection = `
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

    // SVG visibility bindings
    const svgALL = selectedProduct === 'ALL' ? 'block' : 'none';
    const svgAC5T = selectedProduct === 'AC5T' ? 'block' : 'none';
    const svgWM9KG = selectedProduct === 'WM9KG' ? 'block' : 'none';
    const svgREF380 = selectedProduct === 'REF380' ? 'block' : 'none';
    const svgAC1T = selectedProduct === 'AC1T' ? 'block' : 'none';
    const svgDW14S = selectedProduct === 'DW14S' ? 'block' : 'none';

`;

html = html.replace(/return {/, jsDataInjection + '\n    return {');

// And map data inside the return object:
html = html.replace(/geoWords,/g, 'geoWords: enhancedGeoWords, s6Data, rcDist, svgALL, svgAC5T, svgWM9KG, svgREF380, svgAC1T, svgDW14S,');

// 6. Inject enhancedGeoWords AFTER geoWords is defined
const geoWordsEnhancer = `
    const geoPos = {
      'Delhi NCR': { top: 30, left: 40 },
      'Uttar Pradesh': { top: 40, left: 55 },
      'Punjab': { top: 20, left: 35 },
      'Haryana': { top: 25, left: 38 },
      'Rajasthan': { top: 45, left: 25 },
      'Himachal Pradesh': { top: 15, left: 40 },
      'Gujarat': { top: 55, left: 15 },
      'Maharashtra': { top: 65, left: 30 },
      'Mumbai': { top: 65, left: 20 },
      'Ratnagiri': { top: 70, left: 22 },
      'Raigad': { top: 68, left: 25 },
      'Alibag': { top: 66, left: 23 },
      'Sindhudurg': { top: 75, left: 26 },
      'Karnataka': { top: 80, left: 35 },
      'Bengaluru': { top: 85, left: 38 },
      'Tamil Nadu': { top: 90, left: 45 },
      'Kerala': { top: 95, left: 35 },
      'Andhra Pradesh': { top: 75, left: 50 },
      'Telangana': { top: 70, left: 45 },
      'Hyderabad': { top: 72, left: 48 },
      'Madhya Pradesh': { top: 55, left: 45 }
    };
    const enhancedGeoWords = geoWords.map(gw => {
      const pos = geoPos[gw.state] || { top: 50, left: 50 };
      // Make words larger so they are more readable, map 11-22 size to 16-32 size
      const newSize = Math.max(16, gw.size * 1.5);
      return { ...gw, top: pos.top, left: pos.left, size: newSize };
    });
`;
html = html.replace(/const geoWords = geoWordsMap\[selectedProduct\] \|\| geoWordsMap\.ALL;/, 'const geoWords = geoWordsMap[selectedProduct] || geoWordsMap.ALL;\n' + geoWordsEnhancer);

fs.writeFileSync('uploads/page_Defect Intelligence Platform.dc.html', html);
console.log('Successfully wrote fix to uploads/page_Defect Intelligence Platform.dc.html');
