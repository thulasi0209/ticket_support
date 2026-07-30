import React from 'react'
import { useForm } from 'react-hook-form'
import { predict } from '../services/api'
import PredictionCard from '../components/PredictionCard'
import toast from 'react-hot-toast'

export default function NewTicket() {
  const { register, handleSubmit, formState: { errors } } = useForm()
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
    } catch (e) {
      toast.error('Prediction failed')
    }
  }

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4">New Support Ticket</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm">Customer Name</label>
          <input {...register('name', { required: true })} className="w-full p-2 rounded-md border" />
        </div>
        <div>
          <label className="block text-sm">Customer Email</label>
          <input {...register('email', { required: true })} type="email" className="w-full p-2 rounded-md border" />
        </div>
        <div>
          <label className="block text-sm">Ticket Subject</label>
          <input {...register('subject', { required: true })} className="w-full p-2 rounded-md border" />
        </div>
        <div>
          <label className="block text-sm">Ticket Description</label>
          <textarea {...register('description', { required: true })} rows={6} className="w-full p-2 rounded-md border" />
        </div>
        <div>
          <button type="submit" className="px-4 py-2 rounded-md bg-primary text-white">Predict</button>
        </div>
      </form>

      <div className="mt-6">
        <PredictionCard result={result} />
      </div>
    </div>
  )
}
