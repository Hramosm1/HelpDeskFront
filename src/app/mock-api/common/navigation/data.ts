/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

const navigation: FuseNavigationItem[] = [
    {
        id: 'Dashboard',
        title: 'Dasboard',
        type: 'basic',
        icon: 'heroicons_outline:chart-bar',
        link: '/dasboard'
    },
    {
        id: 'Tickets',
        title: 'Tickets',
        type: 'basic',
        icon: 'heroicons_outline:ticket',
        link: '/tickets'
    },
    {
        id: 'Mantenimientos',
        title: 'Mantenimientos',
        type: 'collapsable',
        icon: 'heroicons_outline:adjustments',
        children: [
            { title: 'Prioridades', type: 'basic', link: '/mantenimientos/prioridades' },
            { title: 'Estados', type: 'basic', link: '/mantenimientos/estados' },
            { title: 'Categorías', type: 'basic', link: '/mantenimientos/categorias' },
            { title: 'Personal de soporte', type: 'basic', link: '/mantenimientos/personal-de-soporte' },
            { title: 'Notificaciones', type: 'basic', link: '/mantenimientos/notificaciones' }
        ]
    }
];

export const defaultNavigation: FuseNavigationItem[] = navigation
export const compactNavigation: FuseNavigationItem[] = navigation
export const futuristicNavigation: FuseNavigationItem[] = navigation
export const horizontalNavigation: FuseNavigationItem[] = navigation
