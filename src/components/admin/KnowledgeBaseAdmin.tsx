import { useState } from 'react';
import { Bot, Plus, Edit, Trash2, CheckCircle2, UserPlus, Clock } from 'lucide-react';
import { useClemoraStore, ClemoraStore } from '../../services/store.ts';
import { KnowledgeBaseArticle } from '../../types/clemora.ts';

export function KnowledgeBaseAdmin() {
  const store = useClemoraStore();
  const [editingArticle, setEditingArticle] = useState<KnowledgeBaseArticle | null>(null);
  const [isNewArticleOpen, setIsNewArticleOpen] = useState(false);

  // Article Form State
  const [category, setCategory] = useState<KnowledgeBaseArticle['category']>('turnaround_buffer');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [tags, setTags] = useState('buffer, logistics');

  const handleOpenEdit = (art: KnowledgeBaseArticle) => {
    setEditingArticle(art);
    setCategory(art.category);
    setQuestion(art.question);
    setAnswer(art.answer);
    setTags(art.tags.join(', '));
  };

  const handleSaveArticle = () => {
    if (!question || !answer) return;
    const tagsArray = tags.split(',').map((t) => t.trim()).filter(Boolean);
    const updated: KnowledgeBaseArticle = {
      id: editingArticle ? editingArticle.id : `kb_${Date.now()}`,
      category,
      question,
      answer,
      tags: tagsArray,
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    ClemoraStore.saveKnowledgeArticle(updated);
    setEditingArticle(null);
    setIsNewArticleOpen(false);
    setQuestion('');
    setAnswer('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this knowledge base entry?')) {
      ClemoraStore.deleteKnowledgeArticle(id);
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
            Module 6 & 11 · Grounded AI Core
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mt-2">
            AI Knowledge Base & Conversation Audits
          </h1>
          <p className="text-xs md:text-sm text-stone-500 mt-1">
            Articles directly govern the responses of the AI Concierge assistant. Edits take effect in real-time.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingArticle(null);
            setQuestion('');
            setAnswer('');
            setIsNewArticleOpen(true);
          }}
          className="px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-amber-700 hover:bg-amber-600 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Grounding Fact</span>
        </button>
      </div>

      {/* Main Grid: Articles vs Handover Audits */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Knowledge Base Articles */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-serif font-bold text-lg text-stone-900">
            Approved Grounding Articles ({store.knowledgeBase.length})
          </h3>

          <div className="space-y-4">
            {store.knowledgeBase.map((art) => (
              <div
                key={art.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:border-stone-400 transition-colors space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                      {art.category.replace('_', ' ')}
                    </span>
                    <h4 className="font-bold text-stone-900 text-base mt-1.5">{art.question}</h4>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(art)}
                      className="p-1.5 rounded text-stone-500 hover:text-stone-900 hover:bg-stone-100 cursor-pointer"
                      title="Edit article"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(art.id)}
                      className="p-1.5 rounded text-rose-500 hover:text-rose-700 hover:bg-rose-50 cursor-pointer"
                      title="Delete article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-100">
                  {art.answer}
                </p>

                <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono pt-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {art.tags.map((tg, idx) => (
                      <span key={idx} className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded-xs">
                        #{tg}
                      </span>
                    ))}
                  </div>
                  <span>Updated: {art.lastUpdated}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: AI Handover Logs */}
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-lg text-stone-900">
            Escalation Handover Logs
          </h3>

          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4 text-xs">
            {store.handovers.length === 0 ? (
              <div className="text-center py-8 text-stone-400 italic">
                No active coordinator handover escalations at this time.
              </div>
            ) : (
              store.handovers.map((h) => (
                <div key={h.id} className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 space-y-2">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-stone-900">{h.customerName}</span>
                    <span className="font-mono text-[10px] text-stone-400">{h.requestedAt}</span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-normal">
                    <strong>Reason:</strong> {h.summary}
                  </p>
                  <p className="text-[10px] text-amber-800">Assigned: {h.assignedCoordinator || 'Coordinator Pool'}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Edit / New Article Modal */}
      {(isNewArticleOpen || editingArticle) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 space-y-4 text-xs">
            <h3 className="font-bold text-base text-stone-900">
              {editingArticle ? 'Edit Knowledge Grounding Article' : 'Create Grounding Article'}
            </h3>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Domain Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 border border-stone-300 rounded-lg text-xs"
              >
                <option value="turnaround_buffer">Turnaround Buffer Logistics</option>
                <option value="packages">Package Specifications & Guest Minimums</option>
                <option value="menus">Culinary Courses & Dietary Safety</option>
                <option value="pricing">Pricing, Inclusions & Surcharges</option>
                <option value="policies">Deposit, Payment & Cancellation Policies</option>
                <option value="faq">General FAQ</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Customer Inquiry / Question</label>
              <input
                type="text"
                placeholder="e.g. How does the Turnaround Buffer prevent double-booking?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Ground Truth Answer (used by AI Concierge)</label>
              <textarea
                rows={4}
                placeholder="Provide accurate, fact-grounded explanation..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Search Tags (comma-separated)</label>
              <input
                type="text"
                placeholder="e.g. buffer, scheduling, warewash, sanitization"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full p-2.5 border border-stone-300 rounded-lg font-mono"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
              <button
                onClick={() => {
                  setEditingArticle(null);
                  setIsNewArticleOpen(false);
                }}
                className="px-4 py-2 rounded-lg text-stone-600 hover:bg-stone-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveArticle}
                className="px-5 py-2 rounded-lg font-bold text-white bg-amber-700 hover:bg-amber-600 cursor-pointer shadow-xs"
              >
                Save Knowledge Fact
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
