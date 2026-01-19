import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Clock, Search, FileText, User, Activity, AlertCircle, Filter, ChevronRight, Download, BrainCircuit } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Synthetic Data
const kycCases = [
  { id: 'KYC-2026-901', name: 'Global Trade Ltd.', type: 'Corporate', riskScore: 88, status: 'Review Required', aiRecommendation: 'Escalate', date: '2026-09-24', flags: ['PEP Match (UBO)', 'High-Risk Jurisdiction'] },
  { id: 'KYC-2026-902', name: 'Eleanor Vance', type: 'Individual', riskScore: 24, status: 'Auto-Approved', aiRecommendation: 'Approve', date: '2026-09-23', flags: [] },
  { id: 'KYC-2026-903', name: 'Nexus Holdings LLC', type: 'Corporate', riskScore: 65, status: 'Pending Info', aiRecommendation: 'Request Docs', date: '2026-09-23', flags: ['Incomplete Ownership Structure'] },
  { id: 'KYC-2026-904', name: 'Marcus Sterling', type: 'Individual', riskScore: 92, status: 'Review Required', aiRecommendation: 'Reject', date: '2026-09-22', flags: ['Sanctions Match (Partial)', 'Adverse Media'] },
  { id: 'KYC-2026-905', name: 'Oasis Tech Solutions', type: 'Corporate', riskScore: 45, status: 'Under Review', aiRecommendation: 'Approve', date: '2026-09-22', flags: ['Recent Address Change'] },
];

const riskDistributionData = [
  { name: 'Low Risk', value: 65 },
  { name: 'Medium Risk', value: 25 },
  { name: 'High Risk', value: 10 },
];
const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

