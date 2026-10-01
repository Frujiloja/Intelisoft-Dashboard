import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Bot,
  Check,
  ChevronDown,
  FileText,
  Filter,
  LayoutDashboard,
  Menu,
  MessageSquareText,
  Search,
  Send,
  Sparkles,
  Users,
  X,
} from 'lucide-react';

type Metric = { label: string; value: string; note: string; badge?: string };

const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const billed = [91000, 68000, 58000, 82000, 68000, 52000, 56000, 48000, 69000, 72000, 33000, 42000];
const ars = [112000, 70000, 62000, 108000, 79000, 61000, 70000, 64000, 99000, 114000, 47000, 62000];
const customers = [
  ['E-GRAIN S.A.', '248.440', '16.6%'], ['VITERPRA ARGENTINA S.A.', '82.211', '10.2%'],
  ['LDC ARGENTINA SA', '67.283', '8.3%'], ['COFCO INTERNATIONAL ARGENTINA SA', '45.518', '6.0%'],
  ['AMAGGI ARGENTINA S.A.', '41.888', '5.2%'], ['RURAL CERES SA', '37.671', '4.7%'],
  ['S.E.D.A.P.I.C. S.A.', '24.996', '3.1%'], ['NAKIA SOCIEDAD ANONIMA', '22.493', '2.8%'],
  ['CHS DE ARGENTINA SA', '16.442', '2.0%'], ['VIREYES AGROPECUARIA S.A.', '15.773', '1.9%'],
];

const metrics: Metric[] = [
  { label: 'Comisiones facturadas', value: 'USD 809.673', note: 'ARS 998.024.317 · 3.883 comprobantes emitidos' },
  { label: 'TC promedio ponderado', value: '1.210', note: 'ARS / USD · importe del flujo facturado' },
  { label: 'Clientes activos', value: '121', note: 'Top 5 concentran el 46%' },
  { label: 'Mejor mes', value: 'Enero', note: 'USD 109.732 · 13.5% del año' },
];
const secondaryMetrics: Metric[] = [
  { label: 'Comisiones al 1% estándar', value: 'USD ~713.000', note: '+88% de los comprobantes · mayoría exportadores', badge: '1,00%' },
  { label: 'Comisiones al 0,5% doble vía', value: 'USD ~90.000', note: 'Cuenta y orden · intermediación bilateral', badge: '0,50%' },
  { label: 'Notas de crédito / reversiones', value: '+340', note: 'Reajustes de precio · patrón habitual en liquidaciones finales', badge: 'NC' },
];

function formatAxis(value: number) {
  return value === 0 ? '0' : `${Math.round(value / 1000)}K`;
}

function BarChart({ data, second = false }: { data: number[]; second?: boolean }) {
  const max = second ? 120000 : 120000;
  return (
    <div className="chart-shell">
      <div className="y-axis">{[120000, 100000, 80000, 60000, 40000, 20000, 0].map((n) => <span key={n}>{formatAxis(n)}</span>)}</div>
      <div className="plot bars-plot">
        {[120, 100, 80, 60, 40, 20, 0].map((line) => <div className="grid-line" style={{ bottom: `${(line / 120) * 100}%` }} key={line} />)}
        <div className="bars">{data.map((value, index) => <div className={`bar-wrap ${(!second && index === 0) || (second && index === 9) ? 'highlight' : ''}`} key={months[index]}><div className="bar" style={{ height: `${(value / max) * 100}%` }} /><span>{months[index]}</span></div>)}</div>
      </div>
    </div>
  );
}

