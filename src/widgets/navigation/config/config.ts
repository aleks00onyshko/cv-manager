import {ElementType} from "react";

import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TranslateIcon from '@mui/icons-material/Translate';
import ArticleIcon from '@mui/icons-material/Article';
import { ROUTES } from '@core/config';

export interface NavItem {
    label: string;
    icon: ElementType;
    navigatePath: string;
}

export const NAV_ITEMS: NavItem[] = [
    { label: 'Employees', icon: PeopleIcon, navigatePath: ROUTES.users.root },
    { label: 'Skills', icon: TrendingUpIcon, navigatePath: '/skills' },
    { label: 'Languages', icon: TranslateIcon, navigatePath: '/languages' },
    { label: 'CVs', icon: ArticleIcon, navigatePath: '/cvs' },
];