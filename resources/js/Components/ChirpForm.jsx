import InputError from '@/Components/InputError.jsx'
import PrimaryButton from '@/Components/PrimaryButton.jsx'
import SecondaryButton from '@/Components/SecondaryButton.jsx'
import { Head, useForm  } from '@inertiajs/react';

export default function ChirpForm({ chirp, className, setEditing }) {
    const {data, setData, post, patch, reset, errors, processing} = useForm({
        message: chirp?.message,
    })

    function update(chirp){
        patch(route('chirps.update', chirp),{
            onSuccess: () => reset(),
            preserveState: false,
        })
    }
    
    function handleSubmit(e){
        e.preventDefault()

        if (chirp?.id) {
            update(chirp.id)
            return
        }

        post(route('chirps.store'),{
            onSuccess: () => reset(),
            preserveState: false,
        })
    }

    return (
        <form  onSubmit={handleSubmit} className={className}>
            <textarea 
                placeholder="What's on your mind?"
                className="block w-full rounded-md border-gray-300 bg-white shadow-sm trasition-colors duration-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark-text-white dark:focus:border-indigo-300 dark:focus:ring dark:focus:ring-indigo-200 dark:focus:ring-opacity-50"
                value={data.message}
                onChange={(e) => setData('message', e.target.value)}
            ></textarea>
            <InputError message={errors.message}></InputError>
            <PrimaryButton disabled={processing} className="mt-4">
                {processing ? 'Enviando...' : 'Chirps'}
            </PrimaryButton>
            {chirp?.id && (
                <SecondaryButton onClick={() => setEditing(false)} className="ml-2">
                    Cancel
                </SecondaryButton>
            )}
        </form>
    )
}