const volumeData = [
  { name: 'Mon', Auto: 120, Manual: 30 },
  { name: 'Tue', Auto: 132, Manual: 45 },
  { name: 'Wed', Auto: 101, Manual: 25 },
  { name: 'Thu', Auto: 145, Manual: 50 },
  { name: 'Fri', Auto: 160, Manual: 40 },
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCase, setSelectedCase] = useState<any>(null);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="p-4 flex items-center gap-3 text-white border-b border-slate-800">
          <Shield className="w-8 h-8 text-indigo-400" />
          <div>
            <h1 className="font-bold text-lg leading-tight">TrustGuard AI</h1>
            <p className="text-xs text-slate-400">KYC/AML Assistant</p>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => { setActiveTab('dashboard'); setSelectedCase(null); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' && !selectedCase ? 'bg-indigo-600/20 text-indigo-400' : 'hover:bg-slate-800 hover:text-white'}`}>
            <Activity className="w-5 h-5" /> Dashboard
          </button>
          <button onClick={() => { setActiveTab('queue'); setSelectedCase(null); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'queue' || selectedCase ? 'bg-indigo-600/20 text-indigo-400' : 'hover:bg-slate-800 hover:text-white'}`}>
            <AlertTriangle className="w-5 h-5" /> Review Queue
            <span className="ml-auto bg-indigo-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">12</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-slate-800 hover:text-white">
            <Search className="w-5 h-5" /> Search Entities
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-slate-800 hover:text-white">
            <FileText className="w-5 h-5" /> Reports & Audit
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-slate-800 hover:text-white">
            <User className="w-5 h-5" /> Analyst Profile
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
          Prototype v1.0.0
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 p-4 flex items-center justify-between z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search by name, ID, or risk flag..." className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg w-96 focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <AlertCircle className="w-6 h-6" />
            </button>
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border-2 border-indigo-200">
              AS
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {!selectedCase && activeTab === 'dashboard' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Compliance Overview</h2>
                  <p className="text-slate-500">AI-assisted metrics and current workload.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 text-sm font-medium text-slate-700">
                  <Download className="w-4 h-4" /> Export Report
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Pending Reviews', value: '12', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-100' },
                  { label: 'High Risk Flags', value: '3', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-100' },
                  { label: 'Auto-Approved (24h)', value: '142', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-100' },
                  { label: 'Avg AI Confidence', value: '94%', icon: BrainCircuit, color: 'text-indigo-500', bg: 'bg-indigo-100' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${stat.bg}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
                  <h3 className="text-lg font-bold text-slate-800 mb-6">Processing Volume (Auto vs Manual)</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={volumeData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                        <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <Bar dataKey="Auto" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="Manual" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-800 mb-6">Risk Distribution</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={riskDistributionData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                          {riskDistributionData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    {riskDistributionData.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                        {entry.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {!selectedCase && activeTab === 'queue' && (
             <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Action Required: Review Queue</h2>
                    <p className="text-slate-500">Cases requiring human analyst review.</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 text-sm font-medium text-slate-700">
                      <Filter className="w-4 h-4" /> Filter
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-500">
                        <th className="p-4 font-medium">Case ID</th>
                        <th className="p-4 font-medium">Customer / Entity</th>
                        <th className="p-4 font-medium">Risk Score</th>
                        <th className="p-4 font-medium">AI Recommendation</th>
                        <th className="p-4 font-medium">Flags</th>
                        <th className="p-4 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {kycCases.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 text-sm text-slate-500">{c.id}</td>
                          <td className="p-4">
                            <p className="font-medium text-slate-800">{c.name}</p>
                            <p className="text-xs text-slate-500">{c.type}</p>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${c.riskScore > 75 ? 'bg-red-100 text-red-700' : c.riskScore > 40 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                {c.riskScore}
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1.5">
                              <BrainCircuit className="w-4 h-4 text-indigo-500" />
                              <span className="text-sm font-medium text-slate-700">{c.aiRecommendation}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1">
                              {c.flags.length === 0 ? <span className="text-sm text-slate-400">None</span> : 
                                c.flags.map((f, i) => <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs border border-slate-200">{f}</span>)
                              }
                            </div>
                          </td>
                          <td className="p-4">
                            <button onClick={() => setSelectedCase(c)} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1">
                              Review <ChevronRight className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
             </div>
          )}

          {selectedCase && (
            <div className="max-w-6xl mx-auto space-y-6">
              <button onClick={() => setSelectedCase(null)} className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-4">
                &larr; Back to Queue
              </button>

              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">{selectedCase.name}</h2>
                  <p className="text-slate-500">Case ID: {selectedCase.id} | Opened: {selectedCase.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 ${selectedCase.riskScore > 75 ? 'bg-red-100 text-red-700 border border-red-200' : selectedCase.riskScore > 40 ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'}`}>
                    <AlertTriangle className="w-5 h-5" /> Risk Score: {selectedCase.riskScore}/100
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* AI Summary Panel */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                    <div className="flex items-center gap-2 mb-4 text-indigo-800 font-bold">
                      <BrainCircuit className="w-6 h-6" /> AI Case Summary & Recommendation
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed mb-4">
                      The AI model has flagged this entity due to <span className="font-semibold">{selectedCase.flags.join(' and ')}</span>. Cross-referencing against global watchlists indicates a 92% confidence match for a UBO associated with politically exposed activities in the last 24 months. Transaction volumes from associated accounts show anomalous behavior not aligned with stated business purposes.
                    </p>
                    <div className="bg-white p-4 rounded-lg border border-indigo-100 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-500 uppercase font-semibold">Suggested Action</p>
                        <p className="text-lg font-bold text-slate-800">{selectedCase.aiRecommendation}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500 uppercase font-semibold">Confidence Score</p>
                        <p className="text-lg font-bold text-indigo-600">92%</p>
                      </div>
                    </div>
                  </div>

                  {/* Customer Profile & Docs */}
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Profile & Verification</h3>
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div>
                        <p className="text-slate-500">Entity Type</p>
                        <p className="font-medium text-slate-800">{selectedCase.type}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Jurisdiction</p>
                        <p className="font-medium text-slate-800">Panama (High Risk)</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Incorporation Date</p>
                        <p className="font-medium text-slate-800">2023-11-14</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Stated Industry</p>
                        <p className="font-medium text-slate-800">Logistics & Shipping</p>
                      </div>
                    </div>

                    <h4 className="font-medium text-slate-800 mb-3 text-sm">Submitted Documents</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-slate-400" />
                          <span className="text-sm font-medium text-slate-700">Certificate_of_Inc.pdf</span>
                        </div>
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded">Verified</span>
                      </li>
                      <li className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-slate-400" />
                          <span className="text-sm font-medium text-slate-700">Passport_UBO_Smith.jpg</span>
                        </div>
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded">Verified</span>
                      </li>
                      <li className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-slate-400" />
                          <span className="text-sm font-medium text-slate-700">Proof_of_Address.pdf</span>
                        </div>
                        <span className="text-xs font-semibold text-amber-600 bg-amber-100 px-2 py-1 rounded">Flagged: Mismatch</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Action Panel */}
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Analyst Decision</h3>
                    <textarea className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none mb-4 h-32" placeholder="Enter review notes and rationale..."></textarea>
                    
                    <div className="space-y-3">
                      <button className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors flex justify-center items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Approve Case
                      </button>
                      <button className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex justify-center items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Reject (High Risk)
                      </button>
                      <button className="w-full py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium rounded-lg transition-colors">
                        Request Information
                      </button>
                      <button className="w-full py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium rounded-lg transition-colors">
                        Escalate to L2
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Audit Trail</h3>
                    <div className="relative border-l-2 border-slate-200 ml-3 space-y-6 pb-2">
                      <div className="relative">
                        <div className="absolute -left-[21px] bg-slate-200 w-4 h-4 rounded-full border-2 border-white"></div>
                        <p className="text-xs text-slate-500 mb-1">Today, 09:42 AM</p>
                        <p className="text-sm text-slate-800 font-medium">Assigned to queue (High Priority)</p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[21px] bg-indigo-500 w-4 h-4 rounded-full border-2 border-white"></div>
                        <p className="text-xs text-slate-500 mb-1">Today, 09:41 AM</p>
                        <p className="text-sm text-slate-800 font-medium">AI Risk Assessment completed</p>
                        <p className="text-xs text-slate-500">Score 88/100, PEP Match found.</p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[21px] bg-emerald-500 w-4 h-4 rounded-full border-2 border-white"></div>
                        <p className="text-xs text-slate-500 mb-1">Yesterday, 14:30 PM</p>
                        <p className="text-sm text-slate-800 font-medium">Customer completed onboarding</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
