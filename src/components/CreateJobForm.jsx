import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'

export default function CreateJobForm() {
  const { user } = useAuth()
  const { addJob } = useData()
  const [form, setForm] = useState({
    title: '',
    company: '',
    description: '',
    location: '',
  })
  const [posted, setPosted] = useState(false)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  function handleSubmit(e) {
    e.preventDefault()
    addJob(form, user.id)
    setForm({ title: '', company: '', description: '', location: '' })
    setPosted(true)
    setTimeout(() => setPosted(false), 3000)
  }

  const inputClass =
    'w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-slate-900">Post a new job</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Job title</label>
          <input required className={inputClass} value={form.title} onChange={update('title')} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Company</label>
          <input
            required
            className={inputClass}
            value={form.company}
            onChange={update('company')}
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Location</label>
        <input
          required
          className={inputClass}
          value={form.location}
          onChange={update('location')}
          placeholder="Remote, or a city"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
        <textarea
          required
          rows={5}
          className={inputClass}
          value={form.description}
          onChange={update('description')}
          placeholder="Describe the role, responsibilities, and requirements…"
        />
      </div>

      {posted && (
        <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
          ✅ Job posted — it's now live in the feed.
        </p>
      )}

      <button
        type="submit"
        className="self-start rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        Post job
      </button>
    </form>
  )
}