function TrendChart() {
  const points = (values: number[]) => values.map((value, index) => `${(index / 11) * 100},${100 - (value / 30000) * 100}`).join(' ');
  const series = [
    { name: 'E-Grain', color: '#c4a15a', values: [26500, 15000, 14200, 18000, 17500, 8000, 7000, 8500, 10500, 5000, 2400, 6000] },
    { name: 'Viterra', color: '#4c8861', values: [12000, 3000, 7500, 12000, 4000, 2500, 6500, 8200, 11500, 14500, 5000, 7500] },
    { name: 'LDC', color: '#2f654a', values: [4500, 2000, 5000, 7000, 3000, 4000, 6000, 2000, 5000, 9500, 2200, 3500] },
    { name: 'COFCO', color: '#836f2b', values: [3000, 5000, 3500, 2500, 7000, 3500, 9000, 4500, 2500, 7200, 4000, 6000] },
  ];
  return <div className="trend-chart"><div className="trend-y">{[30000, 25000, 20000, 15000, 10000, 5000].map((n) => <span key={n}>{n.toLocaleString('en-US')}</span>)}</div><div className="trend-plot">{[0, 20, 40, 60, 80, 100].map((line) => <div className="grid-line" style={{ bottom: `${line}%` }} key={line} />)}{months.map((month, index) => <span className="x-label" style={{ left: `${(index / 11) * 100}%` }} key={month}>{month}</span>)}<svg viewBox="0 0 100 100" preserveAspectRatio="none">{series.map((item) => <polyline key={item.name} points={points(item.values)} fill="none" stroke={item.color} strokeWidth="1.6" vectorEffect="non-scaling-stroke" />)}</svg>{series.map((item) => item.values.map((value, index) => <i className="dot" key={`${item.name}-${index}`} style={{ left: `${(index / 11) * 100}%`, bottom: `${(value / 30000) * 100}%`, background: item.color }} />))}</div></div>;
}

function Card({ title, children, action }: { title: string; children: React.ReactNode; action?: string }) {
  return <section className="panel chart-card"><div className="panel-heading"><h2>{title}</h2>{action && <button className="text-button">{action} <ArrowUpRight size={10} /></button>}</div>{children}</section>;
}

const clientRows = [
  ['E-GRAIN SA', 'USD 134.110', 'ARS 154.9 M', '16.6%'], ['VITERRA ARGENTINA S.A.', 'USD 82.211', 'ARS 100.5 M', '10.2%'], ['L D C ARGENTINA SA', 'USD 67.283', 'ARS 86.7 M', '8.3%'], ['COFCO INTERNATIONAL ARGENTINA SA', 'USD 48.318', 'ARS 61.2 M', '6.0%'], ['AMAGGI ARGENTINA S.A.', 'USD 41.888', 'ARS 50.2 M', '5.2%'], ['RURAL CERES SA', 'USD 37.671', 'ARS 44.7 M', '4.7%'], ['S.E.D.A.P.I.C. S.A.', 'USD 24.996', 'ARS 28.9 M', '3.1%'], ['NAIKA SOCIEDAD ANONIMA', 'USD 22.493', 'ARS 27.5 M', '2.8%'], ['CHS DE ARGENTINA SA', 'USD 16.442', 'ARS 21.2 M', '2.0%'], ['VIREYES AGROPECUARIA S.A.', 'USD 15.773', 'ARS 17.7 M', '1.9%'], ['FRIGORIFICO DE AVES SOYCHU S.A.I.C.F.I.A.', 'USD 14.553', 'ARS 16.8 M', '1.8%'], ['BUNGE ARGENTINA S.A.', 'USD 14.385', 'ARS 17.2 M', '1.8%'], ['ALEA Y CIA. S.A.', 'USD 13.796', 'ARS 16.9 M', '1.7%'], ['ESTANCIA EL JABALI S.A.', 'USD 13.206', 'ARS 16.5 M', '1.6%'], ['MOLINO CANUELAS S.A.C.I.F.I.A.', 'USD 11.570', 'ARS 12.5 M', '1.4%'], ['A 3 MERCADOS SA', 'USD 11.090', 'ARS 12.9 M', '1.4%'], ['ZUBIAURRE S.A.', 'USD 10.343', 'ARS 13.0 M', '1.3%'], ['HU NAVAS Y CIA SA', 'USD 10.662', 'ARS 13.8 M', '1.3%'], ['ESTANCIA EL HERVIDERO S.R.L.', 'USD 8.134', 'ARS 9.6 M', '1.0%'], ['LA RANITA S.A.', 'USD 8.087', 'ARS 10.0 M', '1.0%'], ['DURAÑONA MARIA DEL PILAR', 'USD 7.565', 'ARS 8.8 M', '0.9%'], ['ACOPIO MONTES DE OCA S.R.L.', 'USD 6.609', 'ARS 8.1 M', '0.8%'], ['HANSEN CHRISTIAN FEDERICO', 'USD 5.869', 'ARS 7.5 M', '0.7%'], ['BONAVETTI GERMANA', 'USD 5.436', 'ARS 6.7 M', '0.7%'], ['ADBLICK GRANOS', 'USD 4.951', 'ARS 5.6 M', '0.6%'],
];

