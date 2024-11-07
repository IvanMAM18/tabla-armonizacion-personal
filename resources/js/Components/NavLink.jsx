import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-4 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-orange-200 dark:border-orange-200 text-white dark:text-white focus:border-orange-200 '
                    : 'border-transparent text-gray-500 dark:text-gray-600 hover:text-white dark:hover:text-white hover:border-orange-200 dark:hover:border-orange-200 focus:text-orange-200 dark:focus:text-orange-200 focus:border-orange-200 dark:focus:border-orange-200 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
