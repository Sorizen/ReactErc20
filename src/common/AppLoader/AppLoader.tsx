import { HTMLAttributes, useMemo } from 'react'

import { Icon } from '@/common'
import { ICON_NAMES } from "@/enums";

const AppLoader = ({ className, ...params }: HTMLAttributes<HTMLDivElement> ) => {
    const classNames = useMemo(() => [
        'app-loader',
        ...[className ?? []],
    ].join(' '), [])
    return (
        <div className={classNames} {...params}>
            <Icon name={ICON_NAMES.loader} />
        </div>
    );
};

export default AppLoader;
