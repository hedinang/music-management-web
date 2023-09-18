import { format } from 'date-fns';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatDate = (time) => {
    if (!format(new Date(time), 'yyyy/MM/dd')) {
        return '';
    }
    return format(new Date(time), 'yyyy/MM/dd');
};

export const formatTime = (time) => {
    if (!format(new Date(time), 'hh:mm dd/MM/yyyy')) {
        return '';
    }
    return format(new Date(time), 'hh:mm dd/MM/yyyy');
};
