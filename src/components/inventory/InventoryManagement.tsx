import { useState } from 'react';
import { Package, AlertTriangle, RefreshCw, CheckCircle, Barcode, ArrowUpRight, ArrowDownLeft, Shield } from 'lucide-react';
import { useClemoraStore, ClemoraStore } from '../../services/store.ts';
import { EquipmentItem, ConsumableItem } from '../../types/clemora.ts';

export function InventoryManagement() {
  const store = useClemoraStore();
  const [activeTab, setActiveTab] = useState<'equipment' | 'consumables' | 'dispatch'>('equipment');

  // Edit Equipment State
  const [editingEquipment, setEditingEquipment] = useState<EquipmentItem | null>(null);
  const [editTotal, setEditTotal] = useState<number>(0);
  const [editInRepair, setEditInRepair] = useState<number>(0);

  // Restock Consumable State
  const [restockAmount, setRestockAmount] = useState<{ [id: string]: number }>({});

  const handleOpenEditEquipment = (eq: EquipmentItem) => {
    setEditingEquipment(eq);
    setEditTotal(eq.totalQuantity);
    setEditInRepair(eq.inRepairQuantity);
  };

  const handleSaveEquipment = () => {
    if (!editingEquipment) return;
    ClemoraStore.updateEquipmentStock(editingEquipment.id, editTotal, editInRepair);
    setEditingEquipment(null);
  };

  const handleRestock = (conId: string, current: number, addition: number) => {
    ClemoraStore.updateConsumableStock(conId, current + addition);
  };

  const lowStockItems = store.consumables.filter((c) => c.currentStock <= c.minimumThreshold);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
            Module 5 · Warehouse & Assets
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mt-2">
            Resource Inventory & Dispatch Tracking
          </h1>
          <p className="text-xs md:text-sm text-stone-500 mt-1">
            Real-time allocation metrics, wear-and-tear conditions, consumable safety thresholds, and loading dock dispatch.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl self-start md:self-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('equipment')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'equipment' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Rental Equipment
          </button>
          <button
            onClick={() => setActiveTab('consumables')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'consumables' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>Consumables</span>
            {lowStockItems.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('dispatch')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'dispatch' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Loading Dock Dispatch
          </button>
        </div>
      </div>

      {/* Low Stock Warning Banner if any */}
      {lowStockItems.length > 0 && (
        <div className="bg-rose-50 border border-rose-300 text-rose-900 p-4 rounded-xl flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <div>
              <p className="font-bold">LOW STOCK THRESHOLD TRIGGERED ({lowStockItems.length} items)</p>
              <p className="text-rose-700">
                {lowStockItems.map((c) => `${c.name} (${c.currentStock} ${c.unit} left)`).join(' · ')}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('consumables')}
            className="px-3 py-1.5 rounded bg-rose-700 hover:bg-rose-600 text-white font-semibold whitespace-nowrap cursor-pointer"
          >
            Review & Restock
          </button>
        </div>
      )}

      {/* Tab 1: Rental Equipment */}
      {activeTab === 'equipment' && (
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-stone-200 flex items-center justify-between text-xs">
            <span className="font-semibold text-stone-700">
              Master Tableware, Furniture, Chafers & Acoustic Assets
            </span>
            <span className="text-stone-500 font-mono">
              Protected by Turnaround Warewash Sanitization Cycle
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 font-semibold text-stone-700 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Asset Code</th>
                  <th className="py-3 px-4">Equipment Item Description</th>
                  <th className="py-3 px-3">Warehouse Bay</th>
                  <th className="py-3 px-3 text-right">Total Qty</th>
                  <th className="py-3 px-3 text-right">Allocated</th>
                  <th className="py-3 px-3 text-right">Available</th>
                  <th className="py-3 px-3 text-center">Condition</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {store.equipment.map((eq) => {
                  const available = eq.totalQuantity - eq.allocatedQuantity - eq.inRepairQuantity;
                  return (
                    <tr key={eq.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-amber-900">{eq.code}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-stone-900 block">{eq.name}</span>
                        <span className="text-[10px] uppercase text-stone-400 font-mono">{eq.category}</span>
                      </td>
                      <td className="py-3.5 px-3 text-stone-600 font-mono text-[11px]">{eq.location}</td>
                      <td className="py-3.5 px-3 text-right font-mono tabular-nums font-semibold text-stone-900">
                        {eq.totalQuantity}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono tabular-nums text-amber-700 font-semibold">
                        {eq.allocatedQuantity}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono tabular-nums font-bold text-emerald-700">
                        {available}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          eq.condition === 'Pristine' ? 'bg-emerald-100 text-emerald-800' :
                          eq.condition === 'Good' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {eq.condition}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleOpenEditEquipment(eq)}
                          className="px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-[11px] cursor-pointer"
                        >
                          Audit Stock
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Consumables */}
      {activeTab === 'consumables' && (
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-stone-200 flex items-center justify-between text-xs">
            <span className="font-semibold text-stone-700">
              Kitchen Pantry, Sanitizer & Consumable Supplies
            </span>
            <span className="text-stone-500 font-mono">
              Auto-generates low-stock alerts when stock &lt; minimum threshold
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 font-semibold text-stone-700 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Supply Item</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3 text-right">Current Stock</th>
                  <th className="py-3 px-3 text-right">Min Safe Threshold</th>
                  <th className="py-3 px-3 text-right">Unit Cost</th>
                  <th className="py-3 px-3">Last Restocked</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Quick Restock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {store.consumables.map((c) => {
                  const isLow = c.currentStock <= c.minimumThreshold;
                  return (
                    <tr key={c.id} className={`hover:bg-stone-50/70 ${isLow ? 'bg-rose-50/40' : ''}`}>
                      <td className="py-3.5 px-4 font-semibold text-stone-900">{c.name}</td>
                      <td className="py-3.5 px-3 font-mono text-[11px] uppercase text-stone-500">{c.category}</td>
                      <td className="py-3.5 px-3 text-right font-mono font-bold tabular-nums">
                        <span className={isLow ? 'text-rose-700 font-extrabold text-sm' : 'text-stone-800'}>
                          {c.currentStock} {c.unit}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono tabular-nums text-stone-500">
                        {c.minimumThreshold} {c.unit}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono tabular-nums text-stone-700">
                        ${c.costPerUnit.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-3 text-stone-500 font-mono text-[11px]">{c.lastRestocked}</td>
                      <td className="py-3.5 px-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          isLow ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {isLow ? 'Low Stock' : 'Optimal'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleRestock(c.id, c.currentStock, 10)}
                            className="px-2 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 font-mono text-[11px] font-semibold cursor-pointer"
                          >
                            +10
                          </button>
                          <button
                            onClick={() => handleRestock(c.id, c.currentStock, 50)}
                            className="px-2 py-1 rounded bg-amber-700 hover:bg-amber-600 text-white font-mono text-[11px] font-semibold cursor-pointer"
                          >
                            +50
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Dispatch & Return Check */}
      {activeTab === 'dispatch' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900">Loading Dock Dispatch & Return Protocol</h3>
              <p className="text-xs text-stone-500">
                Turnaround buffer requires barcode sign-out before transit and warewash sign-in post-event.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold bg-stone-100 px-3 py-1.5 rounded-lg text-stone-700">
              Station: Dock Bay #2
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3 text-xs">
              <span className="font-bold text-stone-800 block text-sm">Outbound Dispatch Crate Check</span>
              <p className="text-stone-600">
                Verify each equipment flight case matches the event packing slip before loading onto transit vehicle.
              </p>
              <div className="p-3 bg-white rounded border border-stone-200 font-mono text-[11px] space-y-1">
                <p>• CHF-ROLL-01 (12 Chafers)</p>
                <p>• GLS-RIED-BOR (45 Stem Crates)</p>
                <p>• LIN-BELG-IVR (28 Pressed Linens)</p>
              </div>
              <button
                onClick={() => alert('Barcode verification verified: Packing slip signed by Logistics Lead Darius Thorne.')}
                className="w-full py-2 rounded-lg font-bold bg-[#0F172A] hover:bg-amber-700 text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Barcode className="w-3.5 h-3.5" />
                <span>Simulate Dispatch Barcode Scan</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 space-y-3 text-xs text-teal-950">
              <span className="font-bold block text-sm">Protected Warewash Sanitization Cycle</span>
              <p className="text-teal-800">
                Equipment returning from venues enters the mandatory 120-180 min hospital-grade wash cycle before returning to inventory.
              </p>
              <div className="p-3 bg-white rounded border border-teal-200 font-mono text-[11px] text-teal-900 space-y-1">
                <p>• Cycle Temp: 185°F High-Heat Rinse</p>
                <p>• Sanitizer: Commercial Eco-Chlor #5</p>
                <p>• Inspection Status: 100% Zero-Breakage</p>
              </div>
              <button
                onClick={() => alert('Warewash cycle recorded: 150-minute buffer logged to system audit log.')}
                className="w-full py-2 rounded-lg font-bold bg-teal-700 hover:bg-teal-600 text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Log Sanitization Cycle Complete</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3 text-xs">
              <span className="font-bold text-stone-800 block text-sm">Return Condition Audit</span>
              <p className="text-stone-600">
                Audit returns for chips, tears, or bent hinges. Damaged items automatically transfer to In-Repair inventory.
              </p>
              <div className="p-3 bg-white rounded border border-stone-200 font-mono text-[11px] space-y-1">
                <p>• Stemware inspected: 0 Broken</p>
                <p>• Linens laundered: 28 Received</p>
                <p>• Copper Bar: Pristine</p>
              </div>
              <button
                onClick={() => alert('Condition inspection verified: All items returned to storage bay in Pristine condition.')}
                className="w-full py-2 rounded-lg font-bold bg-stone-800 hover:bg-stone-700 text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Sign Off Return Condition</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Equipment Modal */}
      {editingEquipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 space-y-4 text-xs">
            <h3 className="font-bold text-base text-stone-900">Audit Equipment Stock</h3>
            <p className="text-stone-600">{editingEquipment.name} ({editingEquipment.code})</p>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Total Quantity Owned</label>
              <input
                type="number"
                value={editTotal}
                onChange={(e) => setEditTotal(Number(e.target.value))}
                className="w-full p-2.5 border border-stone-300 rounded-lg font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">In-Repair / Maintenance Units</label>
              <input
                type="number"
                value={editInRepair}
                onChange={(e) => setEditInRepair(Number(e.target.value))}
                className="w-full p-2.5 border border-stone-300 rounded-lg font-mono"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
              <button
                onClick={() => setEditingEquipment(null)}
                className="px-4 py-2 rounded-lg text-stone-600 hover:bg-stone-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEquipment}
                className="px-5 py-2 rounded-lg font-bold text-white bg-amber-700 hover:bg-amber-600 cursor-pointer shadow-xs"
              >
                Save Stock Audit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
