/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

const navigation: FuseNavigationItem[] = [
    {
        id: 'tickets',
        title: 'Tickets',
        type: 'basic',
        icon: 'heroicons_outline:ticket',
        link: '/tickets'
    },
    {
        id: 'mantenimientos',
        title: 'Mantenimientos',
        type: 'collapsable',
        icon: 'heroicons_outline:adjustments',
        children: [
            { title: 'Prioridades', type: 'basic', link: '/mantenimientos/prioridades' },
            { title: 'Estados', type: 'basic', link: '/mantenimientos/estados' },
            { title: 'Categorias', type: 'basic', link: '/mantenimientos/categorias' }
        ]
    }
];

export const defaultNavigation: FuseNavigationItem[] = navigation
export const compactNavigation: FuseNavigationItem[] = navigation
export const futuristicNavigation: FuseNavigationItem[] = navigation
export const horizontalNavigation: FuseNavigationItem[] = navigation
