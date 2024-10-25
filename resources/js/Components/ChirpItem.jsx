import Dropdown from '@/Components/Dropdown';
import { useState } from 'react';
import { usePage } from '@inertiajs/react'
import ChirpForm from './ChirpForm';

export default function ChirpItem({ chirp }) {
    const [editing, setEditing] = useState(false)

    const { auth } = usePage().props

    return(
        <div className="flex space-x-2 p-6">
            <svg 
                className="h-6 w-6 -scale-x-100 text-gray-600 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
            </svg>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-gray-800 dark:text-gray-200">
                            {chirp.user.name}  
                        </span>
                        <small className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                            {chirp.createdAt}
                        </small>
                        {chirp.edited && (
                            <small className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                                &middot; edited
                            </small>
                        )}
                    </div>
                </div>
                {editing ? (
                    <ChirpForm chirp={chirp} className="mt-2" setEditing={setEditing}></ChirpForm>
                ):(
                    <p className="mt-4 text-lg text-gray-900 dark:text-gray-100">
                        {chirp.message}
                    </p>
                )}
            </div>
            { chirp.user.id === auth.user.id && (
                <Dropdown>
                    <Dropdown.Trigger>
                        <button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" fill="#FF2D20"/>
                            </svg>
                        </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Button as="button" onClick={() => setEditing(true)}>
                            Edit
                        </Dropdown.Button>
                        <Dropdown.Button as="button">
                            Delete
                        </Dropdown.Button>
                        <Dropdown.Link
                            as="button"
                            href={route('chirps.destroy', chirp.id)}
                            method="delete"
                        >
                            Delete
                        </Dropdown.Link>

                    </Dropdown.Content>
                </Dropdown>
            ) }
           
        </div>
    )
}