const operationRows = [
  ['15/12/2025', 'CETA CEREALES S.A.', '400028827', '150 tn', '278.000', '0.5%', '1.432', '208.500', 'USD 145.60', 'Factura'], ['10/12/2025', 'CETA CEREALES S.A.', '400028769', '212 tn', '285.000', '0.5%', '1.433', '301.416', 'USD 210.34', 'Factura'], ['04/12/2025', 'CETA CEREALES S.A.', '400028740', '100 tn', '285.000', '0.5%', '1.444', '142.500', 'USD 98.68', 'Factura'], ['04/12/2025', 'CETA CEREALES S.A.', '400028739', '274 tn', '285.000', '0.5%', '1.444', '389.851', 'USD 269.98', 'Factura'], ['02/12/2025', 'VITERRA ARGENTINA S.A.', '400028707', '995 tn', '253.000', '1%', '1.442', '2.52M', 'USD 1.745', 'Factura'], ['27/11/2025', 'L D C ARGENTINA SA', '400028090', '639 tn', '520.000', '1%', '1.443', '2.80M', 'USD 1.942', 'Factura'], ['25/11/2025', 'VITERRA ARGENTINA S.A.', '400028629', '560 tn', '256.462', '1%', '1.416', '1.28M', 'USD 906.59', 'Factura'], ['14/11/2025', 'RUMARA S A', '400028543', '90 tn', '1.152.920', '1%', '1.397', '341.840', 'USD 244.70', 'Doble Vía'], ['12/11/2025', 'VITERRA ARGENTINA S.A.', '400000650', '1390 tn', '258.000', '1%', '1.385', '3.29M', 'USD 2.375', 'Factura'], ['12/11/2025', 'RUMARA S A', '400028510', '90 tn', '1.209.500', '1%', '1.385', '358.616', 'USD 258.93', 'Doble Vía'], ['07/11/2025', 'FRIGORIFICO DE AVES SOYCHU', '400028457', '120 tn', '490.000', '1%', '1.445', '588.000', 'USD 406.92', 'Factura'], ['05/11/2025', 'VITERRA ARGENTINA S.A.', '400013707', '10 tn', '441.900', '1%', '1.425', '-42.687', 'USD -29.96', 'N.Crédito'], ['04/11/2025', 'VITERRA ARGENTINA S.A.', '400028380', '187 tn', '490.800', '1%', '1.473', '805.165', 'USD 546.62', 'Factura'], ['23/10/2025', 'L D C ARGENTINA SA', '600000649', '1000 tn', '422.227', '1%', '1.481', '4.22M', 'USD 2.849', 'Factura'], ['23/10/2025', 'COFCO INTERNATIONAL SA', '400028231', '382 tn', '458.800', '1%', '1.480', '1.52M', 'USD 1.096', 'Factura'], ['20/10/2025', 'COFCO INTERNATIONAL SA', '400028147', '265 tn', '497.145', '1%', '1.441', '1.26M', 'USD 872.85', 'Factura'], ['22/10/2025', 'L D C ARGENTINA SA', '400028196', '1000 tn', '195.000', '1%', '1.481', '1.95M', 'USD 1.316', 'Factura'], ['08/10/2025', 'VITERRA ARGENTINA S.A.', '400002781', '267 tn', '440.355', '1%', '1.420', '1.18M', 'USD 827.30', 'Factura'], ['07/10/2025', 'L D C ARGENTINA SA', '400002795', '439 tn', '518.665', '1%', '1.405', '2.28M', 'USD 1.620', 'Factura'], ['01/10/2025', 'VITERRA ARGENTINA S.A.', '400002785', '660 tn', '405.300', '1%', '1.371', '2.03M', 'USD 1.478', 'Factura'],
];

function ClientsView() {
  const [search, setSearch] = useState('');
  const filtered = clientRows.filter(([name]) => name.toLowerCase().includes(search.toLowerCase()));
  return <div className="section-page"><div className="section-tools"><div className="search-field"><Search size={12} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar cliente..." /></div><button className="filter-button"><Filter size={11} /> Filtros</button></div><div className="data-panel client-panel"><div className="data-header client-cols"><span>#</span><span>Cliente</span><span>Comisión USD</span><span>Comisión ARS</span><span>% del total</span><span>Posición</span></div>{filtered.map(([name, usd, arsValue, percent], index) => <div className="data-row client-cols" key={name}><span className="rank">{String(index + 1).padStart(2, '0')}</span><strong>{name}</strong><span className="green-value">{usd}</span><span className="muted-value">{arsValue}</span><b>{percent}</b><span className="progress-track"><i style={{ width: `${Math.max(8, Number(percent.replace('%', '')) * 4)}%` }} /></span></div>)}<small className="row-count">{filtered.length} clientes</small></div></div>;
}

