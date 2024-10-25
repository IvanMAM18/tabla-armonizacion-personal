import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InfoExtraTabla from '@/Components/InfoExtraTabla';
import TablaData from '@/Components/TablaData';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tabla Armonizacion Contable</h2>}
        >
            <Head title="Tabla Editable" />

            <div className="bg-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <InfoExtraTabla></InfoExtraTabla>
                    <TablaData status={'editable'}></TablaData>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
