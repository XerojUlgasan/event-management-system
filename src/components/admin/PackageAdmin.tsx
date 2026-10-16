import { useState } from 'react';
import { Package, Plus, Edit, Trash2, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useClemoraStore, ClemoraStore } from '../../services/store.ts';
import { EventPackage, EventCategory } from '../../types/clemora.ts';

export function PackageAdmin() {
  const store = useClemoraStore();
  const [editingPkg, setEditingPkg] = useState<EventPackage | null>(null);
  const [isNewPkgOpen, setIsNewPkgOpen] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<EventCategory>('corporate');
  const [pricePerGuest, setPricePerGuest] = useState(65);
  const [minimumGuests, setMinimumGuests] = useState(50);
  const [description, setDescription] = useState('');
  const [prepDurationHours, setPrepDurationHours] = useState(3.0);
  const [imageUrl, setImageUrl] = useState('/src/assets/images/hero_event_catering_banquet_1792158710813.jpg');

  const handleOpenEdit = (pkg: EventPackage) => {
    setEditingPkg(pkg);
    setName(pkg.name);
    setTagline(pkg.tagline);
    setCategory(pkg.category);
    setPricePerGuest(pkg.pricePerGuest);
    setMinimumGuests(pkg.minimumGuests);
    setDescription(pkg.description);
    setPrepDurationHours(pkg.prepDurationHours);
    setImageUrl(pkg.imageUrl);
  };

  const handleSave = () => {
    if (!name) return;
    const updated: EventPackage = {
      id: editingPkg ? editingPkg.id : `pkg_${Date.now()}`,
      name,
      tagline: tagline || 'Curated culinary experience',
      category,
      pricePerGuest,
      minimumGuests,
      description: description || 'Master catering curation',
      inclusions: editingPkg ? editingPkg.inclusions : ['Plated Dining', 'Dedicated Captain', 'Tableware'],
      courseHighlights: editingPkg ? editingPkg.courseHighlights : ['Appetizer', 'Seasonal Entree', 'Artisan Dessert'],
      imageUrl,
      prepDurationHours,
      isPublished: true,
      featured: editingPkg ? editingPkg.featured : false,
    };

    ClemoraStore.savePackage(updated);
    setEditingPkg(null);
    setIsNewPkgOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Archive this master package?')) {
      ClemoraStore.deletePackage(id);
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
            Module 3 · Master Offerings
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mt-2">
            Master Packages & Menu Administration
          </h1>
          <p className="text-xs md:text-sm text-stone-500 mt-1">
            Configure rates per guest, guest minimum thresholds, prep window hours, and published catalog status.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingPkg(null);
            setName('');
            setDescription('');
            setPricePerGuest(75);
            setIsNewPkgOpen(true);
          }}
          className="px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-amber-700 hover:bg-amber-600 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Package</span>
        </button>
      </div>

      {/* Packages Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 font-semibold text-stone-700 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Package Name</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3 text-right">Price / Guest</th>
                <th className="py-3 px-3 text-right">Min Guests</th>
                <th className="py-3 px-3 text-right">Prep Window</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {store.packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-stone-900 block">{pkg.name}</span>
                    <span className="text-[11px] text-stone-500 line-clamp-1">{pkg.tagline}</span>
                  </td>
                  <td className="py-3.5 px-3 uppercase text-[10px] font-mono text-stone-600">{pkg.category}</td>
                  <td className="py-3.5 px-3 text-right font-mono font-bold text-amber-800 text-sm">
                    ${pkg.pricePerGuest}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono text-stone-600">{pkg.minimumGuests}</td>
                  <td className="py-3.5 px-3 text-right font-mono text-stone-600">{pkg.prepDurationHours} hrs</td>
                  <td className="py-3.5 px-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                      Published
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(pkg)}
                        className="p-1.5 rounded text-stone-600 hover:text-stone-900 hover:bg-stone-100 cursor-pointer"
                        title="Edit Package"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(pkg.id)}
                        className="p-1.5 rounded text-rose-600 hover:text-rose-800 hover:bg-rose-50 cursor-pointer"
                        title="Archive Package"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Modal */}
      {(isNewPkgOpen || editingPkg) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 space-y-4 text-xs my-6">
            <h3 className="font-bold text-base text-stone-900">
              {editingPkg ? `Edit ${editingPkg.name}` : 'Create Master Package'}
            </h3>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Package Name</label>
              <input
                type="text"
                placeholder="e.g. Royal Ambassadorial Banquet"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Tagline</label>
              <input
                type="text"
                placeholder="e.g. Synchronized five-course service with sommelier wine flight"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full p-2.5 border border-stone-300 rounded-lg"
                >
                  <option value="corporate">Corporate</option>
                  <option value="wedding">Wedding</option>
                  <option value="gala">Gala</option>
                  <option value="private">Private Atelier</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Price Per Guest ($)</label>
                <input
                  type="number"
                  value={pricePerGuest}
                  onChange={(e) => setPricePerGuest(Number(e.target.value))}
                  className="w-full p-2.5 border border-stone-300 rounded-lg font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Minimum Guests</label>
                <input
                  type="number"
                  value={minimumGuests}
                  onChange={(e) => setMinimumGuests(Number(e.target.value))}
                  className="w-full p-2.5 border border-stone-300 rounded-lg font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Prep Window Hours</label>
                <input
                  type="number"
                  step={0.5}
                  value={prepDurationHours}
                  onChange={(e) => setPrepDurationHours(Number(e.target.value))}
                  className="w-full p-2.5 border border-stone-300 rounded-lg font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
              <button
                onClick={() => {
                  setEditingPkg(null);
                  setIsNewPkgOpen(false);
                }}
                className="px-4 py-2 rounded-lg text-stone-600 hover:bg-stone-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-lg font-bold text-white bg-amber-700 hover:bg-amber-600 cursor-pointer shadow-xs"
              >
                Save Package
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
