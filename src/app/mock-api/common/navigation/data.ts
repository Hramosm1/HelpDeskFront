/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

const navigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    },
    {
        id: 'tickets',
        title: 'Tickets',
        type: 'basic',
        icon: '',
        link: '/tickets'
    }
];

export const defaultNavigation: FuseNavigationItem[] = navigation
export const compactNavigation: FuseNavigationItem[] = navigation
export const futuristicNavigation: FuseNavigationItem[] = navigation
export const horizontalNavigation: FuseNavigationItem[] = navigation
