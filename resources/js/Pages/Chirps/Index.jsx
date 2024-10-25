import ChirpForm from '@/Components/ChirpForm';
import ChirpItem from '@/Components/ChirpItem';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm  } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

export default function Index({ auth, chirps}) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Chirps
            </h2>}
        >
            <Head title="Chirps">
                <meta name="description" content='Chirps description' />
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <ChirpForm></ChirpForm>
                        </div>
                    </div>
                    <div className="text-white">
                        {chirps.map((chirp) => (
                            <ChirpItem key={`chirps-${chirp.id}`} chirp={chirp}></ChirpItem>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
