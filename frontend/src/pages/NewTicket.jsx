import React from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { predict } from '../services/api'
import PredictionCard from '../components/PredictionCard'
import toast from 'react-hot-toast'

export default function NewTicket() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const [result, setResult] = React.useState(null)

  const onSubmit = async (vals) => {
    try {
      const r = await predict({
        customer_name: vals.name,
        customer_email: vals.email,
        subject: vals.subject,
        description: vals.description,
      })
      setResult(r)
      toast.success('Ticket classified successfully')
    } catch (e) {
      toast.error('Prediction failed')
    }
  }

  return (
    <div className="max-w-3xl">
      <h2 className="page-title">New Support Ticket</h2>
      <p className="page-subtitle mb-6">Submit a ticket to instantly classify its category, priority, and review status.</p>

      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit(onSubmit)}
        className="glass-card p-6 space-y-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="field-label">Customer Name</label>
            <input {...register('name', { required: true })} className="input-field" placeholder="Jane Doe" />
            {errors.name && <p className="text-xs text-rose-500 mt-1">Customer name is required</p>}
          </div>
          <div>
            <label className="field-label">Customer Email</label>
            <input {...register('email', { required: true })} type="email" className="input-field" placeholder="jane@company.com" />
            {errors.email && <p className="text-xs text-rose-500 mt-1">Customer email is required</p>}
          </div>
        </div>
        <div>
          <label className="field-label">Ticket Subject</label>
          <input {...register('subject', { required: true })} className="input-field" placeholder="Unable to access invoice history" />
          {errors.subject && <p className="text-xs text-rose-500 mt-1">Subject is required</p>}
        </div>
        <div>
          <label className="field-label">Ticket Description</label>
          <textarea {...register('description', { required: true })} rows={6} className="input-field resize-none" placeholder="Describe the issue in detail..." />
          {errors.description && <p className="text-xs text-rose-500 mt-1">Description is required</p>}
        </div>
        <div>
          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? 'Predicting…' : 'Predict Category'}
          </button>
        </div>
      </motion.form>

      <PredictionCard result={result} />
    </div>
  )
}
