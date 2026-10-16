import { useState } from 'react';
import { Shield, Settings, Sliders, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { useClemoraStore, ClemoraStore } from '../../services/store.ts';

export function SystemSettingsAdmin() {
  const store = useClemoraStore();
  const [taxRate, setTaxRate] = useState<number>(store.settings.defaultTaxRate);
  const [serviceCharge, setServiceCharge] = useState<number>(store.settings.defaultServiceCharge);
  const [depositPercent, setDepositPercent] = useState<number>(store.settings.requiredDepositPercent);
  const [bufferMultiplier, setBufferMultiplier] = useState<number>(store.settings.bufferMultiplier);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveSettings = () => {
    ClemoraStore.updateSettings({
      defaultTaxRate: taxRate,
      defaultServiceCharge: serviceCharge,
      requiredDepositPercent: depositPercent,
      bufferMultiplier: bufferMultiplier,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
            Module 11 · System Administration
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mt-2">
            System Configuration & Audit Logs
          </h1>
          <p className="text-xs md:text-sm text-stone-500 mt-1">
            Global business rules, Turnaround Buffer multipliers, and immutable security audit trails.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-amber-700 hover:bg-amber-600 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
        >
          {saveSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Settings Saved!</span>
            </>
          ) : (
            <span>Update Business Rules</span>
          )}
        </button>
      </div>

      {/* Global Business Rules Form */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-xs space-y-6">
        <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-amber-700" />
          <span>Operational & Financial Policy Parameters</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div>
            <label className="block font-bold text-stone-800 mb-1">Default Local Tax Rate (%)</label>
            <input
              type="number"
              step={0.5}
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg font-mono"
            />
            <p className="text-[10px] text-stone-400 mt-1">Applied to proposals during formulation</p>
          </div>

          <div>
            <label className="block font-bold text-stone-800 mb-1">Service & Logistics Fee (%)</label>
            <input
              type="number"
              step={0.5}
              value={serviceCharge}
              onChange={(e) => setServiceCharge(Number(e.target.value))}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg font-mono"
            />
            <p className="text-[10px] text-stone-400 mt-1">Covers dispatch, transport & warewash crew</p>
          </div>

          <div>
            <label className="block font-bold text-stone-800 mb-1">Required Deposit to Lock (%)</label>
            <input
              type="number"
              step={5}
              value={depositPercent}
              onChange={(e) => setDepositPercent(Number(e.target.value))}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg font-mono"
            />
            <p className="text-[10px] text-stone-400 mt-1">Initial client retainer to reserve date</p>
          </div>

          <div>
            <label className="block font-bold text-stone-800 mb-1">Turnaround Buffer Multiplier</label>
            <select
              value={bufferMultiplier}
              onChange={(e) => setBufferMultiplier(Number(e.target.value))}
              className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg font-mono font-semibold"
            >
              <option value={1.0}>1.0x (Standard Protected 150m Sanitization)</option>
              <option value={1.2}>1.2x (Extended 180m Sanitization Buffer)</option>
              <option value={1.5}>1.5x (Peak Holiday Rush 225m Buffer)</option>
            </select>
            <p className="text-[10px] text-stone-400 mt-1">Safeguards peak holiday equipment hygiene</p>
          </div>
        </div>
      </div>

      {/* Security & Activity Audit Log */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs space-y-4">
        <div className="p-6 pb-0 flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-700" />
              <span>User Activity & Security Audit Logs</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Immutable recorded actions: logins, role switches, quotation formulations, and bookings
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-stone-500 bg-stone-100 px-2.5 py-1 rounded">
            {store.auditLogs.length} Events Logged
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-y border-stone-200 font-semibold text-stone-600 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">User Email</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Details</th>
                <th className="py-3 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {store.auditLogs.slice(0, 15).map((log) => (
                <tr key={log.id} className="hover:bg-stone-50/70 font-mono text-[11px]">
                  <td className="py-2.5 px-4 text-stone-500">{log.timestamp}</td>
                  <td className="py-2.5 px-4 font-semibold text-stone-800">{log.userEmail}</td>
                  <td className="py-2.5 px-3 uppercase text-[10px] text-amber-800">{log.role}</td>
                  <td className="py-2.5 px-4 font-bold text-stone-900">{log.action}</td>
                  <td className="py-2.5 px-4 text-stone-600 truncate max-w-xs">{log.details}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      log.status === 'success' ? 'bg-emerald-100 text-emerald-800' :
                      log.status === 'warning' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