function OperationsView() {
  const [search, setSearch] = useState('');
  const filtered = operationRows.filter((row) => row.slice(0, 3).join(' ').toLowerCase().includes(search.toLowerCase()));
  return <div className="section-page"><div className="section-tools operation-tools"><div className="search-field"><Search size={12} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por cliente o comprobante..." /></div>{['Todos los meses', 'Todos los tipos', 'Todas las tasas'].map((item) => <button className="select-filter" key={item}>{item}<ChevronDown size={11} /></button>)}</div><div className="data-panel operation-panel"><div className="data-header operation-cols"><span>Fecha</span><span>Cliente</span><span>Comprobante</span><span>Kg</span><span>Precio ARS/TN</span><span>%</span><span>TC</span><span>ARS</span><span>USD</span><span>Tipo</span></div>{filtered.map((row, index) => <div className={`data-row operation-cols ${row[9] === 'N.Crédito' ? 'credit-row' : ''}`} key={`${row[2]}-${index}`}>{row.map((value, cellIndex) => <span className={cellIndex === 8 ? 'green-value' : cellIndex === 9 ? `type-pill ${value === 'Factura' ? 'invoice' : value === 'N.Crédito' ? 'credit' : 'double'}` : cellIndex === 3 ? 'quantity' : ''} key={`${value}-${cellIndex}`}>{value}</span>)}</div>)}</div></div>;
}

function AssistantView() {
  const [query, setQuery] = useState('');
  const [sent, setSent] = useState(false);
  const questions = ['¿Cuánto comisioné con E-Grain?', '¿Cuál fue el mejor mes del año?', '¿Qué tan concentrada está la cartera de clientes?', '¿Cuánto fue en ARS total y qué tipo de cambio implica?'];
  const frequent = ['¿Cuánto comisioné con E-Grain?', 'Top 3 clientes del año', '¿Cuál fue el mejor mes?', '¿Cuánto fue en pesos el total?', 'Concentración de cartera', '¿Cómo evolucionó el tipo de cambio?', '¿Cuánto operé en el segundo semestre?', '¿Cómo evolucionó LDC en el año?'];
  return <div className="assistant-page"><div className="assistant-main"><div className="assistant-welcome"><Sparkles size={16} /><p>Preguntá sobre las operaciones de AJI Nari S.A.<br /><span>Los datos son reales — año 2025 completo.</span></p></div><div className="question-list">{questions.map((question) => <button key={question} onClick={() => { setQuery(question); setSent(false); }}>{question}</button>)}</div>{sent && <div className="assistant-result"><Check size={13} /><span>Analizando tu consulta: “{query}”</span></div>}<div className="assistant-compose"><input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && query) setSent(true); }} placeholder="Preguntá sobre tus operaciones..." /><button onClick={() => query && setSent(true)}>Enviar <Send size={11} /></button></div></div><aside className="assistant-side"><section className="context-panel"><span className="eyebrow">CONSULTAS FRECUENTES</span>{frequent.map((question) => <button key={question} onClick={() => setQuery(question)}>{question}</button>)}</section><section className="context-panel context-summary"><span className="eyebrow">CONTEXTO — 2025</span><label>COMISIONES USD<strong>USD 809.673</strong><small>3.883 comprobantes</small></label><label>COMISIONES ARS<strong>ARS 980 M</strong><small>TC implícito: 1.210 ARS/USD</small></label><label>CLIENTE PRINCIPAL<strong>E-Grain SA</strong><small>USD 134.110 — 16,6%</small></label><label>PICO DEL AÑO<strong>Enero 2025</strong><small>USD 109.732</small></label></section></aside></div>;
}

