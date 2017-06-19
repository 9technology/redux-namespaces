import startsWith from 'starts-with';
import { ACTION_PREFIX, ACTION_SEPARATOR } from './constants';

const prefix = `${ACTION_PREFIX}${ACTION_SEPARATOR}`;

export default type => (startsWith(type, prefix) ? type : `${prefix}${type}`);