function App() {
  const [active, setActive] = useState('Dashboard');
  const [year, setYear] = useState('Año 2025');
  const [yearOpen, setYearOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [query, setQuery] = useState('');
  const currentNav = useMemo(() => active, [active]);

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><strong>intelisoft</strong><span>CUENTA Y ORDEN</span></div>
      <nav>{[['Dashboard', LayoutDashboard], ['Clientes', Users], ['Operaciones', FileText], ['Asistente IA', Bot]].map(([label, Icon]) => <button key={label as string} className={currentNav === label ? 'active' : ''} onClick={() => setActive(label as string)}><Icon size={12} /><span>{label as string}</span></button>)}</nav>
      <div className="sidebar-footer"><span>AJI Nari S.A.</span><span>Ejercicio 2025</span></div>
    </aside>
    <main className="content">
      <header className="topbar"><div className="mobile-title"><button className="icon-button"><Menu size={16} /></button><span>Resumen 2025</span></div><span className="desktop-title">{active === 'Dashboard' ? 'Resumen 2025' : active}</span><div className="top-actions"><span className="status">ARS&nbsp; 980 M</span><div className="year-select"><button className="year-button" onClick={() => setYearOpen(!yearOpen)}>{year} <ChevronDown size={10} /></button>{yearOpen && <div className="year-menu">{['Año 2025', 'Año 2024', 'Año 2023'].map((option) => <button key={option} onClick={() => { setYear(option); setYearOpen(false); }}>{option}</button>)}</div>}</div><span className="avatar">AN</span></div></header>
      <div className={`dashboard ${active !== 'Dashboard' ? 'section-dashboard' : ''}`}>
        {active === 'Dashboard' && <><div className="metrics-grid">{metrics.map((metric) => <div className="panel metric" key={metric.label}><span className="eyebrow">{metric.label}</span><strong>{metric.value}</strong><small>{metric.note}</small></div>)}</div><div className="metrics-grid secondary">{secondaryMetrics.map((metric) => <div className="panel metric" key={metric.label}><span className="eyebrow">{metric.label}</span><strong>{metric.value}</strong><small>{metric.note}</small>{metric.badge && <em>{metric.badge}</em>}</div>)}</div><div className="charts-grid"><Card title="Comisiones USD por mes — 2025"><BarChart data={billed} /></Card><Card title="Comisiones ARS por mes — 2025"><BarChart data={ars} second /></Card></div><div className="bottom-grid"><Card title="Top 10 clientes por comisión USD" action="Ver todos"><div className="table-head"><span>#</span><span>Cliente</span><span>Comisión USD</span><span>%</span></div><div className="customer-table">{customers.map(([name, value, percent], index) => <div className="customer-row" key={name}><span>{String(index + 1).padStart(2, '0')}</span><strong>{name}</strong><span className="amount"><i style={{ width: `${Math.max(18, Number(percent.replace('%', '')) * 3)}%` }} />{value}</span><span>{percent}</span></div>)}</div></Card><Card title="Evolución top 5 clientes — mensual USD"><div className="legend">{['E-Grain', 'Viterra', 'LDC', 'COFCO', 'Amaggi'].map((name, index) => <span key={name}><i style={{ background: ['#c4a15a', '#4c8861', '#2f654a', '#836f2b', '#789b70'][index] }} />{name}</span>)}</div><TrendChart /></Card></div><div className="assistant-bar"><MessageSquareText size={13} /><input aria-label="Preguntar al asistente" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') setAssistantOpen(true); }} placeholder="Preguntá sobre tus operaciones en lenguaje natural..." /><button onClick={() => setAssistantOpen(true)}>{query ? 'Consultar' : 'Abrir asistente'} <ArrowUpRight size={11} /></button></div></>}
        {active === 'Clientes' && <ClientsView />}
        {active === 'Operaciones' && <OperationsView />}
        {active === 'Asistente IA' && <AssistantView />}
      </div>
    </main>
    {assistantOpen && active === 'Dashboard' && <div className="assistant-drawer"><div className="drawer-header"><div><span className="eyebrow">ASISTENTE IA</span><h3>¿Qué querés analizar?</h3></div><button className="icon-button" onClick={() => setAssistantOpen(false)}><X size={16} /></button></div><div className="assistant-message"><Sparkles size={16} /><p>{query || 'Puedo ayudarte a entender tus comisiones, clientes y operaciones.'}</p></div><div className="suggestions"><button onClick={() => setQuery('¿Cuál fue mi mejor mes?')}>¿Cuál fue mi mejor mes?</button><button onClick={() => setQuery('Compará mis clientes principales')}>Compará mis clientes principales</button></div><div className="drawer-input"><Search size={14} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Escribí una consulta..." /></div></div>}
  </div>;
}

export default App;
